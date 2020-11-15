import Vue from 'vue'
import App from './App'
import router from './router'
import Vuerouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs';
import VueCookies from 'vue-cookies'
Vue.prototype.HOST = '/api'
Vue.prototype.$qs = qs
Vue.use(VueAxios, axios);
Vue.use(Vuerouter);
Vue.use(VueCookies);
Vue.config.productionTip = false;


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
