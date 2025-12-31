import type { IBooking, IBookingCreateRequest, IBookingRecurringRequest, IBookingUpdateRequest } from '~/interfaces/BookingsInterfaces'

export class BookingRepository {
  private token: string | null = null
  private baseURL = 'http://185.25.151.154:8080/api/bookings'

  constructor(token?: string | null) {
    if (token) {
      this.token = token
    }
    else if (typeof window !== 'undefined') {
      // Get token from localStorage on client side
      this.token = localStorage.getItem('auth.token') || null
    }
  }

  async getBookings(
    roomId?: string,
    status?: 'active' | 'cancelled' | 'completed',
    userId?: string,
  ): Promise<IBooking[]> {
    const params = new URLSearchParams()

    if (roomId) {
      params.append('roomId', roomId)
    }

    if (status) {
      params.append('status', status)
    }

    if (userId) {
      params.append('userId', userId)
    }

    const url = params.toString() ? `${this.baseURL}?${params.toString()}` : this.baseURL

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  }

  async getBooking(bookingId: string): Promise<IBooking> {
    const response = await fetch(`${this.baseURL}/${bookingId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API Error:', response.status, errorText)
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  }

  async createBooking(newBooking: IBookingCreateRequest): Promise<IBooking> {
    const response = await fetch(this.baseURL, {
      method: 'POST',
      body: JSON.stringify(newBooking),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    })

    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
      }
      catch {
        errorData = { code: response.status, message: response.statusText }
      }
      const error: any = new Error(errorData.message || `API Error: ${response.status}`)
      error.code = errorData.code || response.status
      error.data = errorData
      throw error
    }

    return await response.json()
  }

  async updateBooking(bookingId: string, updatedBooking: IBookingUpdateRequest): Promise<IBooking> {
    const response = await fetch(`${this.baseURL}/${bookingId}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedBooking),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    })

    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
      }
      catch {
        errorData = { code: response.status, message: response.statusText }
      }
      const error: any = new Error(errorData.message || `API Error: ${response.status}`)
      error.code = errorData.code || response.status
      error.data = errorData
      throw error
    }

    return await response.json()
  }

  async deleteBooking(bookingId: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/${bookingId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }
  }

  async cancelBooking(bookingId: string): Promise<IBooking> {
    const response = await fetch(`${this.baseURL}/${bookingId}/cancel`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  }

  async getUserBookings(userId: string, status?: 'active' | 'cancelled' | 'completed'): Promise<IBooking[]> {
    return this.getBookings(undefined, status, userId)
  }

  async getBookingStats(): Promise<import('~/interfaces/BookingsInterfaces').IBookingStats> {
    const response = await fetch(`${this.baseURL}/count`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  }

  async createRecurringBookings(recurringData: IBookingRecurringRequest): Promise<void> {
    const response = await fetch('/api/bookings/recurring', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recurringData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  }
}
