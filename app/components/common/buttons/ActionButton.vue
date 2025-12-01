<template>
  <div v-if="mode === 'add' || mode === 'edit'">
    <Button
      :pt:root:style="buttonStyle"
      :label="label"
      :icon="icon"
      :severity="mode === 'add' ? 'success' : 'warn'"
      variant="outlined"
      @click="visible = true"
    />
    <Dialog
      v-model:visible="visible"
      :header="modalHeader"
      modal
    >
      <slot name="modal" />
    </Dialog>
  </div>
  <Button
    v-else-if="mode === 'delete'"
    :pt:root:style="buttonStyle"
    :label="label"
    :icon="icon"
    severity="danger"
    variant="outlined"
    @click="deleteMessage"
  />
  <Button
    v-else
    :pt:root:style="buttonStyle"
    :label="label"
    :icon="icon"
    severity="info"
    variant="outlined"
    @click="handleGoRoom"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  label?: string
  icon?: string
  inTable?: boolean
  modalHeader?: string
  roomId?: string
  mode: 'add' | 'edit' | 'delete' | 'goRoom'
}>()

const visible = ref(false)

const buttonStyle = computed(() => {
  return props.inTable ? '--p-button-padding-y: 2px; --p-button-padding-x: 0px' : ''
})

const deleteMessage = () => {
  console.log('Usunieto')
}

const handleGoRoom = () => {
  navigateTo('/rooms/' + props.roomId)
}
</script>
