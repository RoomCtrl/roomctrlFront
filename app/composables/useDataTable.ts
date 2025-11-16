export function useDataTable(data: T[] | Ref<T[]>, defaultRows = 10) {
  const dataRef: Ref<T[]> = 'value' in data ? data : ref(data)

  const isTableEmpty = ref(false)
  const rows = ref(defaultRows)

  const tableDisplay = computed(() => {
    return isTableEmpty.value || dataRef.value.length === 0
      ? 'flex flex-col h-full'
      : ''
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

    tableDisplay,
    paginatorPosition,

    handleUpdateRows,
    onFilter,
  }
}
