import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import NumberField from '~/components/common/forms/NumberField.vue'

describe('NumberField', () => {
  it('renders with label', async () => {
    const wrapper = await mountSuspended(NumberField, {
      props: {
        id: 'test-number',
        label: 'Test Number',
      },
    })

    expect(wrapper.find('label').text()).toBe('Test Number')
  })

  it('displays model value', async () => {
    const wrapper = await mountSuspended(NumberField, {
      props: {
        id: 'test-number',
        label: 'Test Number',
        modelValue: 42,
      },
    })

    const inputNumber = wrapper.findComponent({ name: 'InputNumber' })
    expect(inputNumber.props('modelValue')).toBe(42)
  })

  it('emits update:modelValue on change', async () => {
    const wrapper = await mountSuspended(NumberField, {
      props: {
        id: 'test-number',
        label: 'Test Number',
      },
    })

    const inputNumber = wrapper.findComponent({ name: 'InputNumber' })
    await inputNumber.vm.$emit('update:modelValue', 100)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([100])
  })

  it('emits blur event', async () => {
    const wrapper = await mountSuspended(NumberField, {
      props: {
        id: 'test-number',
        label: 'Test Number',
      },
    })

    const inputNumber = wrapper.findComponent({ name: 'InputNumber' })
    await inputNumber.vm.$emit('blur')

    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  it('displays error message', async () => {
    const errorMessage = 'Number is required'
    const wrapper = await mountSuspended(NumberField, {
      props: {
        id: 'test-number',
        label: 'Test Number',
        errorMessage,
      },
    })

    expect(wrapper.text()).toContain(errorMessage)
  })

  it('applies min constraint', async () => {
    const wrapper = await mountSuspended(NumberField, {
      props: {
        id: 'test-number',
        label: 'Test Number',
        min: 0,
      },
    })

    const inputNumber = wrapper.findComponent({ name: 'InputNumber' })
    expect(inputNumber.props('min')).toBe(0)
  })

  it('applies max constraint', async () => {
    const wrapper = await mountSuspended(NumberField, {
      props: {
        id: 'test-number',
        label: 'Test Number',
        max: 100,
      },
    })

    const inputNumber = wrapper.findComponent({ name: 'InputNumber' })
    expect(inputNumber.props('max')).toBe(100)
  })

  it('applies both min and max constraints', async () => {
    const wrapper = await mountSuspended(NumberField, {
      props: {
        id: 'test-number',
        label: 'Test Number',
        min: 1,
        max: 10,
      },
    })

    const inputNumber = wrapper.findComponent({ name: 'InputNumber' })
    expect(inputNumber.props('min')).toBe(1)
    expect(inputNumber.props('max')).toBe(10)
  })

  it('renders with icon', async () => {
    const wrapper = await mountSuspended(NumberField, {
      props: {
        id: 'test-number',
        label: 'Test Number',
        icon: 'pi pi-hashtag',
      },
    })

    expect(wrapper.find('i').classes()).toContain('pi')
    expect(wrapper.find('i').classes()).toContain('pi-hashtag')
  })

  it('applies fluid prop', async () => {
    const wrapper = await mountSuspended(NumberField, {
      props: {
        id: 'test-number',
        label: 'Test Number',
        fluid: true,
      },
    })

    const inputNumber = wrapper.findComponent({ name: 'InputNumber' })
    expect(inputNumber.props('fluid')).toBe(true)
  })

  it('handles null value', async () => {
    const wrapper = await mountSuspended(NumberField, {
      props: {
        id: 'test-number',
        label: 'Test Number',
        modelValue: null,
      },
    })

    const inputNumber = wrapper.findComponent({ name: 'InputNumber' })
    expect(inputNumber.props('modelValue')).toBeNull()
  })
})
