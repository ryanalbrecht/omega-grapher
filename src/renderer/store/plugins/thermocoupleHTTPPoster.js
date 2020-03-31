// This plugin will write to a csv, logging thermoocuple data everytime it is updated.
var axios = require('axios');
var qs = require('qs');

/**
 * config.vuexMutationType The name of the vuex action type to log. Defaults to 'Thermocouples/SET_THERMOCOUPLES'
 *
 * @export
 * @param {*} config
 * @returns
 */
export default function createThermocoupleHTTPPoster( config = {} ){

  config = { 
    vuexMutationType: config.vuexMutationType || 'Thermocouples/SET_THERMOCOUPLES' 
  };

  return store => {
    store.subscribe((mutation, state) => {

      if(!state.Settings.postOnUpdate){
        //logging is disabled
        return;
      }

      if(mutation.type === config.vuexMutationType && state.Settings.postUrl !== ''){

        axios.post(state.Settings.postUrl, qs.stringify({
          'thermocouplesJson': JSON.stringify(mutation.payload.thermocouples)
        }))
        .then( resp => resp.data )
        .catch( err => {
          console.warn('There was an error posting thermocouple data to the configured URL.', err);
        });
      }

    });
  }
}
