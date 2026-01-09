import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import DateField from '~/components/common/forms/DateField.vue'

describe('DateField', () => {
  it('renders with label', async () => {
    const wrapper = await mountSuspended(DateField, {
      props: {
        id: 'test-date',
        label: 'Test Date',
      },
    })

    expect(wrapper.find('label').text()).toBe('Test Date')
  })

  it('displays model value', async () => {
    const testDate = new Date('2024-03-15')
    const wrapper = await mountSuspended(DateField, {
      props: {
        id: 'test-date',
        label: 'Test Date',
        modelValue: testDate,
      },
    })

    const datePicker = wrapper.findComponent({ name: 'DatePicker' })
    expect(datePicker.props('modelValue')).toEqual(testDate)
  })

  it('emits update:modelValue on change', async () => {
    const wrapper = await mountSuspended(DateField, {
      props: {
        id: 'test-date',
        label: 'Test Date',
      },
    })

    const newDate = new Date('2024-12-25')
    const datePicker = wrapper.findComponent({ name: 'DatePicker' })
    await datePicker.vm.$emit('update:modelValue', newDate)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([newDate])
  })

  it('emits blur event', async () => {
    const wrapper = await mountSuspended(DateField, {
      props: {
        id: 'test-date',
        label: 'Test Date',
      },
    })

    const datePicker = wrapper.findComponent({ name: 'DatePicker' })
    await datePicker.vm.$emit('blur')

    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  it('displays error message', async () => {
    const errorMessage = 'Date is required'
    const wrapper = await mountSuspended(DateField, {
      props: {
        id: 'test-date',
        label: 'Test Date',
        errorMessage,
      },
    })

    expect(wrapper.text()).toContain(errorMessage)
  })

  it('shows time picker when showTime is true', async () => {
    const wrapper = await mountSuspended(DateField, {
      props: {
        id: 'test-date',
        label: 'Test Date',
        showTime: true,
      },
    })

    const datePicker = wrapper.findComponent({ name: 'DatePicker' })
    expect(datePicker.props('showTime')).toBe(true)
  })

  it('shows only time when timeOnly is true', async () => {
    const wrapper = await mountSuspended(DateField, {
      props: {
        id: 'test-time',
        label: 'Test Time',
        timeOnly: true,
      },
    })

    const datePicker = wrapper.findComponent({ name: 'DatePicker' })
    expect(datePicker.props('timeOnly')).toBe(true)
  })

  it('uses custom hour format', async () => {
    const wrapper = await mountSuspended(DateField, {
      props: {
        id: 'test-date',
        label: 'Test Date',
        hourFormat: '12',
      },
    })

    const datePicker = wrapper.findComponent({ name: 'DatePicker' })
    expect(datePicker.props('hourFormat')).toBe('12')
  })

  it('uses custom date format', async () => {
    const wrapper = await mountSuspended(DateField, {
      props: {
        id: 'test-date',
        label: 'Test Date',
        dateFormat: 'dd/mm/yy',
      },
    })

    const datePicker = wrapper.findComponent({ name: 'DatePicker' })
    expect(datePicker.props('dateFormat')).toBe('dd/mm/yy')
  })

  it('renders with icon', async () => {
    const wrapper = await mountSuspended(DateField, {
      props: {
        id: 'test-date',
        label: 'Test Date',
        icon: 'pi pi-calendar',
      },
    })

    expect(wrapper.find('i').classes()).toContain('pi')
    expect(wrapper.find('i').classes()).toContain('pi-calendar')
  })

  it('applies fluid prop', async () => {
    const wrapper = await mountSuspended(DateField, {
      props: {
        id: 'test-date',
        label: 'Test Date',
        fluid: true,
      },
    })

    const datePicker = wrapper.findComponent({ name: 'DatePicker' })
    expect(datePicker.props('fluid')).toBe(true)
  })
})
