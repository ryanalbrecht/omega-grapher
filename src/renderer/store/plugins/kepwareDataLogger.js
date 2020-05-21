// This plugin will write to a csv, logging thermoocuple data everytime it is updated.
var rollers = require('streamroller');
var isRelative = require('is-relative');

/**
 * config.filePath The location of where to store the log file
 * config.fileName The name of the file, if not defined, then it will use the name of this appender. Do not append an extension to it. We will append a .log to it
 * config.fileDaysToKeep if this is greater than 0, then files older than daysToKeep days will be deleted during file rolling. Default to 7
 * config.vuexMutationType The name of the vuex action type to log. Defaults to 'Thermocouples/SET_THERMOCOUPLES'
 *
 * @export
 * @param {*} config
 * @returns
 */
export default function createKepwareDataLogger( config = {} ){

  config = { 
    fileName: config.fileName || 'kp-data.log',
    vuexMutationType: config.vuexMutationType || 'Thermocouples/SET_KEPWARETAGS' 
  };

  return store => {
    store.subscribe((mutation, state) => {

      if(!state.Settings.enableLogging){
        //logging is disabled
        return;
      }

      if(mutation.type === config.vuexMutationType){

        if(isRelative(state.Settings.logPath)){
          throw("Log path cannot be relative")
        }
        
        var stream = new rollers.DateRollingFileStream(
          state.Settings.logPath + config.fileName,
          "yyyy-MM-dd",
          {
            mode: parseInt("0666", 8),
            keepFileExt: true,
            daysToKeep: state.Settings.logDaysToKeep
          }
        )
        
        let readings = [];

        readings[0] = new Date().toLocaleString().replace(',','');
        //set positions of csv to sensor readings
        mutation.payload.tags.forEach( (kp,index) => {
           
          let id = kp.id;
          let value = kp.v;

          if(kp.s){
            readings[index+1] = value;
          }

        });
        //write to csv values to files
        let csvReadings = readings.join(',') + '\r\n';
        stream.write(csvReadings);
        stream.end();
      }
    });
  }
}
