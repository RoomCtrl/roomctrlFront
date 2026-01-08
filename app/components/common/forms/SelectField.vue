<template>
  <div>
    <InputGroup>
      <InputGroupAddon v-if="icon">
        <i :class="icon" />
      </InputGroupAddon>
      <FloatLabel variant="on">
        <Select
          :id="id"
          :model-value="modelValue"
          :options="options"
          :option-label="optionLabel"
          :option-value="optionValue"
          :placeholder="placeholder"
          :loading="loading"
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
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string
  label: string
  modelValue?: string | number | null
  options: any[]
  optionLabel?: string
  optionValue?: string
  errorMessage?: string
  icon?: string
  placeholder?: string
  loading?: boolean
  autofocus?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: null,
  errorMessage: '',
  icon: '',
  optionLabel: 'label',
  optionValue: 'value',
  placeholder: '',
  loading: false,
  autofocus: false,
})

defineEmits<{
  'update:modelValue': [value: string | number | null]
  'blur': []
}>()
</script>

<style scoped>
.error-message-wrapper {
  min-height: 1.7rem;
}
</style>
