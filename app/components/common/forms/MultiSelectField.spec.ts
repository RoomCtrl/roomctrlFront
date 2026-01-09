import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import MultiSelectField from '~/components/common/forms/MultiSelectField.vue'

describe('MultiSelectField', () => {
  const mockOptions = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ]

  it('renders with label', async () => {
    const wrapper = await mountSuspended(MultiSelectField, {
      props: {
        id: 'test-multiselect',
        label: 'Test MultiSelect',
        options: mockOptions,
      },
    })

    expect(wrapper.find('label').text()).toBe('Test MultiSelect')
  })

  it('displays model value', async () => {
    const wrapper = await mountSuspended(MultiSelectField, {
      props: {
        id: 'test-multiselect',
        label: 'Test MultiSelect',
        options: mockOptions,
        modelValue: ['1', '2'],
      },
    })

    const multiSelect = wrapper.findComponent({ name: 'MultiSelect' })
    expect(multiSelect.props('modelValue')).toEqual(['1', '2'])
  })

  it('emits update:modelValue on change', async () => {
    const wrapper = await mountSuspended(MultiSelectField, {
      props: {
        id: 'test-multiselect',
        label: 'Test MultiSelect',
        options: mockOptions,
      },
    })

    const multiSelect = wrapper.findComponent({ name: 'MultiSelect' })
    await multiSelect.vm.$emit('update:modelValue', ['1', '3'])

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['1', '3']])
  })

  it('emits blur event', async () => {
    const wrapper = await mountSuspended(MultiSelectField, {
      props: {
        id: 'test-multiselect',
        label: 'Test MultiSelect',
        options: mockOptions,
      },
    })

    const multiSelect = wrapper.findComponent({ name: 'MultiSelect' })
    await multiSelect.vm.$emit('blur')

    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  it('displays error message', async () => {
    const errorMessage = 'Please select at least one option'
    const wrapper = await mountSuspended(MultiSelectField, {
      props: {
        id: 'test-multiselect',
        label: 'Test MultiSelect',
        options: mockOptions,
        errorMessage,
      },
    })

    expect(wrapper.text()).toContain(errorMessage)
  })

  it('displays hint when no error', async () => {
    const hint = 'Select multiple options'
    const wrapper = await mountSuspended(MultiSelectField, {
      props: {
        id: 'test-multiselect',
        label: 'Test MultiSelect',
        options: mockOptions,
        hint,
      },
    })

    expect(wrapper.text()).toContain(hint)
  })

  it('renders with custom optionLabel and optionValue', async () => {
    const customOptions = [
      { name: 'First', id: 1 },
      { name: 'Second', id: 2 },
    ]

    const wrapper = await mountSuspended(MultiSelectField, {
      props: {
        id: 'test-multiselect',
        label: 'Test MultiSelect',
        options: customOptions,
        optionLabel: 'name',
        optionValue: 'id',
      },
    })

    const multiSelect = wrapper.findComponent({ name: 'MultiSelect' })
    expect(multiSelect.props('optionLabel')).toBe('name')
    expect(multiSelect.props('optionValue')).toBe('id')
  })

  it('enables filter when prop is true', async () => {
    const wrapper = await mountSuspended(MultiSelectField, {
      props: {
        id: 'test-multiselect',
        label: 'Test MultiSelect',
        options: mockOptions,
        filter: true,
      },
    })

    const multiSelect = wrapper.findComponent({ name: 'MultiSelect' })
    expect(multiSelect.props('filter')).toBe(true)
  })

  it('shows loading state', async () => {
    const wrapper = await mountSuspended(MultiSelectField, {
      props: {
        id: 'test-multiselect',
        label: 'Test MultiSelect',
        options: mockOptions,
        loading: true,
      },
    })

    const multiSelect = wrapper.findComponent({ name: 'MultiSelect' })
    expect(multiSelect.props('loading')).toBe(true)
  })

  it('renders with icon', async () => {
    const wrapper = await mountSuspended(MultiSelectField, {
      props: {
        id: 'test-multiselect',
        label: 'Test MultiSelect',
        options: mockOptions,
        icon: 'pi pi-check',
      },
    })

    expect(wrapper.find('i').classes()).toContain('pi')
    expect(wrapper.find('i').classes()).toContain('pi-check')
  })

  it('displays chips by default', async () => {
    const wrapper = await mountSuspended(MultiSelectField, {
      props: {
        id: 'test-multiselect',
        label: 'Test MultiSelect',
        options: mockOptions,
      },
    })

    const multiSelect = wrapper.findComponent({ name: 'MultiSelect' })
    expect(multiSelect.props('display')).toBe('chip')
  })
})
