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

  async getMostUsedRooms() {
    return await $fetch('/api/rooms/statistics/most_used', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  async getLeastUsedRooms() {
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
}
