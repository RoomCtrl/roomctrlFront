<template>
  <div class="flex flex-row gap-1">
    <Button
      v-for="button in buttons"
      :key="button.id"
      :label="button.title"
      severity="info"
      :variant="isActive === button.id ? 'outlined': ''"
      @click="handleSelectedButton(button.date, button.id)"
    />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const emit = defineEmits(['selectedButton'])

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(today.getDate() + 1)
const isActive = ref('')

const buttons = ref([
  {
    id: 'today',
    title: t('date.today'),
    date: today,
  },
  {
    id: 'tomorrow',
    title: t('date.tomorrow'),
    date: tomorrow,
  },
])

const handleSelectedButton = (date: Date, id: string) => {
  if (isActive.value === id) {
    isActive.value = ''
    emit('selectedButton', null)
  }
  else {
    isActive.value = id
    emit('selectedButton', date)
  }
}
</script>
