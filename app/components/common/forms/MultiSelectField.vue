<template>
  <div>
    <InputGroup>
      <InputGroupAddon v-if="icon">
        <i :class="icon" />
      </InputGroupAddon>
      <FloatLabel variant="on">
        <MultiSelect
          :id="id"
          :model-value="modelValue"
          :options="options"
          :option-label="optionLabel"
          :option-value="optionValue"
          :placeholder="placeholder"
          :filter="filter"
          :loading="loading"
          :class="{ 'p-invalid': errorMessage }"
          :autofocus="autofocus"
          display="chip"
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
      <small
        v-else-if="hint"
        class="error-message-wrapper text-gray-500"
      >
        {{ hint }}
      </small>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string
  label: string
  modelValue?: any[]
  options: any[]
  optionLabel?: string
  optionValue?: string
  errorMessage?: string
  icon?: string
  hint?: string
  placeholder?: string
  filter?: boolean
  loading?: boolean
  autofocus?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  errorMessage: '',
  icon: '',
  optionLabel: 'label',
  optionValue: 'value',
  placeholder: '',
  filter: false,
  loading: false,
  autofocus: false,
})

defineEmits<{
  'update:modelValue': [value: any[]]
  'blur': []
}>()
</script>

<style scoped>
.error-message-wrapper {
  min-height: 1.7rem;
}
</style>
