import Vue from 'vue'
import Vuex from 'vuex'
import registrationForms from './assets/sampleRegistrationForm'
import businesses from './assets/businessData'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        role: '',
        registrationForms: registrationForms,
        businesses: businesses
    },
    getters: {
        role: state => state.role,
        registrationForms: state => state.registrationForms,
        businesses: state => state.businesses
    },
    mutations: {
        changeRole(state, role) {
            state.role = role
        },
        changeRegForm(state, registrationForms) {
            state.registrationForms = registrationForms
        }
    }
});
