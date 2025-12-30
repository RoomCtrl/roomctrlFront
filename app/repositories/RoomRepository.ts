import type { IRoomCard, IRoomDetails, IRoomCreateRequest, IRoomUpdateRequest, IRoomImagesResponse } from '~/interfaces/RoomsIntefaces'

export class RoomRepository {
  private token: string | null = null

  constructor(token?: string | null) {
    if (token) {
      this.token = token
    }
    else if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth.token') || null
    }
  }

  async getRooms(withBookings: boolean = false, status?: 'available' | 'occupied' | 'maintenance'): Promise<IRoomCard[]> {
    const params = new URLSearchParams()
    params.append('withBookings', String(withBookings))
    if (status) {
      params.append('status', status)
    }

    const response = await fetch(`/api/rooms?${params.toString()}`, {
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

  async getRoom(roomId: string, withBookings: boolean = false): Promise<IRoomDetails> {
    const params = new URLSearchParams()
    params.append('withBookings', String(withBookings))

    const url = `/api/rooms/${roomId}?${params.toString()}`
    console.log('Fetching room from:', url)

    const response = await fetch(url, {
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

  async createRoom(newRoom: IRoomCreateRequest): Promise<IRoomDetails> {
    const response = await fetch('/api/rooms', {
      method: 'POST',
      body: JSON.stringify(newRoom),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  }

  async updateRoom(roomId: string, updatedRoom: IRoomUpdateRequest): Promise<IRoomDetails> {
    const response = await fetch(`/api/rooms/${roomId}`, {
      method: 'PUT',
      body: JSON.stringify(updatedRoom),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  }

  async deleteRoom(roomId: string): Promise<void> {
    const response = await fetch(`/api/rooms/${roomId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }
  }

  async getFavoriteRooms(withBookings: boolean = false): Promise<IRoomCard[]> {
    const params = new URLSearchParams()
    params.append('withBookings', String(withBookings))

    const response = await fetch(`/api/rooms/favorites?${params.toString()}`, {
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

  async toggleFavorite(roomId: string): Promise<void> {
    const response = await fetch(`/api/rooms/${roomId}/favorite`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }
  }

  async uploadImage(roomId: string, image: File): Promise<{ message: string, imagePath: string }> {
    const formData = new FormData()
    formData.append('files[]', image)

    const response = await fetch(`/api/rooms/${roomId}/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  }

  async getRoomImagesURL(roomId: string): Promise<IRoomImagesResponse> {
    const response = await fetch(`/api/rooms/${roomId}/images`, {
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

  async getRoomImage(roomId: string, imageIndex: number): Promise<string> {
    const response = await fetch(`/api/rooms/${roomId}/image/${imageIndex}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    const blob = await response.blob()
    return URL.createObjectURL(blob)
  }

  async deleteRoomImages(roomId: string): Promise<void> {
    const response = await fetch(`/api/rooms/${roomId}/images`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }
  }

  async deleteSingleRoomImage(roomId: string, imageIndex: number): Promise<void> {
    const response = await fetch(`/api/rooms/${roomId}/images/${imageIndex}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }
  }
}
