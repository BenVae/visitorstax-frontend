import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    role: ''
  },
  getters: {
    role: state => state.role
  },
  mutations: {
    change(state, role) {
      state.role = role
    }
  }
})
