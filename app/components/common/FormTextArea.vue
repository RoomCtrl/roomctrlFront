<template>
  <InputGroup>
    <InputGroupAddon v-if="icon">
      <i :class="icon" />
    </InputGroupAddon>
    <FloatLabel variant="on">
      <Textarea
        :id="id"
        :model-value="modelValue"
        :class="{ 'p-invalid': errorMessage }"
        :autofocus="autofocus"
        :rows="rows"
        :auto-resize="autoResize"
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
  modelValue?: string
  errorMessage?: string
  icon?: string
  autofocus?: boolean
  rows?: number
  autoResize?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  errorMessage: '',
  icon: '',
  autofocus: false,
  rows: 5,
  autoResize: false,
})

defineEmits<{
  'update:modelValue': [value: string]
  'blur': []
}>()
</script>
