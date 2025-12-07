<template>
  <form
    class="grid grid-cols-4 w-full gap-y-6 gap-x-4"
    @submit.prevent="submitForm"
  >
    <div class="col-span-2">
      <label
        for="roomName"
        class="block text-sm font-medium mb-2"
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
          placeholder="Sala Konferencyjna 201"
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
        class="block text-sm font-medium mb-2"
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
          placeholder="Piętro 2, Skrzydło A"
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
        class="block text-sm font-medium mb-2"
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
          placeholder="12"
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
        class="block text-sm font-medium mb-2"
      >
        {{ $t('tables.headers.size') }} (m²)
      </label>
      <div class="w-full">
        <InputNumber
          id="size"
          v-model="formData.size"
          class="w-full"
          :class="{ 'p-invalid': errors.size }"
          placeholder="45.5"
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
        class="block text-sm font-medium mb-2"
      >
        Dostęp
      </label>
      <div class="w-full">
        <InputText
          id="access"
          v-model="formData.access"
          type="text"
          class="w-full"
          :class="{ 'p-invalid': errors.access }"
          placeholder="Karta magnetyczna"
        />
      </div>
      <small
        v-if="errors.access"
        class="text-red-500 block mt-1"
      >
        {{ errors.access }}
      </small>
    </div>

    <div class="col-span-2">
      <label
        for="description"
        class="block text-sm font-medium mb-2"
      >
        {{ $t('tables.headers.description') }}
      </label>
      <div class="w-full">
        <Textarea
          id="description"
          v-model="formData.description"
          class="w-full"
          :class="{ 'p-invalid': errors.description }"
          placeholder="Przestronna sala konferencyjna..."
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

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label
          for="lighting"
          class="block text-sm font-medium mb-2"
        >
          Oświetlenie
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

      <div>
        <label class="block text-sm font-medium mb-2">
          Klimatyzacja (min/max °C)
        </label>
        <div class="flex gap-2">
          <div class="w-full">
            <InputNumber
              v-model="formData.airConditioning.min"
              class="w-full"
              :class="{ 'p-invalid': errors.airConditioningMin }"
              placeholder="18"
              fluid
            />
          </div>
          <div class="w-full">
            <InputNumber
              v-model="formData.airConditioning.max"
              class="w-full"
              :class="{ 'p-invalid': errors.airConditioningMax }"
              placeholder="24"
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
    </div>

    <div class="col-span-full">
      <div class="flex items-center justify-between mb-3">
        <label class="block text-sm font-medium">
          Wyposażenie
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
          class="flex gap-2 items-start border rounded p-2"
        >
          <div class="flex-1 space-y-2">
            <div class="w-full">
              <InputText
                v-model="item.name"
                type="text"
                class="w-full text-sm"
                placeholder="Nazwa wyposażenia"
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
                  placeholder="Ilość"
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
        Nie dodano wyposażenia
      </small>
    </div>

    <div class="col-span-full flex justify-end gap-3 pt-4">
      <Button
        type="submit"
        :label="isEditMode ? 'Aktualizuj' : 'Utwórz'"
        :loading="loading"
      />
      <Button
        type="button"
        label="Anuluj"
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
  submit: [data: IRoomCreateRequest | IRoomUpdateRequest]
  cancel: []
}>()

const isEditMode = computed(() => !!props.room)

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

const lightingOptions = [
  { label: 'Naturalne', value: 'natural' },
  { label: 'Sztuczne', value: 'artificial' },
  { label: 'Mieszane', value: 'mixed' },
]

const equipmentCategories = [
  { label: 'Video', value: 'video' },
  { label: 'Audio', value: 'audio' },
  { label: 'Meble', value: 'furniture' },
  { label: 'Akcesoria', value: 'accessory' },
  { label: 'Inne', value: 'other' },
]

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
    errors.roomName = 'Nazwa sali jest wymagana'
  }
  if (!formData.capacity || formData.capacity < 1) {
    errors.capacity = 'Pojemność musi być większa niż 0'
  }
  if (!formData.size || formData.size < 1) {
    errors.size = 'Rozmiar musi być większy niż 0'
  }
  if (!formData.location.trim()) {
    errors.location = 'Lokalizacja jest wymagana'
  }
  if (!formData.access.trim()) {
    errors.access = 'Dostęp jest wymagany'
  }
  if (!formData.description.trim()) {
    errors.description = 'Opis jest wymagany'
  }
  if (formData.airConditioning && formData.airConditioning.min && formData.airConditioning.max && formData.airConditioning.min >= formData.airConditioning.max) {
    errors.airConditioningMin = 'Temperatura min musi być mniejsza niż max'
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

  emit('submit', submitData)
}

const addEquipment = () => {
  formData.equipment.push({
    name: '',
    category: 'other',
    quantity: 1,
  })
}

const removeEquipment = (index: number) => {
  formData.equipment.splice(index, 1)
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
