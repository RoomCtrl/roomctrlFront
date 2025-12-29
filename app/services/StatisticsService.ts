import { StatisticsRepository } from '~/repositories/StatisticsRepository'

export class StatisticsService {
  private repsitory: StatisticsRepository

  constructor(token?: string | null) {
    this.repsitory = new StatisticsRepository(token)
  }

  async getBookingTypeCount() {
    return await this.repsitory.getBookingTypeCount()
  }

  async getBookingTimeBreakdownTotal() {
    return await this.repsitory.getBookingTimeBreakdownTotal()
  }

  async getBookingOccupancyRate() {
    return await this.repsitory.getBookingOccupancyRate()
  }

  async getIssueTypeCount() {
    return await this.repsitory.getIssueTypeCount()
  }

  async getMostUsedRooms() {
    return await this.repsitory.getMostUsedRooms()
  }

  async getLeastUsedRooms() {
    return await this.repsitory.getLeastUsedRooms()
  }

  async getMostIssuesRooms() {
    return await this.repsitory.getMostIssuesRooms()
  }
}
