const state = {
  disabledThermocouples: [],
  thermocouples: []
}

const mutations = {
  
  SET_THERMOCOUPLES (state, payload) {
    state.thermocouples = [...payload.thermocouples];
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

  SET_SELECTED_THERMOCOUPLE(state, payload) {
    selectedThermocouple = payload.id
  },

  ADD_DISABLED_THERMOCOUPLE (state, payload){
    state.disabledThermocouples = [...state.disabledThermocouples, payload.id];   
  },

  REMOVE_DISABLED_THERMOCOUPLE (state, payload){
    state.disabledThermocouples = state.disabledThermocouples.filter(tc => tc != payload.id);  
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
    rootState.App.zwRec.getAllThermocouples().then( data => {
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
    });
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
  }

}

let getters = {
  //get all thermocouples with disabled flag set
  thermocouples: state => {
    let tcArr = state.thermocouples.map(tc => {
      let disabled = state.disabledThermocouples.indexOf(tc.id) > -1 ? '1' : '0';
      return {...tc, disabled};
    }); 
    return tcArr;
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