<template>
  <div class="p-6">
    <div class="text-center mb-10">
      <h2 class="text-2xl sm:text-3xl font-bold">
        {{ $t('pages.homePage.goodBadSection.title') }}
      </h2>
      <p class="text-gray-500 mt-2">
        {{ $t('pages.homePage.goodBadSection.subTitle') }}
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="relative group bg-green-50 rounded-xl shadow-lg p-6 animate-fade-in-up transition-all duration-700">
        <h3 class="text-xl font-bold flex items-center gap-2 text-green-700">
          <i class="pi pi-check-circle text-green-600 text-2xl" />
          {{ $t('common.roomCtrl') }}
        </h3>

        <ul class="mt-4 space-y-2 text-green-900 list-disc list-inside">
          <li>{{ $t('pages.homePage.goodBadSection.goodSection.intuitive') }}</li>
          <li>{{ $t('pages.homePage.goodBadSection.goodSection.automatic') }}</li>
          <li>{{ $t('pages.homePage.goodBadSection.goodSection.support') }}</li>
          <li>{{ $t('pages.homePage.goodBadSection.goodSection.modern') }}</li>
        </ul>

        <div
          class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0 translate-x-3 transition-all duration-300"
        >
          <i
            class="pi pi-thumbs-up text-green-500"
            style="font-size: 60px;"
          />
        </div>
      </div>

      <div
        class="relative group bg-gray-100 rounded-xl shadow-md p-6 animate-fade-in-up transition-all duration-700 delay-300"
      >
        <h3 class="text-xl font-bold flex items-center gap-2 text-gray-700">
          <i class="pi pi-times-circle text-gray-500 text-2xl" />
          {{ $t('pages.homePage.goodBadSection.badSection.title') }}
        </h3>
        <ul class="mt-4 space-y-2 text-gray-700 list-disc list-inside">
          <li>{{ $t('pages.homePage.goodBadSection.badSection.reservations') }}</li>
          <li>{{ $t('pages.homePage.goodBadSection.badSection.noAutomation') }}</li>
          <li>{{ $t('pages.homePage.goodBadSection.badSection.noAccess') }}</li>
          <li>{{ $t('pages.homePage.goodBadSection.badSection.lowAvailability') }}</li>
        </ul>

        <div
          class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform group-hover:-translate-x-0 translate-x-3 transition-all duration-300"
        >
          <i
            class="pi pi-thumbs-down text-red-500"
            style="font-size: 60px;"
          />
        </div>
      </div>
    </div>
  </div>
</template>
