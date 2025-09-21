<template>
  <div class="p-6">
    <div class="text-center mb-10">
      <h2 class="text-2xl sm:text-3xl font-bold">
        {{ $t('pages.home.goodBadSection.title') }}
      </h2>
      <p class="text-gray-500 mt-2">
        {{ $t('pages.home.goodBadSection.subTitle') }}
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="relative group bg-[rgba(0,253,0,0.2)] rounded-xl shadow-lg p-6 animate-fade-in-up transition-all duration-700">
        <h3 class="text-xl font-bold flex items-center gap-2 text-green-500">
          <i
            class="pi pi-check-circle text-green-500"
            style="font-size: 1.5rem;"
          />
          {{ $t('common.roomCtrl') }}
        </h3>

        <ul class="mt-4 space-y-2 text-green-600 list-disc list-inside">
          <li>{{ $t('pages.home.goodBadSection.goodSection.intuitive') }}</li>
          <li>{{ $t('pages.home.goodBadSection.goodSection.automatic') }}</li>
          <li>{{ $t('pages.home.goodBadSection.goodSection.support') }}</li>
          <li>{{ $t('pages.home.goodBadSection.goodSection.modern') }}</li>
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
        class="relative group bg-[rgba(254,0,0,0.2)] rounded-xl shadow-md p-6 animate-fade-in-up transition-all duration-700 delay-300"
      >
        <h3 class="text-xl font-bold flex items-center gap-2 text-red-500">
          <i
            class="pi pi-times-circle text-red-500"
            style="font-size: 1.5rem"
          />
          {{ $t('pages.home.goodBadSection.badSection.title') }}
        </h3>
        <ul class="mt-4 space-y-2 text-red-600 list-disc list-inside">
          <li>{{ $t('pages.home.goodBadSection.badSection.reservations') }}</li>
          <li>{{ $t('pages.home.goodBadSection.badSection.noAutomation') }}</li>
          <li>{{ $t('pages.home.goodBadSection.badSection.noAccess') }}</li>
          <li>{{ $t('pages.home.goodBadSection.badSection.lowAvailability') }}</li>
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
