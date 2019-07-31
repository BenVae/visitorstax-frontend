import Vue from 'vue'
import Router from 'vue-router'
import Index from "./components/index";
import Start from "./components/Start";
import Login from "./components/Login";
import RegistraionForm from "./components/registrationform/RegistraionForm";
import ShowRegForm from "./components/DisplaySingularRegForm";
import RegistrationFormList from "./components/RegistrationFormList";
import IdCheck from "./components/registrationform/IdCheck";
import BusinessList from "./components/BusinessList";
import GroupRegistraionForm from "./components/registrationform/GroupRegistraionForm";
import DisplayBusiness from "./components/DisplayBusiness";
import LoginCity from "./components/LoginCity";
import EditRegistraionForm from "./components/registrationform/EditRegistraionForm";
import EditGroupRegistraionForm from "./components/registrationform/EditGroupRegistraionForm";
import CreateInvoice from "./components/city/CreateInvoice";
import CityStatistics from "./components/CityStatistics";
import CreateBusiness from "./components/city/CreateBusiness";

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/start',
            name: 'start',
            component: Start
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
            name: 'MeldescheinAnlegen',
            component: RegistraionForm,
        },
        {
            path: '/Meldeschein',
            name: 'Meldeschein',
            component: ShowRegForm,
            props: true
        },
        {
            path: '/gruppenMeldeschein/anlegen',
            name: 'GruppenMeldescheinAnlegen',
            component: GroupRegistraionForm,
        },
        {
            path: '/idCheck',
            component: IdCheck,
        },
        {
            path: '/Betriebe',
            name: 'Betriebe',
            component: BusinessList
        },
        {
            path: '/Betrieb',
            name: 'Betrieb',
            component: DisplayBusiness,
            props: true
        },
        {
            path: '/stadtlogin',
            name: 'Stadtlogin',
            component: LoginCity
        },
        {
            path: '/Meldeschein/bearbeiten',
            name: 'meldescheinBearbeiten',
            component: EditRegistraionForm,
            props: true
        },
        {
            path: '/gruppenMeldeschein/bearbeiten',
            name: 'gruppenMeldescheinBearbeiten',
            component: EditGroupRegistraionForm,
            props: true
        },
        {
            path: '/RechnungErstellen',
            name: 'rechnungErstellen',
            component: CreateInvoice,
        },
        {
            path: '/statistiken',
            name: 'Statistiken',
            component: CityStatistics
        },
        {
            path: '/Betrieb/anlegen',
            name: 'BetriebAnlegen',
            component: CreateBusiness
        }

    ]
})
