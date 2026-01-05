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
      :header="$t('forms.titles.roomIssueReport')"
      modal
    >
      <form
        class="flex flex-col gap-4 pt-4"
        @submit.prevent="submitForm"
      >
        <div class="flex flex-col gap-4">
          <div class="w-[70vw] md:w-[23rem]">
            <FormSelectField
              id="category"
              v-model="category"
              :options="categoryOptions"
              autofocus
              icon="pi pi-bars"
              :label="$t('forms.fields.category')"
              :errorMessage="categoryError"
              @blur="categoryBlur"
            />
          </div>

          <div class="w-[70vw] md:w-[23rem]">
            <FormTextArea
              id="description"
              v-model="description"
              icon="pi pi-pencil"
              :label="$t('forms.fields.description')"
              :errorMessage="descriptionError"
              type="description"
              :rows="3"
              toggleMask
              fluid
              @blur="descriptionBlur"
            />
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

        <div class="flex justify-center">
          <Button
            :label="$t('forms.submit.reportRoomIssue')"
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
import FormTextArea from '../common/FormTextArea.vue'
import FormSelectField from '../common/FormSelectField.vue'

defineRule('required', required)
const props = defineProps<{
  roomId: string
}>()

const visible = ref(false)
const { createIssue } = useIssue()
const toast = useToast()
const { t } = useI18n()

interface IIssueRoomCreate {
  roomId: string
  category: string
  description: string
  priority: string
}

const { handleSubmit, resetForm } = useForm<IIssueRoomCreate>({
  validationSchema: {
    category: 'required',
    description: 'required|min:10',
    priority: 'required',
  },
})

const { value: category, errorMessage: categoryError, handleBlur: categoryBlur } = useField<string>('category')
const { value: description, errorMessage: descriptionError, handleBlur: descriptionBlur } = useField<string>('description')
const { value: priority, errorMessage: priorityError, handleBlur: priorityBlur } = useField<string>('priority')

const loading = ref<boolean>(false)

const categoryOptions = [

  { label: t('pages.adminDashboard.roomIssueReports.category.equipment'), value: 'equipment' },
  { label: t('pages.adminDashboard.roomIssueReports.category.infrastructure'), value: 'infrastructure' },
  { label: t('pages.adminDashboard.roomIssueReports.category.furniture'), value: 'furniture' },

]

const priorityOptions = [
  { label: t('pages.adminDashboard.roomIssueReports.priority.low'), value: 'low' },
  { label: t('pages.adminDashboard.roomIssueReports.priority.medium'), value: 'medium' },
  { label: t('pages.adminDashboard.roomIssueReports.priority.high'), value: 'high' },
  { label: t('pages.adminDashboard.roomIssueReports.priority.critical'), value: 'critical' },
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
    visible.value = false
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Issue reported successfully',
      life: 3000,
    })
  }
})
</script>
