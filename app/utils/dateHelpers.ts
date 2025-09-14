export const formatToHoursMinutes = (timestampStr: string): string => {
  const date = new Date(timestampStr.replace(' ', 'T'))
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${hours}:${minutes}`
}

export const formatToDay = (timestampStr: string): string => {
  const date = new Date(timestampStr.replace(' ', 'T'))
  const day = date.getDate().toString().padStart(2, '0')

  return `${day}`
}

export const formatToMonth = (timestampStr: string): string => {
  const date = new Date(timestampStr.replace(' ', 'T'))
  const month = (date.getMonth() + 1).toString().padStart(2, '0')

  return `${month}`
}

export const formatToDayMonth = (timestampStr: string): string => {
  const date = new Date(timestampStr.replace(' ', 'T'))
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return `${day}.${month}`
}

export const formatTimeRange = (startedAt: string, endedAt: string) => {
  const startTime = formatToHoursMinutes(startedAt)
  const endTime = formatToHoursMinutes(endedAt)

  return `${startTime}-${endTime} `
}

export const formatDateRange = (startedAt: string, endedAt: string) => {
  const startDay = formatToDay(startedAt)
  const startMonth = formatToMonth(startedAt)
  const endDay = formatToDay(endedAt)
  const endMonth = formatToMonth(endedAt)
  if (startDay === endDay && startMonth === endMonth) {
    return `${startDay}.${startMonth}`
  }
  else if (startDay !== endDay && startMonth === endMonth) {
    return `${startDay}-${endDay}.${startMonth}`
  }
  else {
    return `${startDay}.${startMonth}-${endDay}.${endMonth}`
  }
}

export const isRangeTimeToday = (startedAt: string, endedAt: string) => {
  const startDay = formatToDay(startedAt)
  const startMonth = formatToMonth(startedAt)
  const endDay = formatToDay(endedAt)
  const endMonth = formatToMonth(endedAt)

  return startDay === endDay && startMonth === endMonth
}
