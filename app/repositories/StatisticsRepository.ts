import type { IStatisticsReservationTrendResponse, IStatisticsUsageRoomsResponse } from '~/interfaces/StatisticsInterfaces'

export class StatisticsRepository {
  private token: string | null = null

  constructor(token?: string | null) {
    if (token) {
      this.token = token
    }
    else if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth.token') || null
    }
  }

  async getBookingTypeCount() {
    return await $fetch('/api/bookings/organization/count', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async getBookingTimeBreakdownTotal() {
    return await $fetch('/api/bookings/statistics/total', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async getBookingOccupancyRate() {
    return await $fetch('/api/bookings/statistics/occupancy_rate', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async getIssueTypeCount() {
    return await $fetch('/api/issue/organization/count', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async getMostUsedRooms(): Promise<IStatisticsUsageRoomsResponse[]> {
    return await $fetch('/api/rooms/statistics/most_used', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async getLeastUsedRooms(): Promise<IStatisticsUsageRoomsResponse[]> {
    return await $fetch('/api/rooms/statistics/least_used', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async getMostIssuesRooms() {
    return await $fetch('/api/rooms/statistics/most_issues', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async getReservationTrend(): Promise<IStatisticsReservationTrendResponse> {
    return await $fetch('/api/bookings/statistics/trend', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }
}
