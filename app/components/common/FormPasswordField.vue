<template>
  <InputGroup>
    <InputGroupAddon v-if="icon">
      <i :class="icon" />
    </InputGroupAddon>
    <FloatLabel variant="on">
      <Password
        :id="id"
        :model-value="modelValue"
        :class="{ 'p-invalid': errorMessage }"
        type="password"
        :toggle-mask="toggleMask"
        :fluid="fluid"
        :feedback="feedback"
        @update:model-value="$emit('update:modelValue', $event)"
        @blur="$emit('blur')"
      />
      <label :for="id">{{ label }}</label>
    </FloatLabel>
  </InputGroup>
  <div class="error-message-wrapper">
    <Message
      v-if="errorMessage"
      severity="error"
      size="small"
      variant="simple"
    >
      {{ errorMessage }}
    </Message>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string
  label: string
  modelValue?: string
  errorMessage?: string
  icon?: string
  toggleMask?: boolean
  fluid?: boolean
  feedback?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  errorMessage: '',
  icon: 'pi pi-key',
  toggleMask: true,
  fluid: true,
  feedback: false,
})

defineEmits<{
  'update:modelValue': [value: string]
  'blur': []
}>()
</script>

<style scoped>
.error-message-wrapper {
  min-height: 1.5rem;
}
</style>
