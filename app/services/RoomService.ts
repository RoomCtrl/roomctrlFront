import type { IRoomCard, IRoomDetails, IRoomCreateRequest, IRoomUpdateRequest } from '~/interfaces/RoomsIntefaces'
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
}
