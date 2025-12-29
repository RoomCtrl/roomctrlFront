<template>
  <div class="w-[70vw] md:w-[23rem]">
    <InputGroup>
      <InputGroupAddon v-if="icon">
        <i :class="icon" />
      </InputGroupAddon>

      <FloatLabel variant="on">
        <InputText
          :id="name"
          v-model="model"
          type="text"
          :class="{ 'p-invalid': error }"
          :autofocus="autofocus"
          @blur="onBlur"
        />
        <label :for="name">{{ label }}</label>
      </FloatLabel>
    </InputGroup>

    <Message
      v-if="error"
      severity="error"
      size="small"
      variant="simple"
    >
      {{ error }}
    </Message>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  name: string
  label: string
  icon?: string
  error?: string
  autofocus?: boolean
}>()

const emits = defineEmits(['update:modelValue', 'blur'])

const model = computed({
  get: () => props.modelValue,
  set: val => emits('update:modelValue', val),
})

const onBlur = () => emits('blur')
</script>
