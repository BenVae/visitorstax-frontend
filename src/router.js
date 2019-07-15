import Vue from 'vue'
import Router from 'vue-router'
import Test from "./components/Test";
import Login from "./components/Login";
import RegistraionForm from "./components/registrationform/RegistraionForm";
import ShowRegFormHost from "./components/host/DisplaySingularFormHost";
import RegistrationFormList from "./components/RegistrationFormList";
import IdCheck from "./components/registrationform/IdCheck";
import BusinessList from "./components/BusinessList";

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
            path: '/Meldescheine',
            name: 'Meldescheine',
            component: RegistrationFormList
        },
        {
            path: '/meldeschein/anlegen',
            component: RegistraionForm,
        },
        {
            path: '/Meldeschein',
            name: 'Meldeschein',
            component: ShowRegFormHost,
            props: true
        },
        {
            path: '/idCheck',
            component: IdCheck,
        },
        {
            path: '/Betriebsuebersicht',
            name: 'Betriebsuebersicht',
            component: BusinessList
        }
    ]
})
