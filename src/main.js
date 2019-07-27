import Vue from 'vue'
import Vuex from 'vuex';
import App from './App.vue'
import './plugins/vuetify'
import router from './router'
import {store} from './store'
import BootstrapVue from 'bootstrap-vue'
import VueGoodTablePlugin from 'vue-good-table'
import HotelDatePicker from 'vue-hotel-datepicker'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-good-table/dist/vue-good-table.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuetify from 'vuetify'

Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.use(VueGoodTablePlugin);
Vue.use(HotelDatePicker);
Vue.use(require('vue-moment'));
//Vue.use(require('chart.js'));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
