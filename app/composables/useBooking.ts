import type { IBooking, IBookingCreateRequest, IBookingUpdateRequest, IBookingStats, IBookingRecurringRequest } from '~/interfaces/BookingsInterfaces'
import { BookingService } from '~/services/BookingService'
import { useAuth } from '~/composables/useAuth'

export const useBooking = () => {
  const { token } = useAuth()

  const formatError = (err: any): string => {
    const errorData = err.data
    console.error('Booking error data first:', errorData)
    console.error('Booking error data violations:', errorData.violations)
    console.error('Booking error data message:', errorData.message)

    if (errorData.violations && Array.isArray(errorData.violations)) {
      return errorData.violations.map((v: any) => `${v.field}: ${v.message}`).join(', ')
    }

    if (errorData.message) {
      return errorData.message
    }

    return err.message || 'An unknown error occurred.'
  }

  const bookings = useState<IBooking[]>('bookings', () => [])
  const booking = useState<IBooking | null>('booking', () => null)
  const bookingStats = useState<IBookingStats | null>('booking-stats', () => null)
  const loading = useState<boolean>('bookings-loading', () => false)
  const error = useState<string | null>('bookings-error', () => null)

  const getBookingService = () => new BookingService(token.value)

  const fetchBookings = async (myBookings: boolean) => {
    loading.value = true
    error.value = null
    try {
      bookings.value = await getBookingService().getBookings(myBookings)
    }
    catch (err) {
      error.value = formatError(err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const fetchBooking = async (bookingId: string) => {
    loading.value = true
    error.value = null
    try {
      booking.value = await getBookingService().getBooking(bookingId)
    }
    catch (err) {
      error.value = formatError(err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const createBooking = async (newBooking: IBookingCreateRequest) => {
    loading.value = true
    error.value = null
    try {
      await getBookingService().createBooking(newBooking)
      await fetchBookings(false)
    }
    catch (err) {
      error.value = formatError(err)
      console.log('error creating booking:', error.value)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const updateBooking = async (bookingId: string, updatedBooking: IBookingUpdateRequest) => {
    loading.value = true
    error.value = null
    try {
      const result = await getBookingService().updateBooking(bookingId, updatedBooking)
      const index = bookings.value.findIndex(b => b.id === bookingId)
      if (index !== -1) {
        bookings.value[index] = result
      }
      if (booking.value && booking.value.id === bookingId) {
        booking.value = result
      }
      return result
    }
    catch (err) {
      error.value = formatError(err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const cancelBooking = async (bookingId: string) => {
    loading.value = true
    error.value = null
    try {
      await getBookingService().cancelBooking(bookingId)
      fetchBookings(false)
    }
    catch (err) {
      error.value = formatError(err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const fetchBookingStats = async () => {
    loading.value = true
    error.value = null
    try {
      bookingStats.value = await getBookingService().getBookingStats()
    }
    catch (err) {
      error.value = formatError(err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const createBookingRecurring = async (recurringBooking: IBookingRecurringRequest) => {
    loading.value = true
    error.value = null
    try {
      await getBookingService().createRecurringBooking(recurringBooking)
    }
    catch (err) {
      error.value = formatError(err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  return {
    bookings,
    booking,
    bookingStats,
    loading,
    error,
    fetchBookings,
    fetchBooking,
    createBooking,
    createBookingRecurring,
    updateBooking,
    cancelBooking,
    fetchBookingStats,
  }
}
