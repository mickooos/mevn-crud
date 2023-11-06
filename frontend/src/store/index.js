import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  state: {
    authenticated: false
  },
  mutations: {
    setAuthentication(state, status) {
      state.authenticated = status
    }
  },
  plugins: [createPersistedState()]
})

export default store
