<template>
  <div>
    <Button
      icon="pi pi-user"
      variant="outlined"
      rounded
      @click="toggle"
    />
    <Popover ref="op">
      <div class="flex flex-col gap-2">
        <h1 class=" font-bold">
          {{ user?.firstName }} {{ user?.lastName }}
        </h1>

        <div class="px-[1vw]">
          <p>
            Ustawienia
          </p>
        </div>

        <div class="flex justify-end">
          <Button
            :label="t('common.buttons.logOut')"
            size="small"
            variant="text"
            raised
            @click="handleLogout"
          />
        </div>
      </div>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import type { IGetUserProfileResponse } from '~/interfaces/RepositoriesInterface'

const op = ref()
const { t } = useI18n()
const { user, logout } = useAuth() as {
  user: Ref<IGetUserProfileResponse | null>
  logout: () => Promise<void>
}

const handleLogout = async () => {
  await logout()
}
const toggle = (event) => {
  op.value.toggle(event)
}
</script>
