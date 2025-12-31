import type { IBooking, IBookingCreateRequest, IBookingRecurringRequest, IBookingUpdateRequest } from '~/interfaces/BookingsInterfaces'
import { BookingRepository } from '~/repositories/BookingRepository'

export class BookingService {
  private repository: BookingRepository

  constructor(token?: string | null) {
    this.repository = new BookingRepository(token)
  }

  async getBookings(
    roomId?: string,
    status?: 'active' | 'cancelled' | 'completed',
    userId?: string,
  ): Promise<IBooking[]> {
    return this.repository.getBookings(roomId, status, userId)
  }

  async getBooking(bookingId: string): Promise<IBooking> {
    return this.repository.getBooking(bookingId)
  }

  async createBooking(newBooking: IBookingCreateRequest): Promise<IBooking> {
    return this.repository.createBooking(newBooking)
  }

  async updateBooking(bookingId: string, updatedBooking: IBookingUpdateRequest): Promise<IBooking> {
    return this.repository.updateBooking(bookingId, updatedBooking)
  }

  async deleteBooking(bookingId: string): Promise<void> {
    return this.repository.deleteBooking(bookingId)
  }

  async cancelBooking(bookingId: string): Promise<IBooking> {
    return this.repository.cancelBooking(bookingId)
  }

  async getUserBookings(userId: string, status?: 'active' | 'cancelled' | 'completed'): Promise<IBooking[]> {
    return this.repository.getUserBookings(userId, status)
  }

  async getBookingStats(): Promise<import('~/interfaces/BookingsInterfaces').IBookingStats> {
    return this.repository.getBookingStats()
  }

  async createRecurringBooking(recurringBooking: IBookingRecurringRequest): Promise<void> {
    return this.repository.createRecurringBookings(recurringBooking)
  }
}
