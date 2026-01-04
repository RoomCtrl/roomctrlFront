<template>
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
  modelValue?: any[]
  options: any[]
  optionLabel?: string
  optionValue?: string
  errorMessage?: string
  icon?: string
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
