<template>
  <div>
    <Toast />
    <Button
      icon="pi pi-exclamation-circle"
      severity="danger"
      @click="visible = true"
    />
    <Dialog
      v-model:visible="visible"
      header="Zglosznie sali"
    >
      <form
        class="flex flex-col gap-4"
        @submit.prevent="submitForm"
      >
        <div class="flex flex-col gap-4">
          <div class="w-[70vw] md:w-[23rem]">
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-bars" />
              </InputGroupAddon>
              <FloatLabel variant="on">
                <Select
                  id="category"
                  v-model="category"
                  :class="{ 'p-invalid': categoryError }"
                  :options="categoryOptions"
                  optionLabel="label"
                  optionValue="value"
                  autofocus
                  @blur="categoryBlur"
                />
                <label for="category">{{ $t('forms.fields.category') }}</label>
              </FloatLabel>
            </InputGroup>
            <Message
              v-if="categoryError"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ categoryError }}
            </Message>
          </div>

          <div class="w-[70vw] md:w-[23rem]">
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-pencil" />
              </InputGroupAddon>
              <FloatLabel variant="on">
                <Textarea
                  id="description"
                  v-model="description"
                  :class="{ 'p-invalid': descriptionError }"
                  type="description"
                  toggleMask
                  fluid
                  @blur="descriptionBlur"
                />
                <label for="description">{{ $t('forms.fields.description') }}</label>
              </FloatLabel>
            </InputGroup>
            <Message
              v-if="descriptionError"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ descriptionError }}
            </Message>
          </div>

          <div class="w-[70vw] md:w-[23rem]">
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-chart-line" />
              </InputGroupAddon>
              <FloatLabel variant="on">
                <Select
                  id="priority"
                  v-model="priority"
                  :class="{ 'p-invalid': priorityError }"
                  :options="priorityOptions"
                  optionLabel="label"
                  optionValue="value"
                  toggleMask
                  fluid
                  @blur="priorityBlur"
                />
                <label for="priority">{{ $t('forms.fields.priority') }}</label>
              </FloatLabel>
            </InputGroup>
            <Message
              v-if="priorityError"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ priorityError }}
            </Message>
          </div>
        </div>

        <div class="flex justify-end">
          <Button
            :label="$t('common.buttons.logIn')"
            :loading="loading"
            severity="danger"
            type="submit"
            class="w-[65vw] md:w-[15rem]"
          />
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { useForm, useField, defineRule } from 'vee-validate'
import { required } from '@vee-validate/rules'

defineRule('required', required)
const props = defineProps<{
  roomId: string
}>()
const visible = ref(false)
const { createIssue } = useIssue()
const toast = useToast()
interface IIssueRoomCreate {
  roomId: string
  category: string
  description: string
  priority: string
}

const { handleSubmit, resetForm } = useForm<IIssueRoomCreate>({
  validationSchema: {
    category: 'required',
    description: 'required',
    priority: 'required',
  },
})

const { value: category, errorMessage: categoryError, handleBlur: categoryBlur } = useField<string>('category')
const { value: description, errorMessage: descriptionError, handleBlur: descriptionBlur } = useField<string>('description')
const { value: priority, errorMessage: priorityError, handleBlur: priorityBlur } = useField<string>('priority')

const loading = ref<boolean>(false)

const categoryOptions = [

  { label: 'Equipment', value: 'equipment' },
  { label: 'Infrastructure', value: 'infrastructure' },
  { label: 'Furniture', value: 'furniture' },

]

const priorityOptions = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'Critical', value: 'critical' },
]

const submitForm = handleSubmit(async (formValues: IIssueRoomCreate) => {
  formValues.roomId = props.roomId
  loading.value = true
  try {
    await createIssue(formValues)
    resetForm()
  }
  finally {
    loading.value = false
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Issue reported successfully',
      life: 3000,
    })
  }
})
</script>
