import type { IRoomCard, IRoomDetails, IRoomCreateRequest, IRoomUpdateRequest, IRoomImagesResponse } from '~/interfaces/RoomsIntefaces'
import { RoomRepository } from '~/repositories/RoomRepository'

export class RoomService {
  private repository: RoomRepository

  constructor(token?: string | null) {
    this.repository = new RoomRepository(token)
  }

  async getRooms(withBookings: boolean = false, status?: 'available' | 'occupied' | 'maintenance'): Promise<IRoomCard[]> {
    return await this.repository.getRooms(withBookings, status)
  }

  async getRoom(roomId: string, withBookings: boolean = false): Promise<IRoomDetails> {
    return await this.repository.getRoom(roomId, withBookings)
  }

  async createRoom(newRoom: IRoomCreateRequest): Promise<IRoomDetails> {
    return await this.repository.createRoom(newRoom)
  }

  async updateRoom(roomId: string, updatedRoom: IRoomUpdateRequest): Promise<IRoomDetails> {
    return await this.repository.updateRoom(roomId, updatedRoom)
  }

  async deleteRoom(roomId: string): Promise<void> {
    return await this.repository.deleteRoom(roomId)
  }

  async getFavoriteRooms(withBookings: boolean = false): Promise<IRoomCard[]> {
    return await this.repository.getFavoriteRooms(withBookings)
  }

  async toggleFavorite(roomId: string): Promise<void> {
    return await this.repository.toggleFavorite(roomId)
  }

  async uploadImage(roomId: string, image: File): Promise<{ message: string, imagePath: string }> {
    return await this.repository.uploadImage(roomId, image)
  }

  async getRoomImagesURL(roomId: string): Promise<IRoomImagesResponse> {
    return await this.repository.getRoomImagesURL(roomId)
  }

  async getRoomImage(roomId: string, imageIndex: number): Promise<string> {
    return await this.repository.getRoomImage(roomId, imageIndex)
  }

  async deleteRoomImages(roomId: string): Promise<void> {
    return await this.repository.deleteRoomImages(roomId)
  }

  async deleteSingleRoomImage(roomId: string, imageIndex: number): Promise<void> {
    return await this.repository.deleteSingleRoomImage(roomId, imageIndex)
  }
}
