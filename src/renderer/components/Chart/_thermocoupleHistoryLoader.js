const csv = require('csv-parser');
const fs = require('fs');

// const moment = require('moment');

export default function loadThermocoupleHistory(store, onFinish){
  let chartTimespan = store.state.Settings.chartTimespan; //timespan in minutes (600 = 10 hours)
  let logFile = store.state.Settings.logPath + 'tc-data.log';
  let currDate = Math.floor(Date.now() / 1000);
  let cutoffDate = currDate - (chartTimespan*60);
  let thermocoupleData = {};

  //find latest log file.
  if(fs.existsSync(logFile)){
    fs.createReadStream(logFile)
    .pipe(csv({headers:false}))
    .on('data', (data)=>{

      let mObj = window.moment(data[0], 'MM/DD/YYYY LTS');
      let timestamp = mObj.valueOf();
      let uTimestamp = mObj.unix();


      //check if this date is within the current timespan of the chart
      if(uTimestamp > cutoffDate){
        
        for(let key in data){
          
          // if the value if an empty string or the line index of the csv is zero (the date) the skip
          if( data[key] === '' || key == 0 ){ 
            continue; 
          };

          let x = timestamp;
          let y = parseFloat(data[key]);

          thermocoupleData[key] = thermocoupleData[key] || [];
          thermocoupleData[key].push([x,y]);
        }   
      }
    })  
    .on('end', ()=>{
      onFinish(thermocoupleData);
    }); 

  }else{
    onFinish({});
  }
}
