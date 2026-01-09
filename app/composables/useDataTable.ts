export function useDataTable<T>(data: T[] | Ref<T[]>, defaultRows = 10) {
  const dataRef: Ref<T[]> = 'value' in data ? data : ref(data)

  const rows = ref(defaultRows)
  const rowsPerPageOptions = [defaultRows, defaultRows * 2, defaultRows * 3]

  const isTableEmpty = ref(false)

  // Watch data changes to update isTableEmpty
  watch(() => dataRef.value, (newData) => {
    isTableEmpty.value = newData.length === 0
  }, { immediate: true })

  const tableDisplay = computed(() => {
    return isTableEmpty.value ? 'flex flex-col h-full' : ''
  })

  const tableHeaderDisplay = computed(() => {
    return isTableEmpty.value ? 'flex flex-row' : ''
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

    tableHeaderDisplay,
    tableDisplay,
    paginatorPosition,

    handleUpdateRows,
    onFilter,
  }
}
