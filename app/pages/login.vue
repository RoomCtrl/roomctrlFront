<template>
  <div class="flex justify-center items-center w-full">
    <Tabs
      pt:root:class="max-sm:w-[95%] min-w-[80rem]"
      pt:content:class="h-full"
      :value="tabValue"
    >
      <TabList>
        <Tab value="0">
          {{ $t('forms.titles.loginForm') }}
        </Tab>
        <Tab value="1">
          {{ $t('forms.titles.registrationForm') }}
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <FormsLogin />
        </TabPanel>
        <TabPanel value="1">
          <Registration @registration-attempted="handleRegister" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script setup>
import Registration from '~/components/forms/Registration.vue'

definePageMeta({
  middleware: ['guest'],
})

const tabValue = ref('0')

const handleRegister = () => {
  tabValue.value = '0'
}
</script>
