import type { IBooking, IBookingCreateRequest, IBookingRecurringRequest, IBookingUpdateRequest } from '~/interfaces/BookingsInterfaces'
import { BookingRepository } from '~/repositories/BookingRepository'

export class BookingService {
  private repository: BookingRepository

  constructor(token?: string | null) {
    this.repository = new BookingRepository(token)
  }

  async getBookings(myBookings: boolean): Promise<IBooking[]> {
    return this.repository.getBookings(myBookings)
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

  async cancelBooking(bookingId: string): Promise<IBooking> {
    return this.repository.cancelBooking(bookingId)
  }

  async getBookingStats(): Promise<import('~/interfaces/BookingsInterfaces').IBookingStats> {
    return this.repository.getBookingStats()
  }

  async createRecurringBooking(recurringBooking: IBookingRecurringRequest): Promise<void> {
    return this.repository.createRecurringBookings(recurringBooking)
  }
}
