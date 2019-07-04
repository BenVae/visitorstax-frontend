import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'vue-material-design-icons/styles.css'
import VueGoodTablePlugin from 'vue-good-table'
import moment from 'moment';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-good-table/dist/vue-good-table.css'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuetify from 'vuetify'

Object.defineProperty(Vue.prototype, 'moment', { value: moment });

Vue.use(Vuetify);
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.use(VueGoodTablePlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
