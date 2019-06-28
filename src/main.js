import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'vue-material-design-icons/styles.css'
import VueGoodTablePlugin from 'vue-good-table'
import HotelDatePicker from 'vue-hotel-datepicker'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-good-table/dist/vue-good-table.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.use(VueGoodTablePlugin);
Vue.use(HotelDatePicker);
Vue.use(require('vue-moment'));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
