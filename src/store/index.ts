import { createStore } from "vuex";
import persistedState from 'vuex-persistedstate'
import user from "./modules/user";
import config from "./modules/config"

export interface IVuex {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getters?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutations?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actions?: Record<string, any>;
}

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,config
  },
  plugins: [
    persistedState({ storage: window.sessionStorage })
  ]
});
