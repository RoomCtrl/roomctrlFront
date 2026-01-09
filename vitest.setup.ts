import { beforeAll } from 'vitest'
import PrimeVue from 'primevue/config'
import { config } from '@vue/test-utils'
import Aura from '@primeuix/themes/aura'

beforeAll(() => {
  config.global.plugins = [
    [PrimeVue, {
      theme: {
        preset: Aura,
      },
    }],
  ]
})
