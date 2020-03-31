import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from "vuex-persistedstate";

import modules from './modules';
import createThermocoupleDataLogger from './plugins/thermocoupleDataLogger';
import createThermocoupleHTTPPoster from './plugins/thermocoupleHTTPPoster';

Vue.use(Vuex)

let plugins = [
  createPersistedState({
    key: 'vuex_store',
    storage: process.env.NODE_ENV === 'development' ? window.sessionStorage : window.localStorage,
    paths: [
      'Settings'
    ]
  }),
  //createSharedMutations()
  createThermocoupleDataLogger(),
  createThermocoupleHTTPPoster()
];

let store = new Vuex.Store({
  modules,
  plugins,
  strict: process.env.NODE_ENV !== 'production'
})

if (process.env.NODE_ENV === 'development' && process.type === 'renderer'){
  window.$dev_store = store;
}

export default store;