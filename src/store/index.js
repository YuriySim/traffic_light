import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    second: 0
  },

  plugins: [createPersistedState()],

  getters: {
    remSecond(state) {
      return state.second;
    }
  },

  mutations: {
    updateSecond(state, second) {
      state.second = second;
    }
  }
});
