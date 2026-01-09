import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import PasswordField from '~/components/common/forms/PasswordField.vue'

describe('PasswordField', () => {
  it('renders with label', async () => {
    const wrapper = await mountSuspended(PasswordField, {
      props: {
        id: 'test-password',
        label: 'Test Password',
      },
    })

    expect(wrapper.find('label').text()).toBe('Test Password')
  })

  it('displays model value', async () => {
    const wrapper = await mountSuspended(PasswordField, {
      props: {
        id: 'test-password',
        label: 'Test Password',
        modelValue: 'secret123',
      },
    })

    const password = wrapper.findComponent({ name: 'Password' })
    expect(password.props('modelValue')).toBe('secret123')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = await mountSuspended(PasswordField, {
      props: {
        id: 'test-password',
        label: 'Test Password',
      },
    })

    const password = wrapper.findComponent({ name: 'Password' })
    await password.vm.$emit('update:modelValue', 'newpassword')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['newpassword'])
  })

  it('emits blur event', async () => {
    const wrapper = await mountSuspended(PasswordField, {
      props: {
        id: 'test-password',
        label: 'Test Password',
      },
    })

    const password = wrapper.findComponent({ name: 'Password' })
    await password.vm.$emit('blur')

    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  it('displays error message', async () => {
    const errorMessage = 'Password is required'
    const wrapper = await mountSuspended(PasswordField, {
      props: {
        id: 'test-password',
        label: 'Test Password',
        errorMessage,
      },
    })

    expect(wrapper.text()).toContain(errorMessage)
  })

  it('has default icon', async () => {
    const wrapper = await mountSuspended(PasswordField, {
      props: {
        id: 'test-password',
        label: 'Test Password',
      },
    })

    expect(wrapper.find('i').classes()).toContain('pi')
    expect(wrapper.find('i').classes()).toContain('pi-key')
  })

  it('renders with custom icon', async () => {
    const wrapper = await mountSuspended(PasswordField, {
      props: {
        id: 'test-password',
        label: 'Test Password',
        icon: 'pi pi-lock',
      },
    })

    expect(wrapper.find('i').classes()).toContain('pi')
    expect(wrapper.find('i').classes()).toContain('pi-lock')
  })

  it('enables toggle mask by default', async () => {
    const wrapper = await mountSuspended(PasswordField, {
      props: {
        id: 'test-password',
        label: 'Test Password',
      },
    })

    const password = wrapper.findComponent({ name: 'Password' })
    expect(password.props('toggleMask')).toBe(true)
  })

  it('disables toggle mask when prop is false', async () => {
    const wrapper = await mountSuspended(PasswordField, {
      props: {
        id: 'test-password',
        label: 'Test Password',
        toggleMask: false,
      },
    })

    const password = wrapper.findComponent({ name: 'Password' })
    expect(password.props('toggleMask')).toBe(false)
  })

  it('is fluid by default', async () => {
    const wrapper = await mountSuspended(PasswordField, {
      props: {
        id: 'test-password',
        label: 'Test Password',
      },
    })

    const password = wrapper.findComponent({ name: 'Password' })
    expect(password.props('fluid')).toBe(true)
  })

  it('disables feedback by default', async () => {
    const wrapper = await mountSuspended(PasswordField, {
      props: {
        id: 'test-password',
        label: 'Test Password',
      },
    })

    const password = wrapper.findComponent({ name: 'Password' })
    expect(password.props('feedback')).toBe(false)
  })

  it('enables feedback when prop is true', async () => {
    const wrapper = await mountSuspended(PasswordField, {
      props: {
        id: 'test-password',
        label: 'Test Password',
        feedback: true,
      },
    })

    const password = wrapper.findComponent({ name: 'Password' })
    expect(password.props('feedback')).toBe(true)
  })
})
