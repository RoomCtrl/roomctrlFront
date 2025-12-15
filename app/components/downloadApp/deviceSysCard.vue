<template>
  <div
    :class="['platform-card min-w-[25vw]', animationClass]"
    @mouseenter="showAnimation"
    @focusin="showAnimation"
    @mouseleave="hideAnimation"
    @focusout="hideAnimation"
  >
    <div class="platform-header gap-2">
      <div class="platform-icon-wrapper">
        <i
          :class="content.icon"
          :style="{ color: content.iconColor }"
          class="platform-icon"
        />
      </div>
      <h3 class="platform-title flex items-center">
        {{ content.title }}
      </h3>
    </div>

    <div class="platform-body">
      <div class="platform-specs">
        <div
          v-for="item in content.list"
          :key="item.key"
          class="spec-item"
        >
          <i class="pi pi-check spec-check" />
          <div class="spec-content">
            <span class="spec-label">{{ $t('pages.downloadApp.' + item.key) }}</span>
            <span class="spec-value">{{ item.value }}</span>
          </div>
        </div>
      </div>

      <div class="platform-rating flex flex-col items-center">
        <div class="rating-header flex flex-col">
          <span class="rating-label">{{ $t('pages.downloadApp.usersRate') }}</span>
          <span class="rating-number">{{ content.rating }}/5</span>
        </div>
        <UserRating
          :max="5"
          :rate-value="content.rating"
        />
      </div>
    </div>

    <div class="platform-footer">
      <Button
        :label="t('common.download')"
        class="download-btn"
        severity="success"
        @click="visible = true"
      >
        <template #icon>
          <i class="pi pi-download" />
        </template>
      </Button>
    </div>
  </div>

  <Dialog
    v-model:visible="visible"
    :header="content.title"
    modal
    :style="{ width: '90vw', maxWidth: '500px' }"
  >
    <Toast />
    <div class="dialog-content">
      <div>
        <div class="qr-wrapper">
          <Qrcode :value="qrValue" />
        </div>
        <p class="qr-instruction">
          {{ $t('pages.downloadApp.scanQr') }}
        </p>
      </div>

      <div class="divider">
        <span>{{ $t('pages.downloadApp.or') }}</span>
      </div>

      <div class="link-section">
        <div class="link-input-wrapper">
          <input
            :value="qrValue"
            type="text"
            readonly
            class="link-input"
          />
          <Button
            :label="$t('pages.downloadApp.copy')"
            icon="pi pi-copy"
            class="copy-btn"
            severity="info"
            @click="copyText(qrValue)"
          />
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import UserRating from '../common/UserRating.vue'

const props = defineProps<{
  content: {
    id: string
    title: string
    icon: string
    iconColor: string
    list: {
      key: string
      value: string
    }[]
    rating: number
  }
}>()

const { t } = useI18n()
const visible = ref(false)
const toast = useToast()

const animate = ref(false)
const hasInteracted = ref(false)

const isAndroid = computed(() => props.content.id === 'android')

const qrValue = computed(() => {
  if (isAndroid.value) {
    return 'http://185.25.151.154/api/v1/download/android'
  }
  else {
    return 'http://185.25.151.154/api/v1/download/ios'
  }
})

const animationClass = computed(() => {
  if (!hasInteracted.value) {
    return ''
  }

  if (isAndroid.value) {
    return animate.value ? 'androidAnimation' : 'androidHide'
  }
  else {
    return animate.value ? 'iosAnimation' : 'iosHide'
  }
})

const showAnimation = () => {
  hasInteracted.value = true
  animate.value = true
}

const hideAnimation = () => {
  if (hasInteracted.value) {
    animate.value = false
  }
}

function copyText(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      toast.add({
        severity: 'success',
        summary: t('toast.success'),
        detail: t('toast.messages.copied'),
        life: 3000,
      })
    })
    return
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'

  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()

  try {
    document.execCommand('copy')
    toast.add({
      severity: 'success',
      summary: t('toast.success'),
      detail: t('toast.messages.copied'),
      life: 3000,
    })
  }
  catch (err) {
    console.error('Failed to copy:', err)
  }

  document.body.removeChild(textarea)
}
</script>

<style scoped>
.platform-card {
  background: white;
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.dark .platform-card {
  background: var(--p-neutral-800);
  border-color: rgba(255, 255, 255, 0.1);
}

.platform-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
}

.platform-header {
  display: flex;
  text-align: center;
  justify-content: center;
  margin-bottom: 2rem;
}

.platform-icon-wrapper {
  width: 4.5rem;
  height: 4.5rem;
  margin: 0 0rem 0rem;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.platform-icon {
  font-size: 2.5rem;
}

.platform-title {
  font-size: 2rem;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.02em;
}

.dark .platform-title {
  color: #f9fafb;
}

.platform-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.platform-specs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.spec-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(59, 130, 246, 0.05);
  border-radius: 12px;
  transition: background 0.2s ease;
}

.dark .spec-item {
  background: rgba(59, 130, 246, 0.08);
}

.spec-item:hover {
  background: rgba(59, 130, 246, 0.08);
}

.dark .spec-item:hover {
  background: rgba(59, 130, 246, 0.12);
}

.spec-check {
  color: #10b981;
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 0.125rem;
  flex-shrink: 0;
}

.spec-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.spec-label {
  font-weight: 600;
  font-size: 0.875rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.dark .spec-label {
  color: #9ca3af;
}

.spec-value {
  font-size: 1rem;
  color: #111827;
  font-weight: 600;
}

.dark .spec-value {
  color: #f9fafb;
}

.platform-rating {
  padding: 1.5rem;
  background: rgba(59, 130, 246, 0.03);
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.1);
}

.dark .platform-rating {
  background: rgba(59, 130, 246, 0.08);
  border-color: rgba(59, 130, 246, 0.2);
}

.rating-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.rating-label {
  font-weight: 600;
  font-size: 0.875rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.dark .rating-label {
  color: #9ca3af;
}

.rating-number {
  font-size: 1.5rem;
  font-weight: 800;
  color: #111827;
}

.dark .rating-number {
  color: #f9fafb;
}

.platform-footer {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.dark .platform-footer {
  border-top-color: rgba(255, 255, 255, 0.1);
}

.download-btn {
  width: 100%;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  border: none;
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(59, 246, 59, 0.3);
  transition: all 0.3s ease;
  gap: 0.5rem;
}

.download-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 246, 59, 0.4);
}

/* Dialog Styles */
.dialog-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem 0;
}

.qr-wrapper {
  padding: 1.5rem;
  background: white;
  border-radius: 16px;
  border: 2px solid #e5e7eb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.dark .qr-wrapper {
  background: var(--p-neutral-900);
  border-color: var(--p-neutral-700);
}

.qr-instruction {
  text-align: center;
  color: #6b7280;
  font-size: 0.95rem;
}

.dark .qr-instruction {
  color: #9ca3af;
}

.divider {
  position: relative;
  text-align: center;
  color: #9ca3af;
  font-size: 0.875rem;
  font-weight: 500;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 40%;
  height: 1px;
  background: #e5e7eb;
}

.dark .divider::before,
.dark .divider::after {
  background: var(--p-neutral-700);
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.link-section {
  width: 100%;
}

.link-input-wrapper {
  display: flex;
  gap: 0.5rem;
  align-items: stretch;
}

.link-input {
  flex: 1;
  padding: 0.875rem 1rem;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 0.875rem;
  color: #111827;
  font-family: monospace;
}

.dark .link-input {
  background: var(--p-neutral-900);
  border-color: var(--p-neutral-700);
  color: #f9fafb;
}

.copy-btn {
  padding: 0.875rem 1.5rem;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.copy-btn:hover {
  transform: translateY(-1px);
}

/* Animations */
@keyframes showAndroid {
  from { background-position-y: 200px; }
  to { background-position-y: 150px; }
}

@keyframes hideAndroid {
  from { background-position-y: 150px; }
  to { background-position-y: 300px; }
}

@keyframes showIos {
  from { background-position-y: -200px; }
  to { background-position-y: 145px; }
}

@keyframes hideIos {
  from { background-position-y: 145px; }
  to { background-position-y: 300px; }
}

.androidAnimation {
  background-image: url('/gifs/mobileOS/waving_android.gif');
  background-repeat: no-repeat;
  background-size: 100px;
  background-position: right;
  animation: showAndroid 0.5s forwards;
}

.androidHide {
  background-image: url('/gifs/mobileOS/waving_android.gif');
  background-repeat: no-repeat;
  background-size: 100px;
  background-position: right;
  animation: hideAndroid 0.5s forwards;
}

.iosAnimation {
  background-image: url('/images/mobileOS/apple_logo_grey.png');
  background-repeat: no-repeat;
  background-size: 60px;
  background-position: calc(100% - 10px) center;
  animation: showIos 0.5s forwards;
}

.iosHide {
  background-image: url('/images/mobileOS/apple_logo_grey.png');
  background-repeat: no-repeat;
  background-size: 60px;
  background-position: calc(100% - 10px) center;
  animation: hideIos 0.5s forwards;
}

/* Responsive */
@media (max-width: 768px) {
  .platform-card {
    padding: 2rem 1.5rem;
  }

  .platform-icon-wrapper {
    width: 4rem;
    height: 4rem;
  }

  .platform-icon {
    font-size: 2rem;
  }

  .platform-title {
    font-size: 1.75rem;
  }
}
</style>
