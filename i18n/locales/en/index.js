import homePage from './pages/homePage.json'
import contactPage from './pages/contactPage.json'
import main from './layouts/main.json'
import common from './common.json'
import forms from './forms.json'
import aboutUsPage from './pages/aboutUsPage.json'
import faqPage from './pages/faqPage.json'

export default () => ({
  common,
  forms,
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
