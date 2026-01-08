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

  async getRooms(withBookings?: boolean, status?: 'available' | 'out_of_use'): Promise<IRoomCard[]> {
    const params = new URLSearchParams()
    if (withBookings !== undefined) params.append('withBookings', String(withBookings))
    if (status) params.append('status', status)
    const url = params.toString() ? `/api/rooms?${params.toString()}` : '/api/rooms'
    return $fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async getRoom(roomId: string): Promise<IRoomCard> {
    return $fetch(`/api/rooms/${roomId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async createRoom(newRoom: IRoomCreateRequest): Promise<IRoomDetails> {
    return $fetch('/api/rooms', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: newRoom,
    })
  }

  async updateRoom(roomId: string, updatedRoom: IRoomUpdateRequest): Promise<IRoomDetails> {
    return $fetch(`/api/rooms/${roomId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
      body: updatedRoom,
    })
  }

  async deleteRoom(roomId: string): Promise<void> {
    return $fetch(`/api/rooms/${roomId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async getFavoriteRooms(withBookings: boolean = false): Promise<IRoomCard[]> {
    const url = withBookings ? '/api/rooms/favorites?withBookings=true' : '/api/rooms/favorites'
    return $fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async toggleFavorite(roomId: string): Promise<void> {
    return $fetch(`/api/rooms/${roomId}/favorite`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async uploadImage(roomId: string, image: File): Promise<{ message: string, imagePath: string }> {
    const formData = new FormData()
    formData.append('files[]', image)

    return $fetch(`/api/rooms/${roomId}/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async getRoomImagesURL(roomId: string): Promise<IRoomImagesResponse> {
    return $fetch(`/api/rooms/${roomId}/images`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async getRoomImage(roomId: string, imageIndex: number): Promise<string> {
    const blob = await $fetch(`/api/rooms/${roomId}/image/${imageIndex}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      responseType: 'blob',
    })

    return URL.createObjectURL(blob as Blob)
  }

  async deleteRoomImages(roomId: string): Promise<void> {
    return $fetch(`/api/rooms/${roomId}/images`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async deleteSingleRoomImage(roomId: string, imageIndex: number): Promise<void> {
    return $fetch(`/api/rooms/${roomId}/images/${imageIndex}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }
}
