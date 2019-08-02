import Vue from 'vue'
import Router from 'vue-router'
import Index from "./components/Disclaimer";
import Start from "./components/Dashboard";
import Login from "./components/BusinessLogin";
import RegistraionForm from "./components/business/RegistraionForm";
import ShowRegForm from "./components/business/DisplayRegistrationForm";
import RegistrationFormList from "./components/business/RegistrationFormList";
import BusinessList from "./components/city/BusinessList";
import GroupRegistraionForm from "./components/business/GroupRegistraionForm";
import DisplayBusiness from "./components/city/DisplayBusiness";
import LoginCity from "./components/LoginCity";
import EditRegistraionForm from "./components/business/EditRegistraionForm";
import EditGroupRegistraionForm from "./components/business/EditGroupRegistraionForm";
import CreateInvoice from "./components/city/CreateInvoice";
import CityStatistics from "./components/city/CityStatistics";
import CreateBusiness from "./components/city/BusinessForm";
import EditBusiness from "./components/city/EditBusiness";

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Disclaimer.vue',
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
        },
        {
            path: '/Betrieb/bearbeiten',
            name: 'EditBusiness',
            component: EditBusiness,
            props: true
        }

    ]
})
