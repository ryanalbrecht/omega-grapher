const ZWRec = require("zw-rec");
const _ = require('lodash');

const state = {
  appReady: false,
  loadingTCData: false,
  loadingCSVData: false,
  zwRec: null,
  isChartUpdating: false,
  isChartClamped: true,
  mouseOverThermocouple: ''
}

const mutations = {
  
  SET_ZWREC (state, payload) {
    state.zwRec = new ZWRec(payload);
  },

  SET_CHARTUPDATING (state, payload) {
    state.isChartUpdating = payload.isUpdating;
  },

  SET_MOUSEOVERTHERMOCOUPLE(state, payload) {
    state.mouseOverThermocouple = payload.thermocoupleID;
  }

}

const actions = {
  
  init_zw_rec({ state, rootState, commit }) {
    commit({
      type: 'SET_ZWREC',
      host: rootState.Settings.host
    });
  },

  set_isChartUpdating(context, isUpdating){
    context.commit({
      type: 'SET_CHARTUPDATING',
      isUpdating
    })
  },

  set_mouseOverThermocouple(context, thermocoupleID){
    throttleMouseOverCommit(context, thermocoupleID);
  },


  //this is an action that TemperatureChart.vue will listen to. It does not mutate the state
  remove_chart_data(context, id){ }

}


let throttleMouseOverCommit = _.throttle(function(context, thermocoupleID){
  context.commit({
    type: 'SET_MOUSEOVERTHERMOCOUPLE',
    thermocoupleID
  });
},250)


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
