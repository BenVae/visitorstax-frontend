import Vue from 'vue'
import Vuex from 'vuex'
import registrationForms from './assets/sampleRegistrationForm'
import businessData from './assets/businessData'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        role: '',
        registrationForms: registrationForms,
        businessData: businessData,
    },
    getters: {
        role: state => state.role,
        registrationForms: state => state.registrationForms,
        businessData: state => state.businessData
    },
    mutations: {
        changeRole(state, role) {
            state.role = role
        },
        changeRegForm(state, registrationForms) {
            state.registrationForms = registrationForms;
        },
        changeBusinesssData(state, businessData) {
            state.businessData = businessData;
        }
    }
});
