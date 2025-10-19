import main from './layouts/main.json'
import common from './common.json'
import forms from './forms.json'
import toast from './toast.json'
import primevue from './primevue.json'
import date from './date.json'
import { home, contact, aboutUs, faq, rules, howThisWork, privacyPolicy, downloadApp, allRooms, roomDetails, reservationsHistory, users } from './pages'

export default () => ({
  common,
  forms,
  toast,
  pages: {
    home,
    contact,
    aboutUs,
    howThisWork,
    faq,
    privacyPolicy,
    rules,
    downloadApp,
    allRooms,
    roomDetails,
    reservationsHistory,
    adminDashboard: {
      users,
    },
  },
  primevue,
  date,
  layouts: {
    main,
  },
})
