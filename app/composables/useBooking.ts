import type { IBooking, IBookingCreateRequest, IBookingUpdateRequest, IBookingStats, IBookingRecurringRequest } from '~/interfaces/BookingsInterfaces'
import { BookingService } from '~/services/BookingService'
import { useAuth } from '~/composables/useAuth'

export const useBooking = () => {
  const { token } = useAuth()

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
      error.value = err instanceof Error ? err.message : 'Błąd przy pobieraniu rezerwacji'
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
      error.value = err instanceof Error ? err.message : 'Błąd przy pobieraniu szczegółów rezerwacji'
    }
    finally {
      loading.value = false
    }
  }

  const createBooking = async (newBooking: IBookingCreateRequest) => {
    loading.value = true
    error.value = null
    try {
      const createdBooking = await getBookingService().createBooking(newBooking)
      bookings.value.push(createdBooking)
      return createdBooking
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Błąd przy tworzeniu rezerwacji'
      throw err
    }
    finally {
      await fetchBookings(false)
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
      error.value = err instanceof Error ? err.message : 'Błąd przy aktualizacji rezerwacji'
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
      const result = await getBookingService().cancelBooking(bookingId)
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
      error.value = err instanceof Error ? err.message : 'Błąd przy anulowaniu rezerwacji'
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
      error.value = err instanceof Error ? err.message : 'Błąd przy pobieraniu statystyk rezerwacji'
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
      error.value = err instanceof Error ? err.message : 'Błąd przy tworzeniu cyklicznych rezerwacji'
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
