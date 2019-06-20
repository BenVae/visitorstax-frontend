import Vue from 'vue'
import Router from 'vue-router'
import Test from "./components/Test";
import Login from "./components/Login";
import RegistraionForm from "./components/RegistraionForm";

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'test',
      component: Test
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/meldeschein/anlegen',
    component: RegistraionForm,
    }
  ]
})
