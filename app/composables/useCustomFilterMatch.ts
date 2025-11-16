export const useCustomFilterMatch = () => {
  const customStatusFilter = (value: Date, filter: any): boolean => {
    if (filter === null || filter === undefined || filter === 'all') {
      return true
    }
    return value === filter
  }

  const customDateAndTimeFilter = (value: Date, filter: Date): boolean => {
    if (!filter) {
      return true
    }

    const valueDate = new Date(value)
    const filterDate = new Date(filter)

    if (isNaN(valueDate.getTime()) || isNaN(filterDate.getTime())) {
      return false
    }

    return (
      valueDate.getFullYear() === filterDate.getFullYear()
      && valueDate.getMonth() === filterDate.getMonth()
      && valueDate.getDate() === filterDate.getDate()
      && valueDate.getHours() === filterDate.getHours()
      && valueDate.getMinutes() === filterDate.getMinutes()
    )
  }

  const customDateFilter = (value: Date, filter: Date): boolean => {
    if (!filter) {
      return true
    }

    const valueDate = new Date(value)
    const filterDate = new Date(filter)

    if (isNaN(valueDate.getTime()) || isNaN(filterDate.getTime())) {
      return false
    }

    return (
      valueDate.getFullYear() === filterDate.getFullYear()
      && valueDate.getMonth() === filterDate.getMonth()
      && valueDate.getDate() === filterDate.getDate()
    )
  }

  const customTimeFilter = (value: Date, filter: Date): boolean => {
    if (!filter) {
      return true
    }

    const valueDate = new Date(value)
    const filterDate = new Date(filter)

    if (isNaN(valueDate.getTime()) || isNaN(filterDate.getTime())) {
      return false
    }

    return (
      valueDate.getHours() === filterDate.getHours()
      && valueDate.getMinutes() === filterDate.getMinutes()
    )
  }

  return {
    customDateAndTimeFilter,
    customDateFilter,
    customTimeFilter,
    customStatusFilter,
  }
}
