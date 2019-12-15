import Vue from 'vue'
import Vuelidate from "vuelidate/src";
import Paginate from 'vuejs-paginate'
import Meta from 'vue-meta'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from "./filters/date.filter";
import currencyFilter from "./filters/currency.filter";
import localizeFilter from "./filters/localize.filter";
import tooltipDirective from './directives/tooltip.derictive'
import messagePlugin from './utils/message.plugin'
import titlePlugin from './utils/title.plugin'
import Loader from "./components/app/Loader";
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(Vuelidate)
Vue.use(Meta)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

firebase.initializeApp({
  apiKey: "AIzaSyD5tF2Yh9mMpNNYVDU6JqY8mSOlFlvAnY0",
  authDomain: "vue-crm-1669d.firebaseapp.com",
  databaseURL: "https://vue-crm-1669d.firebaseio.com",
  projectId: "vue-crm-1669d",
  storageBucket: "vue-crm-1669d.appspot.com",
  messagingSenderId: "328478683041",
  appId: "1:328478683041:web:db17bc477bb246ca68a5e0"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
