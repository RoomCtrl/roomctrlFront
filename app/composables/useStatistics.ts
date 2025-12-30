import type { IStatisticsReservationTrendResponse } from '~/interfaces/StatisticsInterfaces'
import { StatisticsService } from '~/services/StatisticsService'

export const useStatistics = () => {
  const { token } = useAuth()

  const getRoomService = () => new StatisticsService(token.value)

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
    return await getRoomService().getMostUsedRooms()
  }

  const fetchLeastUsedRooms = async () => {
    return await getRoomService().getLeastUsedRooms()
  }

  const fetchMostIssuesRooms = async () => {
    return await getRoomService().getMostIssuesRooms()
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
  }
}
