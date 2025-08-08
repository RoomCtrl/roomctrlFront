import main from './layouts/main.json'
import common from './common.json'
import forms from './forms.json'
import services from './services.json'
import { home, contact, aboutUs, faq, rules, howThisWork, privacyPolicy, downloadApp } from './pages'

export default () => ({
  common,
  forms,
  services,
  pages: {
    home,
    contact,
    aboutUs,
    howThisWork,
    faq,
    privacyPolicy,
    rules,
    downloadApp,
  },
  layouts: {
    main,
  },
})
