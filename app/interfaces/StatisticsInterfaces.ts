export interface IStatisticsReservationTrendResponse {
  confirmed: IStatisticsReservationTrendDays
  pending: IStatisticsReservationTrendDays
  cancelled: IStatisticsReservationTrendDays
}

export interface IStatisticsUsageRoomsResponse {
  roomId: string
  roomName: string
  count: number
  percentage: number
  weeklyBookings: number
  monthlyBookings: number
}

interface IStatisticsReservationTrendDays {
  Pon: number
  Wt: number
  Śr: number
  Czw: number
  Pt: number
  Sob: number
  Nie: number
}
