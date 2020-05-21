const ZWRec = require("zw-rec");
const defaultSettings = require('../defaultSettings');

const state = {
  ...defaultSettings,
  disabledThermocouples: []
}

const mutations = {
  SET_CHART_HEIGHT(state,payload){
    state.chartHeight = payload.chartHeight;
  },

  SET_SETTINGS(state, payload){
    state = Object.assign(state, payload.settings);
  },

  ADD_DISABLED_THERMOCOUPLE (state, payload){
    state.disabledThermocouples = [...state.disabledThermocouples, payload.id];   
  },

  REMOVE_DISABLED_THERMOCOUPLE (state, payload){
    state.disabledThermocouples = state.disabledThermocouples.filter(tc => tc != payload.id);  
  },

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
  },

  add_disabled_thermocouple(context, id){
    context.commit({
      type: 'ADD_DISABLED_THERMOCOUPLE',
      id
    })
  },

  remove_disabled_thermocouple(context, id){
    context.commit({
      type: 'REMOVE_DISABLED_THERMOCOUPLE',
      id
    })
  },


}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
