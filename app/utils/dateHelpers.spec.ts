import { describe, it, expect } from 'vitest'
import { parseLocalDate } from '~/utils/dateHelpers'

describe('dateHelpers', () => {
  describe('parseLocalDate', () => {
    it('parses date string correctly', () => {
      const dateString = '2024-03-15 14:30:00'
      const result = parseLocalDate(dateString)

      expect(result).toBeInstanceOf(Date)
      expect(result.getFullYear()).toBe(2024)
      expect(result.getMonth()).toBe(2) // March is month 2 (0-indexed)
      expect(result.getDate()).toBe(15)
      expect(result.getHours()).toBe(14)
      expect(result.getMinutes()).toBe(30)
      expect(result.getSeconds()).toBe(0)
    })

    it('handles different date formats', () => {
      const dateString = '2025-12-25 23:59:59'
      const result = parseLocalDate(dateString)

      expect(result.getFullYear()).toBe(2025)
      expect(result.getMonth()).toBe(11) // December
      expect(result.getDate()).toBe(25)
      expect(result.getHours()).toBe(23)
      expect(result.getMinutes()).toBe(59)
      expect(result.getSeconds()).toBe(59)
    })

    it('handles dates with single digit values', () => {
      const dateString = '2024-01-05 09:05:03'
      const result = parseLocalDate(dateString)

      expect(result.getFullYear()).toBe(2024)
      expect(result.getMonth()).toBe(0) // January
      expect(result.getDate()).toBe(5)
      expect(result.getHours()).toBe(9)
      expect(result.getMinutes()).toBe(5)
      expect(result.getSeconds()).toBe(3)
    })
  })
})
