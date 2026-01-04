import main from './layouts/main.json'
import adminSidebar from './layouts/adminSidebar.json'
import common from './common.json'
import services from './services.json'
import primevue from './primevue.json'
import date from './date.json'
import { forms, toast, tables, reservations } from './components/index.ts'
import { home, contact, aboutUs, faq, rules, howThisWork, privacyPolicy, downloadApp, allRooms, roomDetails,
  reservationsHistory, users, dashboard, panelSelector, roomIssueReports, notFound, myCalendar, statistics, settings,
  settingsAdmin, reservationList } from './pages'

export default {
  common,
  forms,
  services,
  toast,
  tables,
  reservations,
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
    rooms: allRooms,
    roomDetails,
    reservationsHistory,
    notFound,
    myCalendar,
    settings,
    adminDashboard: {
      users,
      dashboard,
      roomIssueReports,
      statistics,
      settingsAdmin,
      reservationList,
    },
  },
  primevue,
  date,
  layouts: {
    main,
    adminSidebar,
  },
}
