<template>
  <div class="flex justify-center items-center w-full">
    <Tabs
      pt:root:class="min-w-[70%] min-h-[40rem"
      value="0"
    >
      <TabList>
        <Tab value="0">
          Logowanie
        </Tab>
        <Tab value="1">
          Rejestracja
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <BaseLogin />
        </TabPanel>
        <TabPanel value="1">
          <Registration />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script setup>
import BaseLogin from '~/components/forms/baseLogin.vue'
import Registration from '~/components/forms/Registration.vue'
</script>
