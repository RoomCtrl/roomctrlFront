import type { IBooking, IBookingCreateRequest, IBookingRecurringRequest, IBookingUpdateRequest } from '~/interfaces/BookingsInterfaces'

export class BookingRepository {
  private token: string | null = null

  constructor(token?: string | null) {
    if (token) {
      this.token = token
    }
    else if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth.token') || null
    }
  }

  async getBookings(myBookings?: boolean): Promise<IBooking[]> {
    const url = myBookings ? `/api/bookings?myBookings=${myBookings}` : '/api/bookings'
    return await $fetch(url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async getBooking(bookingId: string): Promise<IBooking> {
    return await $fetch(`/api/bookings/${bookingId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async createBooking(newBooking: IBookingCreateRequest): Promise<IBooking> {
    return await $fetch('/api/bookings', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: newBooking,
    })
  }

  async updateBooking(bookingId: string, updatedBooking: IBookingUpdateRequest): Promise<IBooking> {
    return await $fetch(`/api/bookings/${bookingId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: updatedBooking,
    })
  }

  async cancelBooking(bookingId: string): Promise<IBooking> {
    return await $fetch(`/api/bookings/${bookingId}/cancel`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async getBookingStats(): Promise<import('~/interfaces/BookingsInterfaces').IBookingStats> {
    return await $fetch('/api/bookings/count', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async createRecurringBookings(recurringData: IBookingRecurringRequest): Promise<void> {
    return await $fetch('/api/bookings/recurring', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: recurringData,
    })
  }

  async deleteMeFromBooking(bookingId: string): Promise<void> {
    return await $fetch(`/api/bookings/${bookingId}/leave`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }
}
