import Vue from 'vue'
import Vuex from 'vuex'
import registrationForms from './assets/sampleRegistrationForm'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        role: '',
        registrationForms: registrationForms
    },
    getters: {
        role: state => state.role,
        registrationForms: state => state.registrationForms
    },
    mutations: {
        changeRole(state, role) {
            state.role = role
        },
        changeRegForm(state, registrationForms) {
            state.registrationForms = registrationForms;
        }
    }
});
