import homePage from './pages/homePage.json'
import contactPage from './pages/contactPage.json'
import main from './layouts/main.json'
import common from './common.json'
import forms from './forms.json'
import aboutUsPage from './pages/aboutUsPage.json'
import faqPage from './pages/faqPage.json'
import services from './services.json'

export default () => ({
  common,
  forms,
  services,
  pages: {
    homePage,
    contactPage,
    aboutUsPage,
    faqPage,
  },
  layouts: {
    main,
  },
})
