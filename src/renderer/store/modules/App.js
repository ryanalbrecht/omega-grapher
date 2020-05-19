const ZWRec = require("zw-rec");
const { IotGateway } = require('kepserverex-js');
const _ = require('lodash');

const state = {
  appReady: false,
  loadingTCData: false,
  loadingCSVData: false,
  zwRec: null,
  iotGateway: null,
  isChartUpdating: false,
  isChartClamped: true,
  mouseOverThermocouple: '',
  defaultChartSeriesColor: '#10259c', //'#000099'
}

const mutations = {
  
  SET_ZWREC (state, payload) {
    state.zwRec = new ZWRec(payload);
  },

  SET_IOTGATEWAY (state, payload) {
    state.iotGateway = new IotGateway({...payload});
  },

  SET_CHARTUPDATING (state, payload) {
    state.isChartUpdating = payload.isUpdating;
  },

  SET_MOUSEOVERTHERMOCOUPLE(state, payload) {
    state.mouseOverThermocouple = payload.thermocoupleID;
  }

}

const actions = {
  
  init_load({ state, rootState, commit }) {
    commit({
      type: 'SET_ZWREC',
      host: rootState.Settings.host
    });

    commit({
      type: 'SET_IOTGATEWAY',
      host: rootState.Settings.kepwareHost,
      username: rootState.Settings.kepwareUsername,
      password: rootState.Settings.kepwarePassword,
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
},200)


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
