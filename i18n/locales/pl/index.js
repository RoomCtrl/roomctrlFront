import main from './layouts/main.json'
import common from './common.json'
import forms from './forms.json'
import services from './services.json'
import toast from './toast.json'
import { home, contact, aboutUs, faq, rules, howThisWork, privacyPolicy, downloadApp, allRooms, roomDetails, reservationsHistory } from './pages'

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
    downloadApp,
    allRooms,
    roomDetails,
    reservationsHistory,
  },
  layouts: {
    main,
  },
})
