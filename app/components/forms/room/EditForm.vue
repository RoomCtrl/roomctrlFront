<template>
  <form
    class="grid grid-cols-4 w-full gap-x-4 pt-4"
    @submit.prevent="editRoomSubmit"
  >
    <div class="col-span-2">
      <FormTextField
        id="roomName"
        v-model="roomName"
        :label="$t('forms.fields.room.name')"
        :errorMessage="roomNameError"
        @blur="roomNameBlur"
      />
    </div>

    <div>
      <FormTextField
        id="location"
        v-model="location"
        :label="$t('forms.fields.room.location')"
        :errorMessage="locationError"
        @blur="locationBlur"
      />
    </div>

    <div>
      <FormSelectField
        id="status"
        v-model="status"
        :options="statusOptions"
        :label="$t('forms.fields.status')"
        :errorMessage="statusError"
        @blur="statusBlur"
      />
    </div>

    <div class="col-span-1">
      <FormNumberField
        id="capacity"
        v-model="capacity"
        :label="$t('forms.fields.room.capacity')"
        :errorMessage="capacityError"
        @blur="capacityBlur"
      />
    </div>

    <div>
      <FormNumberField
        id="size"
        v-model="size"
        :label="$t('forms.fields.room.size')"
        :errorMessage="sizeError"
        @blur="sizeBlur"
      />
    </div>

    <div>
      <FormTextField
        id="access"
        v-model="access"
        :label="$t('forms.fields.room.access')"
        :errorMessage="accessError"
        @blur="accessBlur"
      />
    </div>

    <div>
      <FormTextField
        id="lighting"
        v-model="lighting"
        :label="$t('forms.fields.room.lighting')"
        :errorMessage="lightingError"
        @blur="lightingBlur"
      />
    </div>

    <div class="col-span-2">
      <FormTextArea
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
          <FormNumberField
            id="airConditioningMin"
            v-model="airConditioningMin"
            label="Min"
            :errorMessage="airConditioningMinError"
            @blur="airConditioningMinBlur"
          />
        </div>
        <div class="w-full">
          <FormNumberField
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
              <FormTextField
                :id="`equipment-name-${index}`"
                v-model="item.name"
                :label="$t('forms.fields.room.equipment.name')"
              />
            </div>
            <div class="flex gap-2">
              <div class="flex-1">
                <FormSelectField
                  :id="`equipment-category-${index}`"
                  v-model="item.category"
                  :label="$t('forms.fields.room.equipment.category')"
                  :options="equipmentCategories"
                />
              </div>
              <div class="w-full">
                <FormNumberField
                  :id="`equipment-quantity-${index}`"
                  v-model="item.quantity"
                  :label="$t('forms.fields.room.equipment.quantity')"
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
        type="button"
        :label="$t('forms.roomForm.buttons.cancel')"
        severity="danger"
        variant="outlined"
        @click="$emit('cancel')"
      />
      <Button
        type="submit"
        :label="$t('forms.roomForm.buttons.update')"
        severity="success"
        variant="outlined"
        :loading="loading"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import FormNumberField from '~/components/common/FormNumberField.vue'
import FormSelectField from '~/components/common/FormSelectField.vue'
import FormTextArea from '~/components/common/FormTextArea.vue'
import FormTextField from '~/components/common/FormTextField.vue'
import type { IRoomCreateRequest, IRoomEqupiment, IRoomResponse } from '~/interfaces/RoomsIntefaces'

const props = defineProps<{
  roomId: string
}>()

const { updateRoom, fetchRoom, room, loading } = useRoom()
const { user } = useAuth()
const { t } = useI18n()
const confirm = useConfirm()
const toast = useToast()

const { handleSubmit, resetForm } = useForm<IRoomCreateRequest>({
  validationSchema: {
    roomName: 'required|min:3',
    capacity: 'required|integer|min:1|max:200',
    size: 'required',
    location: 'required',
    access: 'required',
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
const { value: equipment, errorMessage: equipmentError, handleBlur: equipmentBlur } = useField<IRoomEqupiment[]>('equipment', undefined, {
  initialValue: [],
})

const emit = defineEmits<{
  cancel: []
  success: []
}>()

const editRoomSubmit = handleSubmit(async (formValues: IRoomCreateRequest) => {
  try {
    formValues.organizationId = user.value?.organization.id as string

    if (airConditioningMin.value !== undefined && airConditioningMax.value !== undefined) {
      formValues.airConditioning = {
        min: airConditioningMin.value,
        max: airConditioningMax.value,
      }
    }

    await updateRoom(props.roomId, formValues)

    toast.add({
      severity: 'success',
      summary: t('common.toast.success'),
      detail: t('forms.roomForm.messages.roomUpdated'),
      life: 3000,
    })

    emit('success')
  }
  catch (error) {
    toast.add({
      severity: 'error',
      summary: t('common.toast.error'),
      detail: t('common.toast.roomUpdateError'),
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

onMounted(async () => {
  await fetchRoom(props.roomId, true)

  if (room.value) {
    resetForm({
      values: {
        roomName: room.value.roomName,
        status: room.value.status,
        capacity: room.value.capacity,
        size: room.value.size,
        location: room.value.location,
        access: room.value.access,
        description: room.value.description,
        lighting: room.value.lighting,
      },
    })

    if (room.value.airConditioning) {
      airConditioningMin.value = room.value.airConditioning.min
      airConditioningMax.value = room.value.airConditioning.max
    }

    if (room.value.equipment && room.value.equipment.length > 0) {
      equipment.value = [...room.value.equipment]
    }
  }
})
</script>

<style scoped>
.inputLabel {
  @apply block text-base font-medium mb-2;
}
</style>
