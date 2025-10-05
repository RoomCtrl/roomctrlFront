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

export const formatToTimeAndDate = (timestampStr: string): string => {
  const date = new Date(timestampStr.replace(' ', 'T'))
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${hours}:${minutes} ${day}.${month}`
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
  const today = new Date()
  const todayDay = today.getDate()
  const todayMonth = today.getMonth()
  const todayYear = today.getFullYear()

  const start = new Date(startedAt)
  const end = new Date(endedAt)

  const isStartToday
    = start.getDate() === todayDay
      && start.getMonth() === todayMonth
      && start.getFullYear() === todayYear

  const isEndToday
    = end.getDate() === todayDay
      && end.getMonth() === todayMonth
      && end.getFullYear() === todayYear

  return isStartToday && isEndToday
}

export const isRangeSameDay = (startedAt: string, endedAt: string) => {
  const startDay = formatToDay(startedAt)
  const startMonth = formatToMonth(startedAt)
  const endDay = formatToDay(endedAt)
  const endMonth = formatToMonth(endedAt)

  return startDay === endDay && startMonth === endMonth
}

export const isEarlierThanNow = (dateString: string): boolean => {
  const inputDate = new Date(dateString)
  const now = new Date()

  return inputDate < now
}

export const dayOfWeekFullNames = [
  'common.dayNames.Monday',
  'common.dayNames.Tuesday',
  'common.dayNames.Wednesday',
  'common.dayNames.Thursday',
  'common.dayNames.Friday',
  'common.dayNames.Saturday',
  'common.dayNames.Sunday',
]

export const dayOfWeekShortNames = [
  'common.shortdayNames.Monday',
  'common.shortdayNames.Tuesday',
  'common.shortdayNames.Wednesday',
  'common.shortdayNames.Thursday',
  'common.shortdayNames.Friday',
  'common.shortdayNames.Saturday',
  'common.shortdayNames.Sunday',
]
