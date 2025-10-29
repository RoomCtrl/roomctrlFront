import main from './layouts/main.json'
import adminSidebar from './layouts/adminSidebar.json'
import common from './common.json'
import forms from './forms.json'
import services from './services.json'
import toast from './toast.json'
import primevue from './primevue.json'
import date from './date.json'
import { home, contact, aboutUs, faq, rules, howThisWork, privacyPolicy, downloadApp, allRooms, roomDetails,
  reservationsHistory, users, dashboard, panelSelector } from './pages'

export default () => ({
  common,
  forms,
  services,
  toast,
  pages: {
    home,
    contact,
    aboutUs,
    howThisWork,
    faq,
    privacyPolicy,
    rules,
    panelSelector,
    downloadApp,
    allRooms,
    roomDetails,
    reservationsHistory,
    adminDashboard: {
      users,
      dashboard,
    },
  },
  primevue,
  date,
  layouts: {
    main,
    adminSidebar,
  },
})
