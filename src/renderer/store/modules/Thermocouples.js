// this store is as a namespace for process data such as thermocouple end devices and kepware tags
const { TagBuilder } = require('kepserverex-js');


const state = {
  thermcoupleRequestError: false,
  kepwareRequestError: false,
  thermocouples: [],
  kepwareTags: []
}

const mutations = {
  
  SET_THERMOCOUPLES (state, payload) {
    state.thermocouples = [...payload.thermocouples];
  },


  SET_KEPWARETAGS (state, payload) {
    state.kepwareTags = [...payload.tags];
  },


  UPDATE_THERMOCOUPLE(state, payload){
    let tcArr = state.thermocouples.map(tc => {
      if(tc.id == payload.thermocouple.id){
        return payload.thermocouple;
      }

      return tc;
    });

    state.thermocouples = tcArr;
  },

  SET_THERMOCOUPLE_REQUEST_ERROR(state,payload){
    state.thermcoupleRequestError = payload
  },

  SET_KEPWARE_REQUEST_ERROR(state,payload){
    state.kepwareRequestError = payload
  },


  SET_SELECTED_THERMOCOUPLE(state, payload) {
    selectedThermocouple = payload.id
  },

  REMOVE_MISSING_THERMOCOUPLES (state, payload){
    let tcArr = state.thermocouples.filter( tc => tc.missing == "0");
    state.thermocouples = tcArr;
  },

  ADD_MISSING_THERMOCOUPLES (state, payload){
    state.thermocouples = payload.thermocouples;
  }, 


}

const actions = {

  fetch_all_thermocouples({ commit, rootState }) {
    rootState.App.zwRec.getAllThermocouples()
    .then( data => {
      data = data.map( tc => {
        tc.missing = '0';
        return tc;
      });

      let tcArr = data;

      //if limit on thermocouples then only display those ids
      if( rootState.Settings.numberThermocouples > 0 ){
        let tcArr = [];
        for(let i=1; i<=rootState.Settings.numberThermocouples; i++){
          let tc = data.find(x => x.id == i);
          if(tc !== undefined){
            tcArr.push( tc );
          }
        }
      }     
      
      //if display missing thermocouples then fill in missing
      if(
        rootState.Settings.displayMissingThermocouples
        && rootState.Settings.numberThermocouples > 0  
      ){
        tcArr = [];
        for(let i=1; i<=rootState.Settings.numberThermocouples; i++){
          tcArr.push( data.find(x => x.id == i) || getDummyTc(i) );
        }
      }

      commit({
        type: "SET_THERMOCOUPLES",
        thermocouples: tcArr
      });

      commit('SET_THERMOCOUPLE_REQUEST_ERROR',false);
    })
    .catch(err => {
      console.log("set thermocouple error", err);
      commit('SET_THERMOCOUPLE_REQUEST_ERROR',true);
    })
  },


  fetch_all_kepwareTags({commit, rootState}){
      let tb = new TagBuilder();

      for(let tag of rootState.Settings.kepwareTags){
        tb.read(tag.id);
      }    

      if(tb.length() > 0){
        rootState.App.iotGateway
          .read(tb.get())
          .then((data)=>{ 
            data = data.map((tag)=>{
              let tempTag = rootState.Settings.kepwareTags.find(t => t.id == tag.id);
              return {...tag, ...tempTag};
            });

            commit({
              type: "SET_KEPWARETAGS",
              tags: data
            });
            commit('SET_KEPWARE_REQUEST_ERROR',false);
          }) 
          .catch(err => {
            console.log("set kepware error", err);
            commit('SET_KEPWARE_REQUEST_ERROR',true);
          })
      }      
  },


  update_thermocouple({commit,rootState}, id){
    return rootState.App.zwRec.getThermocouple(id).then( data => {
      data.missing = '0';
      commit({
        type: "UPDATE_THERMOCOUPLE",
        thermocouple: data
      });
      return data;
    });
  },

  remove_missing_thermocouples(context){
    context.commit("REMOVE_MISSING_THERMOCOUPLES");
  },
  
  add_missing_thermocouples({commit,state,rootState}){
    let tcArr = [];
    for(let i=1; i<=rootState.Settings.numberThermocouples; i++){
      tcArr.push( state.thermocouples.find(x => x.id == i) || getDummyTc(i) );
    }

    commit({
      type:"ADD_MISSING_THERMOCOUPLES",
      thermocouples: tcArr
    })
  },


  add_kepware_tag(context, tag){

  }, 


}

let getters = {

  thermocouples: (state,getters,rootState) => {
    let tcArr = state.thermocouples.map(tc => {
      let disabled = rootState.Settings.disabledThermocouples.indexOf(tc.id) > -1 ? '1' : '0';
      return {...tc, disabled};
    }); 
    return tcArr;
  },


  //get all thermocouples with a standardized temperature object
  temperaturePacket_thermocouples: (state,getters,rootState) => {
    let tcArr = state.thermocouples.map(tc => {
      let disabled = rootState.Settings.disabledThermocouples.indexOf(tc.id) > -1 ? '1' : '0';
      return createTemperaturePacket(
        tc.id,
        tc.name,
        tc.srs[0].r,
        tc.missing,
        disabled,
        rootState.App.defaultChartSeriesColor,
        'TC'
      );
    }); 

    return tcArr;
  },

  //get all kepware tags with a standardized temperature object
  temperaturePacket_kepwareTgas: state => {
    let ktArr = state.kepwareTags.map(kt => {
      return createTemperaturePacket(
        kt.id,
        '',
        kt.v,
        0,
        0,
        kt.color,
        'KP'
      );
    })

    return ktArr;
  }

}


// temp packet types
/*
TC = thermocouple,
KT = KepwareTag
*/


function createTemperaturePacket(id,name,temperature,missing,disabled,color,type){
  return {
    id,
    name,
    temperature,
    missing,
    disabled,
    color,
    type
  }
}


function getDummyTc(id){
  return {
    battery: 0,
    firmware: '',
    id: id + "",
    ident: 0,
    lost: 0,
    name: '---',
    open: 0,
    power: 0,
    quality: 0,
    rssi: 0,
    sensors: 0,
    seq: 0,
    srs: [
      {r:0,t:0,s:''},
      {r:0,t:0,s:''},
      {r:0,t:0,s:''},
      {r:0,t:0,s:''}
    ],
    type: 0,
    typeStr: 0,
    up: 0,
    update: 0,
    missing: '1',
    disabled: 0,
    signalLevel: 0,
    batteryLevel: 0,
    typeFam: ''
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}