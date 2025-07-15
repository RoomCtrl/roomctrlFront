import homePage from './pages/homePage.json'
import contactPage from './pages/contactPage.json'
import main from './layouts/main.json'
import common from './common.json'
import forms from './forms.json'

export default () => ({
  common,
  forms,
  pages: {
    homePage,
    contactPage,
  },
  layouts: {
    main,
  },
})
