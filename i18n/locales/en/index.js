import main from './layouts/main.json'
import adminSidebar from './layouts/adminSidebar.json'
import common from './common.json'
import primevue from './primevue.json'
import date from './date.json'
import { home, contact, aboutUs, faq, rules, howThisWork, privacyPolicy, downloadApp, allRooms, roomDetails, reservationsHistory, users, dashboard } from './pages'
import { forms, toast, tables } from './components'

export default () => ({
  common,
  forms,
  toast,
  tables,
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
