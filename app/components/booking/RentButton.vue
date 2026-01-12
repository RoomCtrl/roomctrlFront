<template>
  <div>
    <Button
      :label="buttonLabel"
      :icon="buttonIcon"
      severity="success"
      variant="outlined"
      @click="visible = true"
    />
    <Dialog
      v-model:visible="visible"
      modal
      :header="$t('pages.roomDetails.bookingForm.title')"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <FormsBookingRentForm
        :provided-room-id="roomId"
        :visible="visible"
        :my-bookings="myBookings"
        @cancel="closeModal"
        @success="closeModal"
      />
    </Dialog>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  roomId?: string
  capacity?: number
  buttonLabel?: string
  buttonIcon?: string
  myBookings?: boolean
}>()

const visible = ref(false)

function closeModal() {
  visible.value = false
}
</script>
