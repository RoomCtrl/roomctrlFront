<template>
  <div>
    <div class="hidden xl:flex flex-row gap-4">
      <ClientOnly class="flex">
        <template #fallback>
          <Skeleton
            width="12rem"
            height="2.5rem"
          />
        </template>
        <LanguageSelect
          size="base"
        />
      </ClientOnly>

      <ClientOnly>
        <ColorModeSwitch />
      </ClientOnly>
      
      <ClientOnly>
        <Button
          v-if="!user"
          class="w-[8rem]"
          as="a"
          :label="$t('common.buttons.logIn')"
          :href="localePath('login')"
        />
        <UserAvatar v-else />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import ColorModeSwitch from '../ColorModeSwitch.vue'
import LanguageSelect from '../LanguageSelect.vue'
import UserAvatar from './UserAvatar.vue'

const { user } = useAuth()
const localePath = useLocalePath()
</script>
