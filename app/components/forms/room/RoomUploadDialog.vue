<template>
  <Button
    v-tooltip.left="{ value: $t('forms.roomImageUpload.tooltipAddImage') }"
    pt:root:style="--p-button-padding-y: 2px; --p-button-padding-x: 0px"
    icon="pi pi-image"
    severity="success"
    raised
    variant="outlined"
    @click="visible = true"
  />
  <Dialog
    v-model:visible="visible"
    :header="$t('forms.roomImageUpload.dialogTitle')"
    :modal="true"
    :closable="true"
    class="w-[40vw]"
  >
    <div class="flex flex-col gap-4">
      <p class="text-gray-600 dark:text-gray-400">
        {{ $t('forms.roomImageUpload.allowedFormats') }}
      </p>
      <FileUpload
        ref="fileUploadRef"
        name="demo[]"
        accept="image/jpeg,image/png,application/pdf"
        :max-file-size="5000000"
        :choose-label="uploadedFiles.length > 0 ? $t('forms.roomImageUpload.filesSelected', { count: uploadedFiles.length }) : $t('forms.roomImageUpload.chooseFiles')"
        :auto="false"
        :custom-upload="true"
        :multiple="true"
        @select="onFileSelect"
        @uploader="handleUpload"
      />
      <div>
        <RoomImagesDelete
          :room-id="roomId"
          class="col-span-3 md:col-span-4 lg:col-span-3"
        />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import RoomImagesDelete from '~/components/rooms/detailsParts/RoomImagesDelete.vue'

const props = defineProps<{
  roomId: string
}>()

const visible = ref(false)

const { uploadImage } = useRoom()
const toast = useToast()

const uploadedFiles = ref<File[]>([])
const uploadLoading = ref(false)

const fileUploadRef = ref<string[]>([])

const uploadRoomId = ref<string | null>(null)

const onFileSelect = (event: any) => {
  if (event.files && event.files.length > 0) {
    uploadedFiles.value = Array.from(event.files)
  }
}

const resetUploadModal = () => {
  uploadedFiles.value = []
  uploadRoomId.value = null
  visible.value = false
  fileUploadRef.value = []
}

const handleUpload = async (event: any) => {
  const filesToUpload = event.files || uploadedFiles.value

  if (filesToUpload.length === 0 || !props.roomId) {
    toast.add({
      severity: 'error',
      summary: $t('common.toast.error'),
      detail: $t('forms.roomImageUpload.errors.noFiles'),
      life: 3000,
    })
    return
  }

  uploadLoading.value = true
  try {
    for (const file of filesToUpload) {
      await uploadImage(props.roomId, file)
    }

    const message = filesToUpload.length === 1
      ? $t('forms.roomImageUpload.success.singleImage')
      : $t('forms.roomImageUpload.success.multipleImages', { count: filesToUpload.length })

    toast.add({
      severity: 'success',
      summary: $t('common.toast.success'),
      detail: message,
      life: 3000,
    })
    visible.value = false
    resetUploadModal()
  }
  catch (error) {
    toast.add({
      severity: 'error',
      summary: $t('common.toast.error'),
      detail: error instanceof Error ? error.message : $t('forms.roomImageUpload.errors.uploadFailed'),
      life: 3000,
    })
  }
  finally {
    uploadLoading.value = false
  }
}
</script>
