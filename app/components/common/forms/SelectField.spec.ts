import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SelectField from '~/components/common/forms/SelectField.vue'

describe('SelectField', () => {
  const mockOptions = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ]

  it('renders with label and options', async () => {
    const wrapper = await mountSuspended(SelectField, {
      props: {
        id: 'test-select',
        label: 'Test Select',
        options: mockOptions,
      },
    })

    expect(wrapper.find('label').text()).toBe('Test Select')
  })

  it('displays model value', async () => {
    const wrapper = await mountSuspended(SelectField, {
      props: {
        id: 'test-select',
        label: 'Test Select',
        options: mockOptions,
        modelValue: '2',
      },
    })

    const select = wrapper.findComponent({ name: 'Select' })
    expect(select.props('modelValue')).toBe('2')
  })

  it('emits update:modelValue on change', async () => {
    const wrapper = await mountSuspended(SelectField, {
      props: {
        id: 'test-select',
        label: 'Test Select',
        options: mockOptions,
      },
    })

    const select = wrapper.findComponent({ name: 'Select' })
    await select.vm.$emit('update:modelValue', '3')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['3'])
  })

  it('emits blur event', async () => {
    const wrapper = await mountSuspended(SelectField, {
      props: {
        id: 'test-select',
        label: 'Test Select',
        options: mockOptions,
      },
    })

    const select = wrapper.findComponent({ name: 'Select' })
    await select.vm.$emit('blur')

    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  it('displays error message', async () => {
    const errorMessage = 'Please select an option'
    const wrapper = await mountSuspended(SelectField, {
      props: {
        id: 'test-select',
        label: 'Test Select',
        options: mockOptions,
        errorMessage,
      },
    })

    expect(wrapper.text()).toContain(errorMessage)
  })

  it('renders with custom optionLabel and optionValue', async () => {
    const customOptions = [
      { name: 'First', id: 1 },
      { name: 'Second', id: 2 },
    ]

    const wrapper = await mountSuspended(SelectField, {
      props: {
        id: 'test-select',
        label: 'Test Select',
        options: customOptions,
        optionLabel: 'name',
        optionValue: 'id',
      },
    })

    const select = wrapper.findComponent({ name: 'Select' })
    expect(select.props('optionLabel')).toBe('name')
    expect(select.props('optionValue')).toBe('id')
  })

  it('shows loading state', async () => {
    const wrapper = await mountSuspended(SelectField, {
      props: {
        id: 'test-select',
        label: 'Test Select',
        options: mockOptions,
        loading: true,
      },
    })

    const select = wrapper.findComponent({ name: 'Select' })
    expect(select.props('loading')).toBe(true)
  })

  it('renders with icon', async () => {
    const wrapper = await mountSuspended(SelectField, {
      props: {
        id: 'test-select',
        label: 'Test Select',
        options: mockOptions,
        icon: 'pi pi-filter',
      },
    })

    expect(wrapper.find('i').classes()).toContain('pi')
    expect(wrapper.find('i').classes()).toContain('pi-filter')
  })
})
