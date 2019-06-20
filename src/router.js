import Vue from 'vue'
import Router from 'vue-router'
import Test from "./components/Test";
import Login from "./components/Login";

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Test
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
