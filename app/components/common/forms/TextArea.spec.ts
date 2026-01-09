import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import TextArea from '~/components/common/forms/TextArea.vue'

describe('TextArea', () => {
  it('renders with label', async () => {
    const wrapper = await mountSuspended(TextArea, {
      props: {
        id: 'test-textarea',
        label: 'Test TextArea',
      },
    })

    expect(wrapper.find('label').text()).toBe('Test TextArea')
  })

  it('displays model value', async () => {
    const wrapper = await mountSuspended(TextArea, {
      props: {
        id: 'test-textarea',
        label: 'Test TextArea',
        modelValue: 'Some text content',
      },
    })

    const textarea = wrapper.findComponent({ name: 'Textarea' })
    expect(textarea.props('modelValue')).toBe('Some text content')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = await mountSuspended(TextArea, {
      props: {
        id: 'test-textarea',
        label: 'Test TextArea',
      },
    })

    const textarea = wrapper.findComponent({ name: 'Textarea' })
    await textarea.vm.$emit('update:modelValue', 'New text')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['New text'])
  })

  it('emits blur event', async () => {
    const wrapper = await mountSuspended(TextArea, {
      props: {
        id: 'test-textarea',
        label: 'Test TextArea',
      },
    })

    const textarea = wrapper.findComponent({ name: 'Textarea' })
    await textarea.vm.$emit('blur')

    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  it('displays error message', async () => {
    const errorMessage = 'This field is required'
    const wrapper = await mountSuspended(TextArea, {
      props: {
        id: 'test-textarea',
        label: 'Test TextArea',
        errorMessage,
      },
    })

    expect(wrapper.text()).toContain(errorMessage)
  })

  it('renders with icon', async () => {
    const wrapper = await mountSuspended(TextArea, {
      props: {
        id: 'test-textarea',
        label: 'Test TextArea',
        icon: 'pi pi-align-left',
      },
    })

    expect(wrapper.find('i').classes()).toContain('pi')
    expect(wrapper.find('i').classes()).toContain('pi-align-left')
  })

  it('is fluid by default', async () => {
    const wrapper = await mountSuspended(TextArea, {
      props: {
        id: 'test-textarea',
        label: 'Test TextArea',
      },
    })

    expect(wrapper.find('textarea').exists()).toBe(true)
  })
})
