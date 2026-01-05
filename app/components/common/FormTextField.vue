<template>
  <InputGroup>
    <InputGroupAddon v-if="icon">
      <i :class="icon" />
    </InputGroupAddon>
    <FloatLabel variant="on">
      <InputText
        :id="id"
        :model-value="modelValue"
        :class="{ 'p-invalid': errorMessage }"
        :autofocus="autofocus"
        @update:model-value="$emit('update:modelValue', $event)"
        @blur="$emit('blur')"
      />
      <label
        :for="id"
        :aria-labelledby="id"
      >{{ label }}</label>
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
  autofocus?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  errorMessage: '',
  icon: '',
  autofocus: false,
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
