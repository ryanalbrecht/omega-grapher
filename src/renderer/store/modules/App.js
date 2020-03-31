const ZWRec = require("zw-rec");

const state = {
  appReady: false,
  loadingTCData: false,
  loadingCSVData: false,
  zwRec: null,
  isChartUpdating: false,
}

const mutations = {
  
  SET_ZWREC (state, payload) {
    state.zwRec = new ZWRec(payload);
  },

  SET_CHARTUPDATING (state, payload) {
    state.isChartUpdating = payload.isUpdating;
  },

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

  //this is an action that TemperatureChart.vue will listen to. It does not mutate the state
  remove_chart_data(context, id){ }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
