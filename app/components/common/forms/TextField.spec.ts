import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import TextField from '~/components/common/forms/TextField.vue'

describe('TextField', () => {
  it('renders with label', async () => {
    const wrapper = await mountSuspended(TextField, {
      props: {
        id: 'test-input',
        label: 'Test Label',
      },
    })

    expect(wrapper.find('label').text()).toBe('Test Label')
    expect(wrapper.find('input').attributes('id')).toBe('test-input')
  })

  it('displays model value', async () => {
    const wrapper = await mountSuspended(TextField, {
      props: {
        id: 'test-input',
        label: 'Test Label',
        modelValue: 'test value',
      },
    })

    expect(wrapper.find('input').element.value).toBe('test value')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = await mountSuspended(TextField, {
      props: {
        id: 'test-input',
        label: 'Test Label',
      },
    })

    await wrapper.find('input').setValue('new value')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new value'])
  })

  it('emits blur event', async () => {
    const wrapper = await mountSuspended(TextField, {
      props: {
        id: 'test-input',
        label: 'Test Label',
      },
    })

    await wrapper.find('input').trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  it('displays error message', async () => {
    const errorMessage = 'This field is required'
    const wrapper = await mountSuspended(TextField, {
      props: {
        id: 'test-input',
        label: 'Test Label',
        errorMessage,
      },
    })

    expect(wrapper.text()).toContain(errorMessage)
    expect(wrapper.find('input').classes()).toContain('p-invalid')
  })

  it('renders with icon', async () => {
    const wrapper = await mountSuspended(TextField, {
      props: {
        id: 'test-input',
        label: 'Test Label',
        icon: 'pi pi-user',
      },
    })

    expect(wrapper.find('i').classes()).toContain('pi')
    expect(wrapper.find('i').classes()).toContain('pi-user')
  })
})
