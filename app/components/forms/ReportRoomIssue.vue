<template>
  <div>
    <Button
      icon="pi pi-exclamation-circle"
      :disabled="!roomId"
      severity="danger"
      @click="visible = true"
    />
    <Dialog
      v-model:visible="visible"
      :header="$t('forms.titles.roomIssueReport')"
      modal
    >
      <form
        class="flex flex-col gap-x-4 pt-4"
        @submit.prevent="submitForm"
      >
        <div class="flex flex-col">
          <div class="w-[70vw] md:w-[23rem]">
            <CommonFormsSelectField
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
            <CommonFormsTextArea
              id="description"
              v-model="description"
              icon="pi pi-pencil"
              :label="$t('forms.fields.description')"
              :errorMessage="descriptionError"
              :rows="3"
              @blur="descriptionBlur"
            />
          </div>

          <div class="w-[70vw] md:w-[23rem]">
            <CommonFormsSelectField
              id="priority"
              v-model="priority"
              :options="priorityOptions"
              icon="pi pi-chart-line"
              :label="$t('forms.fields.priority')"
              :errorMessage="priorityError"
              @blur="priorityBlur"
            />
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
    description: 'required|min:10|max:2500',
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
