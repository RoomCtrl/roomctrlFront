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
  return {
    fetchBookingTypeCount,
    fetchBookingTimeBreakdownTotal,
    fetchBookingOccupancyRate,
    fetchIssueTypeCount,
    fetchMostUsedRooms,
    fetchLeastUsedRooms,
    fetchMostIssuesRooms,
  }
}
