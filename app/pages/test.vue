<template>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-8 grid-rows-4 gap-4">
      <div
        v-for="severity in buttonsSeverities"
        :key="severity"
        class="flex flex-col items-center justify-center"
      >
        <Button
          class="flex"
          :label="severity"
          :severity="severity"
        />
      </div>

      <div
        v-for="severity in buttonsSeverities"
        :key="severity"
        class="flex flex-col items-center justify-center"
      >
        <Button
          :label="severity"
          :severity="severity"
          variant="outlined"
        />
      </div>
      <div
        v-for="severity in buttonsSeverities"
        :key="severity"
        class="flex flex-col items-center justify-center"
      >
        <Button
          :label="severity"
          :severity="severity"
          raised
          variant="outlined"
        />
      </div>
      <div
        v-for="severity in buttonsSeverities"
        :key="severity"
        class="flex flex-col items-center justify-center"
      >
        <Button
          :label="severity"
          :severity="severity"
          raised
          variant="text"
        />
      </div>
    </div>
    <div class="grid grid-cols-6 grid-rows-2 gap-4">
      <div
        v-for="severity in messageSeverities"
        :key="severity"
        class="flex flex-col items-center justify-center"
      >
        <Message
          :severity="severity"
          variant="outlined"
        >
          {{ severity }}
        </Message>
      </div>
      <div
        v-for="severity in messageSeverities"
        :key="severity"
        class="flex flex-col items-center justify-center "
      >
        <Message
          :severity="severity"
        >
          {{ severity }}
        </Message>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const buttonsSeverities = [
  'primary',
  'secondary',
  'success',
  'info',
  'warn',
  'help',
  'danger',
  'contrast',
]

const messageSeverities = [
  'secondary',
  'success',
  'info',
  'warn',
  'error',
  'contrast',
]
</script>
