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
    try {
      return await this.repository.createBooking(newBooking)
    }
    catch (error) {
      if (error.data.message === 'Time slot already booked') {
        throw new Error('services.bookingService.errors.createBooking.timeSlotBooked')
      }
      else if (error.data.message === 'Cannot create booking in the past') {
        throw new Error('services.bookingService.errors.createBooking.pastTimeBooking')
      }

      if (error.data.violations) {
        const endTimeViolation = error.data.violations.find((violation: { propertyPath: string, message: string }) =>
          violation.message === 'End time must be after start time',
        )
        if (endTimeViolation) {
          throw new Error('services.bookingService.errors.createBooking.endTimeBeforeStartTime')
        }
      }
      throw error
    }
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

  async deleteMeFromBooking(bookingId: string): Promise<void> {
    return this.repository.deleteMeFromBooking(bookingId)
  }
}
