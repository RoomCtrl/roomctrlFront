export const customTimeFilter = (value: string, filter: Date): boolean => {
  if (!filter) {
    return true
  }

  const hours = String(filter.getHours()).padStart(2, '0')
  const minutes = String(filter.getMinutes()).padStart(2, '0')

  const filterString = `${hours}:${minutes}`

  return (
    value === filterString
  )
}

export const customDateFilter = (value: any, filter: any): boolean => {
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
