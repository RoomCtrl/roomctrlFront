import main from './layouts/main.json'
import adminSidebar from './layouts/adminSidebar.json'
import common from './common.json'
import services from './services.json'
import primevue from './primevue.json'
import date from './date.json'
import { forms, toast, tables } from './components/index.ts'
import { home, contact, aboutUs, faq, rules, howThisWork, privacyPolicy, downloadApp, allRooms, roomDetails,
  reservationsHistory, users, dashboard, panelSelector, roomIssueReports, notFound } from './pages'

export default {
  common,
  forms,
  services,
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
    panelSelector,
    downloadApp,
    allRooms,
    roomDetails,
    reservationsHistory,
    notFound,
    adminDashboard: {
      users,
      dashboard,
      roomIssueReports,
    },
  },
  primevue,
  date,
  layouts: {
    main,
    adminSidebar,
  },
}
