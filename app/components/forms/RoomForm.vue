<template>
  <form
    class="grid grid-cols-4 w-full gap-y-6 gap-x-4"
    @submit.prevent="submitForm"
  >
    <div class="col-span-2">
      <label
        for="roomName"
        class="inputLabel"
      >
        {{ $t('tables.headers.roomName') }}
      </label>
      <div class="w-full">
        <InputText
          id="roomName"
          v-model="formData.roomName"
          type="text"
          class="w-full"
          :class="{ 'p-invalid': errors.roomName }"
          :placeholder="$t('forms.roomForm.placeholders.roomName')"
        />
      </div>
      <small
        v-if="errors.roomName"
        class="text-red-500 block mt-1"
      >
        {{ errors.roomName }}
      </small>
    </div>

    <div class="col-span-2">
      <label
        for="location"
        class="inputLabel"
      >
        {{ $t('tables.headers.location') }}
      </label>
      <div class="w-full">
        <InputText
          id="location"
          v-model="formData.location"
          type="text"
          class="w-full"
          :class="{ 'p-invalid': errors.location }"
          :placeholder="$t('forms.roomForm.placeholders.location')"
        />
      </div>
      <small
        v-if="errors.location"
        class="text-red-500 block mt-1"
      >
        {{ errors.location }}
      </small>
    </div>

    <div class="col-span-1">
      <label
        for="capacity"
        class="inputLabel"
      >
        {{ $t('tables.headers.capacity') }}
      </label>
      <div class="w-full">
        <InputNumber
          id="capacity"
          v-model="formData.capacity"
          class="w-full"
          fluid
          :class="{ 'p-invalid': errors.capacity }"
          :placeholder="$t('forms.roomForm.placeholders.capacity')"
        />
      </div>
      <small
        v-if="errors.capacity"
        class="text-red-500 block mt-1"
      >
        {{ errors.capacity }}
      </small>
    </div>

    <div>
      <label
        for="size"
        class="inputLabel"
      >
        {{ $t('tables.headers.size') }} (m²)
      </label>
      <div class="w-full">
        <InputNumber
          id="size"
          v-model="formData.size"
          class="w-full"
          :class="{ 'p-invalid': errors.size }"
          :placeholder="$t('forms.roomForm.placeholders.size')"
          fluid
          :min-fraction-digits="1"
          :max-fraction-digits="2"
        />
      </div>
      <small
        v-if="errors.size"
        class="text-red-500 block mt-1"
      >
        {{ errors.size }}
      </small>
    </div>

    <div>
      <label
        for="access"
        class="inputLabel"
      >
        {{ $t('forms.fields.access') }}
      </label>
      <div class="w-full">
        <InputText
          id="access"
          v-model="formData.access"
          type="text"
          class="w-full"
          :class="{ 'p-invalid': errors.access }"
          :placeholder="$t('forms.roomForm.placeholders.access')"
        />
      </div>
      <small
        v-if="errors.access"
        class="text-red-500 block mt-1"
      >
        {{ errors.access }}
      </small>
    </div>

    <div>
      <label
        for="lighting"
        class="inputLabel"
      >
        {{ $t('forms.fields.lighting') }}
      </label>
      <div class="w-full">
        <Select
          id="lighting"
          v-model="formData.lighting"
          :options="lightingOptions"
          option-label="label"
          option-value="value"
          class="w-full"
          :class="{ 'p-invalid': errors.lighting }"
        />
      </div>
      <small
        v-if="errors.lighting"
        class="text-red-500 block mt-1"
      >
        {{ errors.lighting }}
      </small>
    </div>

    <div class="col-span-2">
      <label
        for="description"
        class="inputLabel"
      >
        {{ $t('tables.headers.description') }}
      </label>
      <div class="w-full">
        <Textarea
          id="description"
          v-model="formData.description"
          class="w-full"
          :class="{ 'p-invalid': errors.description }"
          :placeholder="$t('forms.roomForm.placeholders.description')"
          rows="3"
        />
      </div>
      <small
        v-if="errors.description"
        class="text-red-500 block mt-1"
      >
        {{ errors.description }}
      </small>
    </div>

    <div class="col-span-2">
      <label
        for="image"
        class="inputLabel"
      >
        {{ $t('forms.fields.image') }}
      </label>
      <div class="w-full">
        <FileUpload
          id="image"
          mode="basic"
          accept="image/jpeg,image/png,application/pdf"
          :max-file-size="5000000"
          :choose-label="selectedImage ? selectedImage.name : $t('forms.roomForm.placeholders.chooseImage')"
          @select="onImageSelect"
        />
      </div>
      <small class="text-gray-400 block mt-1">
        Image file (JPG, PNG) or PDF document
      </small>
      <small
        v-if="selectedImage"
        class="text-gray-400 block mt-1"
      >
        {{ $t('forms.roomForm.messages.selectedImage') }}: {{ selectedImage.name }}
      </small>
    </div>

    <div>
      <label class="inputLabel">
        {{ $t('forms.fields.airConditioning') }}
      </label>
      <div class="flex gap-2">
        <div class="w-full">
          <InputNumber
            v-model="formData.airConditioning.min"
            class="w-full"
            :class="{ 'p-invalid': errors.airConditioningMin }"
            :placeholder="$t('forms.roomForm.placeholders.airConditioningMin')"
            fluid
          />
        </div>
        <div class="w-full">
          <InputNumber
            v-model="formData.airConditioning.max"
            class="w-full"
            :class="{ 'p-invalid': errors.airConditioningMax }"
            :placeholder="$t('forms.roomForm.placeholders.airConditioningMax')"
            fluid
          />
        </div>
      </div>
      <small
        v-if="errors.airConditioningMin"
        class="text-red-500 block mt-1"
      >
        {{ errors.airConditioningMin }}
      </small>
      <small
        v-if="errors.airConditioningMax"
        class="text-red-500 block mt-1"
      >
        {{ errors.airConditioningMax }}
      </small>
    </div>

    <div class="col-span-full">
      <div class="flex items-center gap-2 mb-3">
        <label class="block text-base">
          {{ $t('forms.fields.equipment') }}
        </label>
        <Button
          type="button"
          icon="pi pi-plus"
          size="small"
          rounded
          @click="addEquipment"
        />
      </div>

      <div
        v-if="formData.equipment.length > 0"
        class="gap-2 grid grid-cols-2"
      >
        <div
          v-for="(item, index) in formData.equipment"
          :key="index"
          class="flex gap-2 items-start border border-gray-600 bg-gray-700 rounded p-2"
        >
          <div class="flex-1 space-y-2">
            <div class="w-full">
              <InputText
                v-model="item.name"
                type="text"
                class="w-full text-sm"
                :placeholder="$t('forms.roomForm.placeholders.equipmentName')"
              />
            </div>
            <div class="flex gap-2">
              <div class="flex-1">
                <Select
                  v-model="item.category"
                  :options="equipmentCategories"
                  option-label="label"
                  option-value="value"
                  class="w-full text-sm"
                />
              </div>
              <div class="w-full">
                <InputNumber
                  v-model="item.quantity"
                  class="w-full text-sm"
                  :min="1"
                  :placeholder="$t('forms.roomForm.placeholders.equipmentQuantity')"
                />
              </div>
            </div>
          </div>
          <Button
            type="button"
            icon="pi pi-trash"
            size="small"
            severity="danger"
            rounded
            text
            @click="removeEquipment(index)"
          />
        </div>
      </div>
      <small
        v-else
        class="text-gray-500"
      >
        {{ $t('forms.roomForm.messages.noEquipment') }}
      </small>
    </div>

    <div class="col-span-full flex justify-end gap-3 pt-4">
      <Button
        type="submit"
        :label="isEditMode ? $t('forms.roomForm.buttons.update') : $t('forms.roomForm.buttons.create')"
        :loading="loading"
      />
      <Button
        type="button"
        :label="$t('forms.roomForm.buttons.cancel')"
        severity="secondary"
        @click="$emit('cancel')"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import type { IRoomCreateRequest, IRoomUpdateRequest, IEquipment } from '~/interfaces/RoomsIntefaces'

interface FormErrors {
  roomName?: string
  capacity?: string
  size?: string
  location?: string
  access?: string
  description?: string
  lighting?: string
  airConditioningMin?: string
  airConditioningMax?: string
}

interface RoomFormData extends IRoomCreateRequest {
  equipment: IEquipment[]
}

const props = defineProps<{
  room?: RoomFormData | null
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [data: IRoomCreateRequest | IRoomUpdateRequest, image?: File]
  cancel: []
}>()

const isEditMode = computed(() => !!props.room)
const selectedImage = ref<File | null>(null)

const formData = reactive<RoomFormData>({
  roomName: '',
  capacity: 0,
  size: 0,
  location: '',
  access: '',
  description: '',
  lighting: 'natural',
  airConditioning: {
    min: 18,
    max: 24,
  },
  equipment: [],
})

const errors = reactive<FormErrors>({})

const { t } = useI18n()
const confirm = useConfirm()

const lightingOptions = computed(() => [
  { label: t('forms.roomForm.lighting.natural'), value: 'natural' },
  { label: t('forms.roomForm.lighting.artificial'), value: 'artificial' },
  { label: t('forms.roomForm.lighting.mixed'), value: 'mixed' },
])

const equipmentCategories = computed(() => [
  { label: t('forms.roomForm.equipmentCategories.video'), value: 'video' },
  { label: t('forms.roomForm.equipmentCategories.audio'), value: 'audio' },
  { label: t('forms.roomForm.equipmentCategories.furniture'), value: 'furniture' },
  { label: t('forms.roomForm.equipmentCategories.accessory'), value: 'accessory' },
  { label: t('forms.roomForm.equipmentCategories.other'), value: 'other' },
])

const initializeForm = () => {
  if (props.room) {
    formData.roomName = props.room.roomName
    formData.capacity = props.room.capacity
    formData.size = props.room.size
    formData.location = props.room.location
    formData.access = props.room.access
    formData.description = props.room.description
    formData.lighting = props.room.lighting
    formData.airConditioning = { ...props.room.airConditioning }
    formData.equipment = props.room.equipment ? [...props.room.equipment] : []
  }
  else {
    formData.roomName = ''
    formData.capacity = 0
    formData.size = 0
    formData.location = ''
    formData.access = ''
    formData.description = ''
    formData.lighting = 'natural'
    formData.airConditioning = { min: 18, max: 24 }
    formData.equipment = []
  }
  selectedImage.value = null
  clearErrors()
}

const clearErrors = () => {
  Object.assign(errors, {
    roomName: undefined,
    capacity: undefined,
    size: undefined,
    location: undefined,
    access: undefined,
    description: undefined,
    lighting: undefined,
    airConditioningMin: undefined,
    airConditioningMax: undefined,
  })
}

const validateForm = (): boolean => {
  clearErrors()

  if (!formData.roomName.trim()) {
    errors.roomName = t('forms.roomForm.errors.roomNameRequired')
  }
  if (!formData.capacity || formData.capacity < 1) {
    errors.capacity = t('forms.roomForm.errors.capacityRequired')
  }
  if (!formData.size || formData.size < 1) {
    errors.size = t('forms.roomForm.errors.sizeRequired')
  }
  if (!formData.location.trim()) {
    errors.location = t('forms.roomForm.errors.locationRequired')
  }
  if (!formData.access.trim()) {
    errors.access = t('forms.roomForm.errors.accessRequired')
  }
  if (!formData.description.trim()) {
    errors.description = t('forms.roomForm.errors.descriptionRequired')
  }
  if (formData.airConditioning && formData.airConditioning.min && formData.airConditioning.max && formData.airConditioning.min >= formData.airConditioning.max) {
    errors.airConditioningMin = t('forms.roomForm.errors.airConditioningMinMax')
  }

  const hasErrors = Object.values(errors).some(error => error !== undefined)
  return !hasErrors
}

const submitForm = () => {
  if (!validateForm()) {
    return
  }

  const submitData: IRoomCreateRequest = {
    roomName: formData.roomName,
    capacity: formData.capacity,
    size: formData.size,
    location: formData.location,
    access: formData.access,
    description: formData.description,
    lighting: formData.lighting,
    airConditioning: formData.airConditioning,
    equipment: formData.equipment,
  }

  emit('submit', submitData, selectedImage.value || undefined)
}

const onImageSelect = (event: any) => {
  const file = event.files?.[0]
  if (file) {
    selectedImage.value = file
  }
}

const addEquipment = () => {
  formData.equipment.push({
    name: '',
    category: 'other',
    quantity: 1,
  })
}

const removeEquipment = (index: number) => {
  confirm.require({
    message: t('components.forms.roomForm.removeEquipment.title'),
    header: t('common.toast.danger'),
    icon: 'pi pi-info-circle',
    rejectLabel: t('common.buttons.cancel'),
    rejectProps: {
      label: t('common.buttons.cancel'),
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: t('common.buttons.delete'),
      severity: 'danger',
    },
    accept: () => {
      formData.equipment.splice(index, 1)
    },
  })
}

watch(
  () => props.room,
  () => {
    initializeForm()
  },
)

onMounted(() => {
  initializeForm()
})
</script>

<style scoped>
.inputLabel {
  @apply block text-base font-medium mb-2;
}
</style>
