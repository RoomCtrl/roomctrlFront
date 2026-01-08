<template>
  <form
    class="grid grid-cols-4 w-full gap-x-4 pt-4"
    @submit.prevent="addRoomSubmit"
  >
    <div class="col-span-2">
      <CommonFormsTextField
        id="roomName"
        v-model="roomName"
        :label="$t('forms.fields.room.name')"
        :errorMessage="roomNameError"
        @blur="roomNameBlur"
      />
    </div>

    <div>
      <CommonFormsTextField
        id="location"
        v-model="location"
        :label="$t('forms.fields.room.location')"
        :errorMessage="locationError"
        @blur="locationBlur"
      />
    </div>

    <div>
      <CommonFormsSelectField
        id="status"
        v-model="status"
        :options="statusOptions"
        :label="$t('forms.fields.status')"
        :errorMessage="statusError"
        @blur="statusBlur"
      />
    </div>

    <div class="col-span-1">
      <CommonFormsNumberField
        id="capacity"
        v-model="capacity"
        :label="$t('forms.fields.room.capacity')"
        :errorMessage="capacityError"
        @blur="capacityBlur"
      />
    </div>

    <div>
      <CommonFormsNumberField
        id="size"
        v-model="size"
        :label="$t('forms.fields.room.size')"
        :errorMessage="sizeError"
        @blur="sizeBlur"
      />
    </div>

    <div>
      <CommonFormsTextField
        id="access"
        v-model="access"
        :label="$t('forms.fields.room.access')"
        :errorMessage="accessError"
        @blur="accessBlur"
      />
    </div>

    <div>
      <CommonFormsTextField
        id="lighting"
        v-model="lighting"
        :label="$t('forms.fields.room.lighting')"
        :errorMessage="lightingError"
        @blur="lightingBlur"
      />
    </div>

    <div class="col-span-2">
      <CommonFormsTextArea
        id="description"
        v-model="description"
        :label="$t('forms.fields.description')"
        :errorMessage="descriptionError"
        @blur="descriptionBlur"
      />
    </div>

    <div>
      <label class="inputLabel">
        {{ $t('forms.fields.room.airConditioning') }}
      </label>
      <div class="flex gap-2">
        <div class="w-full">
          <CommonFormsNumberField
            id="airConditioningMin"
            v-model="airConditioningMin"
            label="Min"
            :errorMessage="airConditioningMinError"
            @blur="airConditioningMinBlur"
          />
        </div>
        <div class="w-full">
          <CommonFormsNumberField
            id="airConditioningMax"
            v-model="airConditioningMax"
            label="Max"
            :errorMessage="airConditioningMaxError"
            @blur="airConditioningMaxBlur"
          />
        </div>
      </div>
    </div>

    <div class="col-span-full">
      <div class="flex items-center gap-2 mb-3">
        <label class="block text-base">
          {{ $t('forms.fields.room.equipment.title') }}
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
        v-if="equipment && equipment.length > 0"
        class="gap-2 grid grid-cols-2"
      >
        <div
          v-for="(item, index) in equipment"
          :key="index"
          class="flex gap-2 items-start border border-gray-600 bg-gray-700 rounded p-2"
        >
          <div class="flex-1 space-y-2">
            <div class="w-full">
              <CommonFormsTextField
                :id="`equipment-name-${index}`"
                v-model="item.name"
                :label="$t('forms.fields.room.equipment.name')"
              />
            </div>
            <div class="flex gap-2">
              <div class="flex-1">
                <CommonFormsSelectField
                  :id="`equipment-category-${index}`"
                  v-model="item.category"
                  :label="$t('forms.fields.room.equipment.category')"
                  :options="equipmentCategories"
                />
              </div>
              <div class="w-full">
                <CommonFormsNumberField
                  :id="`equipment-quantity-${index}`"
                  v-model="item.quantity"
                  :label="$t('forms.fields.room.equipment.quantity')"
                  :min="1"
                  :max="1000"
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
        type="button"
        :label="$t('forms.roomForm.buttons.cancel')"
        severity="danger"
        variant="outlined"
        @click="$emit('cancel')"
      />
      <Button
        type="submit"
        :label="$t('forms.roomForm.buttons.create')"
        :loading="loading"
        severity="success"
        variant="outlined"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import type { IRoomCreateRequest, IRoomEqupiment } from '~/interfaces/RoomsIntefaces'
import { useField, useForm } from 'vee-validate'

const { createRoom, loading } = useRoom()
const { user } = useAuth()
const { t } = useI18n()
const confirm = useConfirm()
const toast = useToast()

const { handleSubmit, resetForm } = useForm<IRoomCreateRequest>({
  validationSchema: {
    roomName: 'required|min:3|max:255',
    status: 'required',
    capacity: 'required|integer|min_value:1|max_value:200',
    size: 'required|min_value:1|max_value:1000',
    location: 'required|min:3|max:255',
    access: 'required|max:100',
    lighting: 'max:100',
    description: 'min:10|max:2000',
    airConditioningMin: 'min_value:16|max_value:30',
    airConditioningMax: 'min_value:16|max_value:40',
  },
})

const statusOptions = [
  { label: t('pages.adminDashboard.roomList.statuses.available'), value: 'available' },
  { label: t('pages.adminDashboard.roomList.statuses.out_of_use'), value: 'out_of_use' },
]

const { value: roomName, errorMessage: roomNameError, handleBlur: roomNameBlur } = useField<string>('roomName')
const { value: status, errorMessage: statusError, handleBlur: statusBlur } = useField<string>('status')
const { value: capacity, errorMessage: capacityError, handleBlur: capacityBlur } = useField<number>('capacity')
const { value: size, errorMessage: sizeError, handleBlur: sizeBlur } = useField<number>('size')
const { value: location, errorMessage: locationError, handleBlur: locationBlur } = useField<string>('location')
const { value: access, errorMessage: accessError, handleBlur: accessBlur } = useField<string>('access')
const { value: description, errorMessage: descriptionError, handleBlur: descriptionBlur } = useField<string>('description')
const { value: lighting, errorMessage: lightingError, handleBlur: lightingBlur } = useField<string>('lighting')
const { value: airConditioningMin, errorMessage: airConditioningMinError, handleBlur: airConditioningMinBlur } = useField<number>('airConditioningMin')
const { value: airConditioningMax, errorMessage: airConditioningMaxError, handleBlur: airConditioningMaxBlur } = useField<number>('airConditioningMax')
const { value: equipment } = useField<IRoomEqupiment[]>('equipment', undefined, {
  initialValue: [],
})
const emit = defineEmits<{
  cancel: []
}>()

const addRoomSubmit = handleSubmit(async (formValues: IRoomCreateRequest) => {
  try {
    formValues.organizationId = user.value?.organization.id as string

    if (airConditioningMin.value !== undefined && airConditioningMax.value !== undefined) {
      formValues.airConditioning = {
        min: airConditioningMin.value,
        max: airConditioningMax.value,
      }
    }

    await createRoom(formValues)
    resetForm()
    toast.add({
      severity: 'success',
      summary: t('common.toast.success'),
      detail: t('toast.messages.success.roomAdded'),
      life: 3000,
    })
    emit('cancel')
  }
  catch (err: any) {
    toast.add({
      severity: 'error',
      summary: t('common.toast.error'),
      detail: error.message || t('forms.roomForm.messages.errorCreatingRoom'),
      life: 3000,
    })
  }
})

const equipmentCategories = computed(() => [
  { label: t('forms.roomForm.equipmentCategories.video'), value: 'video' },
  { label: t('forms.roomForm.equipmentCategories.audio'), value: 'audio' },
  { label: t('forms.roomForm.equipmentCategories.other'), value: 'computer' },
  { label: t('forms.roomForm.equipmentCategories.accessory'), value: 'accessory' },
  { label: t('forms.roomForm.equipmentCategories.furniture'), value: 'furniture' },
])

const addEquipment = () => {
  if (!equipment.value) {
    equipment.value = []
  }
  equipment.value.push({
    name: '',
    category: 'computer',
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
      equipment.value.splice(index, 1)
    },
  })
}
</script>

<style scoped>
.inputLabel {
  @apply block text-base font-medium mb-2;
}
</style>
