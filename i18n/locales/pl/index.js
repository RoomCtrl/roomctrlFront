import homePage from './pages/homePage.json'
import contactPage from './pages/contactPage.json'
import main from './layouts/main.json'
import common from './common.json'
import forms from './forms.json'
import aboutUsPage from './pages/aboutUsPage.json'
import faqPage from './pages/faqPage.json'
import services from './services.json'
import howThisWork from './pages/howThisWork.json'
import privacyPolicy from './pages/privacyPolicy.json'
import rulesPage from './pages/rulesPage.json'

export default () => ({
  common,
  forms,
  services,
  pages: {
    homePage,
    howThisWork,
    contactPage,
    aboutUsPage,
    faqPage,
    privacyPolicy,
    rulesPage,
  },
  layouts: {
    main,
  },
})
