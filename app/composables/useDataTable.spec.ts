import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { useDataTable } from '~/composables/useDataTable'

describe('useDataTable', () => {
  describe('with empty data', () => {
    it('initializes with empty array', () => {
      const data = ref<any[]>([])
      const { isTableEmpty, tableDisplay, tableHeaderDisplay } = useDataTable(data, 10)

      expect(isTableEmpty.value).toBe(true)
      expect(tableDisplay.value).toBe('flex flex-col h-full')
      expect(tableHeaderDisplay.value).toBe('flex flex-row')
    })
  })

  describe('with data', () => {
    it('initializes with data correctly', () => {
      const data = ref([
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ])
      const { isTableEmpty, tableDisplay, tableHeaderDisplay } = useDataTable(data, 10)

      expect(isTableEmpty.value).toBe(false)
      expect(tableDisplay.value).toBe('')
      expect(tableHeaderDisplay.value).toBe('')
    })

    it('reacts to data changes', async () => {
      const data = ref<any[]>([])
      const { isTableEmpty, tableDisplay } = useDataTable(data, 10)

      expect(isTableEmpty.value).toBe(true)
      expect(tableDisplay.value).toBe('flex flex-col h-full')

      data.value = [{ id: 1, name: 'Item 1' }]
      await new Promise(resolve => setTimeout(resolve, 0))

      expect(isTableEmpty.value).toBe(false)
      expect(tableDisplay.value).toBe('')
    })
  })

  describe('pagination', () => {
    it('uses default rows value', () => {
      const data = ref([{ id: 1 }])
      const { rows, rowsPerPageOptions } = useDataTable(data, 10)

      expect(rows.value).toBe(10)
      expect(rowsPerPageOptions).toEqual([10, 20, 30])
    })

    it('calculates rowsPerPageOptions correctly', () => {
      const data = ref([{ id: 1 }])
      const { rowsPerPageOptions } = useDataTable(data, 15)

      expect(rowsPerPageOptions).toEqual([15, 30, 45])
    })

    it('updates rows value', async () => {
      const data = ref([{ id: 1 }])
      const { rows, handleUpdateRows } = useDataTable(data, 10)

      expect(rows.value).toBe(10)

      await handleUpdateRows(20)
      expect(rows.value).toBe(20)
    })

    it('changes paginator position based on rows', () => {
      const data = ref([{ id: 1 }])
      const { paginatorPosition, rows } = useDataTable(data, 10)

      expect(paginatorPosition.value).toBe('bottom')

      rows.value = 20
      expect(paginatorPosition.value).toBe('both')
    })
  })

  describe('filtering', () => {
    it('updates isTableEmpty on filter event', () => {
      const data = ref([
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ])
      const { isTableEmpty, onFilter } = useDataTable(data, 10)

      expect(isTableEmpty.value).toBe(false)

      onFilter({ filteredValue: [] })
      expect(isTableEmpty.value).toBe(true)

      onFilter({ filteredValue: [{ id: 1, name: 'Item 1' }] })
      expect(isTableEmpty.value).toBe(false)
    })
  })

  describe('with plain array', () => {
    it('works with non-ref array', () => {
      const data = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ]
      const { isTableEmpty } = useDataTable(data, 10)

      expect(isTableEmpty.value).toBe(false)
    })
  })
})
