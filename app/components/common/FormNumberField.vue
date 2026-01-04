<template>
  <InputGroup>
    <InputGroupAddon v-if="icon">
      <i :class="icon" />
    </InputGroupAddon>
    <FloatLabel variant="on">
      <InputNumber
        :id="id"
        :model-value="modelValue"
        :min="min"
        :max="max"
        :class="{ 'p-invalid': errorMessage }"
        :autofocus="autofocus"
        :placeholder="placeholder"
        fluid
        @update:model-value="$emit('update:modelValue', $event)"
        @blur="$emit('blur')"
      />
      <label
        :for="id"
        :aria-labelledby="id"
      >{{ label }}</label>
    </FloatLabel>
  </InputGroup>
  <Message
    v-if="errorMessage"
    severity="error"
    size="small"
    variant="simple"
  >
    {{ errorMessage }}
  </Message>
</template>

<script setup lang="ts">
interface Props {
  id: string
  label: string
  modelValue?: number | null
  errorMessage?: string
  icon?: string
  min?: number
  max?: number
  placeholder?: string
  autofocus?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: null,
  errorMessage: '',
  icon: '',
  min: undefined,
  max: undefined,
  placeholder: '',
  autofocus: false,
})

defineEmits<{
  'update:modelValue': [value: number | null]
  'blur': []
}>()
</script>
