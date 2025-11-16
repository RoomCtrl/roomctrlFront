export const lastWeekdaysArray = () => {
  const days = []
  let count = 0
  let i = 0

  while (count < 7) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const day = date.getDay()

    if (day !== 0 && day !== 6) {
      const formattedDate = date.toLocaleDateString('pl-PL', {
        day: '2-digit',
        month: '2-digit',
      })
      const dayOfWeek = dayOfWeekShortNames[(day + 6) % 7]
      days.push({ weekDay: dayOfWeek, date: formattedDate })
      count++
    }

    i++
  }

  return days.reverse()
}
export const formatToHoursMinutes = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${hours}:${minutes}`
}

export const formatToDay = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0')

  return `${day}`
}

export const formatToMonth = (date: Date): string => {
  const month = (date.getMonth() + 1).toString().padStart(2, '0')

  return `${month}`
}

export const formatToDayMonth = (date: Date): string => {
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return `${day}.${month}`
}

export const formatToTimeAndDate = (date: Date): string => {
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${hours}:${minutes} ${day}.${month}`
}

export const formatTimeRange = (startedAt: Date, endedAt: Date) => {
  const startTime = formatToHoursMinutes(startedAt)
  const endTime = formatToHoursMinutes(endedAt)

  return `${startTime}-${endTime} `
}

export const formatDateRange = (startedAt: Date, endedAt: Date) => {
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

export const isRangeTimeToday = (startedAt: Date, endedAt: Date) => {
  const today = new Date()
  const todayDay = today.getDate()
  const todayMonth = today.getMonth()
  const todayYear = today.getFullYear()

  const isStartToday
    = startedAt.getDate() === todayDay
      && startedAt.getMonth() === todayMonth
      && startedAt.getFullYear() === todayYear

  const isEndToday
    = endedAt.getDate() === todayDay
      && endedAt.getMonth() === todayMonth
      && endedAt.getFullYear() === todayYear

  return isStartToday && isEndToday
}

export const isRangeSameDay = (startedAt: Date, endedAt: Date) => {
  const startDay = formatToDay(startedAt)
  const startMonth = formatToMonth(startedAt)
  const endDay = formatToDay(endedAt)
  const endMonth = formatToMonth(endedAt)

  return startDay === endDay && startMonth === endMonth
}

export const isEarlierThanNow = (dateString: Date): boolean => {
  const now = new Date()

  return dateString < now
}

export const dayOfWeekFullNames = [
  'date.dayNames.monday',
  'date.dayNames.tuesday',
  'date.dayNames.wednesday',
  'date.dayNames.thursday',
  'date.dayNames.friday',
  'date.dayNames.saturday',
  'date.dayNames.sunday',
]

export const dayOfWeekShortNames = [
  'date.dayShortNames.monday',
  'date.dayShortNames.tuesday',
  'date.dayShortNames.wednesday',
  'date.dayShortNames.thursday',
  'date.dayShortNames.friday',
  'date.dayShortNames.saturday',
  'date.dayShortNames.sunday',
]
