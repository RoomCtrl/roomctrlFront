import type { IStatisticsMostIsssuesRoomsResponse, IStatisticsReservationTrendResponse, IStatisticsUsageRoomsResponse } from '~/interfaces/StatisticsInterfaces'
import { StatisticsService } from '~/services/StatisticsService'

export const useStatistics = () => {
  const { token } = useAuth()

  const mostUsedRooms = useState<IStatisticsUsageRoomsResponse[]>('most-used-room', () => [])
  const leastUsedRooms = useState<IStatisticsUsageRoomsResponse[]>('least-used-room', () => [])
  const mostIssuesRooms = useState<IStatisticsMostIsssuesRoomsResponse[]>('most-issues-room', () => [])
  const getRoomService = () => new StatisticsService(token.value)

  const loading = useState<boolean>('statistics-loading', () => false)
  const error = useState<string | null>('statistics-error', () => null)

  const fetchBookingTypeCount = async () => {
    return await getRoomService().getBookingTypeCount()
  }

  const fetchBookingTimeBreakdownTotal = async () => {
    return await getRoomService().getBookingTimeBreakdownTotal()
  }

  const fetchBookingOccupancyRate = async () => {
    return await getRoomService().getBookingOccupancyRate()
  }

  const fetchIssueTypeCount = async () => {
    return await getRoomService().getIssueTypeCount()
  }

  const fetchMostUsedRooms = async () => {
    loading.value = true
    error.value = null
    try {
      mostUsedRooms.value = await getRoomService().getMostUsedRooms()
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Błąd przy pobieraniu najczęściej używanych pokoi'
    }
    finally {
      loading.value = false
    }
  }

  const fetchLeastUsedRooms = async () => {
    loading.value = true
    error.value = null
    try {
      leastUsedRooms.value = await getRoomService().getLeastUsedRooms()
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Błąd przy pobieraniu najczęściej używanych pokoi'
    }
    finally {
      loading.value = false
    }
  }

  const fetchMostIssuesRooms = async () => {
    loading.value = true
    error.value = null
    try {
      mostIssuesRooms.value = await getRoomService().getMostIssuesRooms()
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Błąd przy pobieraniu pokoi z największą liczbą problemów'
    }
    finally {
      loading.value = false
    }
  }

  const fetchReservationTrend = async () => {
    const response: IStatisticsReservationTrendResponse = await getRoomService().getReservationTrend()

    const confirmed: number[] = Object.values(response.confirmed)
    const pending: number[] = Object.values(response.pending)
    const cancelled: number[] = Object.values(response.cancelled)

    return { confirmed, pending, cancelled }
  }

  return {
    fetchBookingTypeCount,
    fetchBookingTimeBreakdownTotal,
    fetchBookingOccupancyRate,
    fetchIssueTypeCount,
    fetchMostUsedRooms,
    fetchLeastUsedRooms,
    fetchMostIssuesRooms,
    fetchReservationTrend,

    mostUsedRooms,
    leastUsedRooms,
    mostIssuesRooms,
    loading,
    error,
  }
}
