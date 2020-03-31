const ZWRec = require("zw-rec");
const defaultSettings = require('../defaultSettings');

const state = {
  ...defaultSettings
}

const mutations = {
  SET_CHART_HEIGHT(state,payload){
    state.chartHeight = payload.chartHeight;
  },

  SET_SETTINGS(state, payload){
    state = Object.assign(state, payload.settings);
  }
}

const actions = {
  set_chart_height(context, chartHeight){
    context.commit({
      type: 'SET_CHART_HEIGHT',
      chartHeight
    })
  },

  set_settings(context, settings){
    context.commit('SET_SETTINGS', settings);
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
