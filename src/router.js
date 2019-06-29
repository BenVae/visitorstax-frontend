import Vue from 'vue'
import Router from 'vue-router'
import Test from "./components/Test";
import Login from "./components/Login";
import RegistraionForm from "./components/RegistraionForm";
import ShowRegFormHost from "./components/host/DisplaySingularFormHost.vue";

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
            path: '/Meldeschein',
            name: 'Meldeschein',
            component: ShowRegFormHost
        },
        {
            path: '/meldeschein/anlegen',
            component: RegistraionForm,
        }
    ]
})
