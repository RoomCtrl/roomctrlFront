export function useDataTable<T>(data: T[] | Ref<T[]>, defaultRows = 10) {
  const dataRef: Ref<T[]> = 'value' in data ? data : ref(data)

  const rows = ref(defaultRows)
  const rowsPerPageOptions = [defaultRows, defaultRows * 2, defaultRows * 3]

  const isTableEmpty = useState<boolean>(() => {
    return dataRef.value.length === 0
  })

  const tableDisplay = computed(() => {
    console.log('dataRef.value.length:', dataRef.value.length)
    console.log('isTableEmpty.value:', isTableEmpty.value)
    return isTableEmpty.value ? 'flex flex-col h-full' : ''
  })

  const paginatorPosition = computed(() => {
    return rows.value === defaultRows ? 'bottom' : 'both'
  })

  const handleUpdateRows = async (value: number) => {
    rows.value = value
  }

  const onFilter = (event: any) => {
    isTableEmpty.value = event.filteredValue.length === 0
  }

  return {
    isTableEmpty,
    rows,
    rowsPerPageOptions,

    tableDisplay,
    paginatorPosition,

    handleUpdateRows,
    onFilter,
  }
}
