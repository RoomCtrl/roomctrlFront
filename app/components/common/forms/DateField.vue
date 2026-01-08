<template>
  <div>
    <InputGroup>
      <InputGroupAddon v-if="icon">
        <i :class="icon" />
      </InputGroupAddon>
      <FloatLabel variant="on">
        <DatePicker
          :id="id"
          :model-value="modelValue"
          :show-time="showTime"
          :time-only="timeOnly"
          :hour-format="hourFormat"
          :date-format="dateFormat"
          :placeholder="placeholder"
          :class="{ 'p-invalid': errorMessage }"
          :autofocus="autofocus"
          :fluid="fluid"
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
  fluid?: boolean
  modelValue?: Date | null
  errorMessage?: string
  icon?: string
  showTime?: boolean
  timeOnly?: boolean
  hourFormat?: '12' | '24'
  dateFormat?: string
  placeholder?: string
  autofocus?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: null,
  errorMessage: '',
  icon: '',
  showTime: false,
  timeOnly: false,
  hourFormat: '24',
  dateFormat: 'yy/mm/dd',
  placeholder: '',
  autofocus: false,
})

defineEmits<{
  'update:modelValue': [value: Date | null]
  'blur': []
}>()
</script>

<style scoped>
.error-message-wrapper {
  min-height: 1.7rem;
}
</style>
