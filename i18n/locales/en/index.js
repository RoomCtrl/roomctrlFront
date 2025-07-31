import main from './layouts/main.json'
import common from './common.json'
import forms from './forms.json'
import { home, contact, aboutUs, faq, rules, howThisWork, privacyPolicy } from './pages'

export default () => ({
  common,
  forms,
  pages: {
    home,
    contact,
    aboutUs,
    howThisWork,
    faq,
    privacyPolicy,
    rules,
  },
  layouts: {
    main,
  },
})
