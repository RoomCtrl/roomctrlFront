import main from './layouts/main.json'
import adminSidebar from './layouts/adminSidebar.json'
import common from './common.json'
import primevue from './primevue.json'
import date from './date.json'
import { home, contact, aboutUs, faq, rules, howThisWork, privacyPolicy, downloadApp, allRooms, roomDetails,
  reservationsHistory, users, dashboard, panelSelector, roomIssueReports, notFound, myCalendar, statistics, settings } from './pages'
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
    panelSelector,
    allRooms,
    roomDetails,
    notFound,
    reservationsHistory,
    myCalendar,
    settings,
    adminDashboard: {
      users,
      dashboard,
      roomIssueReports,
      statistics,
    },
  },
  primevue,
  date,
  layouts: {
    main,
    adminSidebar,
  },
})
