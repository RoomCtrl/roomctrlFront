<template>
  <Panel
    :header="$t('pages.aboutUs.creatorsAccounts')"
  >
    <div class="flex flex-col md:flex-row md:gap-2">
      <div
        v-for="(account, index) in teamGitAccount"
        :key="index"
      >
        <a
          :href="account.link"
          target="_blank"
          class="flex flex-row gap-2 items-center py-[1vh]"
        >
          <Chip>
            <Avatar
              icon="pi pi-user"
              class="flex-none"
              shape="circle"
            />
            <p>
              {{ account.person }}
            </p>
          </Chip>
        </a>
      </div>
    </div>
  </Panel>
</template>

<script setup lang="ts">
const teamGitAccount = [
  { person: 'Jakub Pluta', link: 'https://github.com/MrPuta' },
  { person: 'Kamil Rogalski', link: 'https://github.com/RogalXRogal' },
  { person: 'Adrian Sengar', link: 'https://github.com/SquatcH3962' },
  { person: 'Filip Maciborski', link: 'https://github.com/prokofiew' },
]
</script>
