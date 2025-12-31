<template>
  <Card class="w-full md:w-[calc(25%-0.5rem)]">
    <template #header>
      <div class="flex items-center justify-between w-full p-4">
        <h3 class="text-lg font-semibold">
          {{ $t('pages.adminDashboard.statistics.totalReservations') }}
        </h3>
        <i class="pi pi-calendar text-green-500 text-2xl" />
      </div>
    </template>
    <template #content>
      <div class="flex flex-col items-center justify-center gap-4">
        <div class="text-center">
          <p class="text-4xl font-bold text-green-500">
            {{ reservationsCount.total }}
          </p>
          <p class="text-gray-500 mt-2">
            {{ $t('pages.adminDashboard.statistics.totalCount') }}
          </p>
        </div>
        <Divider />
        <div class="w-full space-y-2">
          <div class="flex justify-between items-center">
            <span>{{ $t('pages.adminDashboard.statistics.thisMonth') }}:</span>
            <Tag
              :value="reservationsCount.thisMonth"
              severity="info"
            />
          </div>
          <div class="flex justify-between items-center">
            <span>{{ $t('pages.adminDashboard.statistics.thisWeek') }}:</span>
            <Tag
              :value="reservationsCount.thisWeek"
              severity="success"
            />
          </div>
          <div class="flex justify-between items-center">
            <span>{{ $t('pages.adminDashboard.statistics.today') }}:</span>
            <Tag
              :value="reservationsCount.today"
              severity="warning"
            />
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup>
const { fetchBookingTimeBreakdownTotal } = useStatistics()
const reservationsCount = await fetchBookingTimeBreakdownTotal()
</script>
