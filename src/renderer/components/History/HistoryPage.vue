<template>
  <div class="history-wrapper">
    <div class="select-container">
      Select Log File: 
      <select style="width: 200px; font-family: consolas" id="logfile-select" @change="logFileSelected"></select>
      <button class="btn" v-on:click="reloadLogFile">Refresh Log File</button>

      <span v-if="!enableLogging" style="color:red">Warning: Logging is not enabled</span>

      <button style="float:right;" class="btn" v-on:click="openLogDir">Open Log Directory</button>
    </div>


    <div id="handsontable-container">
    </div>
  </div>
</template>

<script>
import Handsontable from "handsontable";

const Papa = require('papaparse');
const fs = require('fs');
const {shell} = require('electron');

export default {

  mounted(){
    this.updateData();
  },

  watch: {
    '$route': 'updateData'
  },

  methods: {

    openLogDir(){
      shell.openItem(this.logPath)
    },

    logFileSelected(e){
      this.selectedLogFile = e.target.value;
      this.parseCsvData(this.logPath + e.target.value);
    },

    updateData(){
      this.renderLogFileSelect();
      this.parseCsvData(this.logPath + this.selectedLogFile);
    },

    reloadLogFile(){
      this.parseCsvData(this.logPath + this.selectedLogFile); 
    },

    parseCsvData(filename){
      let results = Papa.parse(fs.createReadStream(filename), {
        worker: false,
        header: false,
        skipEmptyLines: true,
        complete: this.renderTable
      });
    },

    renderTable(parseResults){
      var handsontableContainer = document.getElementById('handsontable-container');
      handsontableContainer.innerHTML = '';

      //create header array
      var headerArr = [...Array(129).keys()];
      headerArr[0] = 'Time';

      Handsontable(handsontableContainer, {
        data: parseResults.data,
        rowHeaders: true,
        colHeaders: headerArr,
        colWidths: [160],
        readOnly: true,
        autoColumnSize: false,
        licenseKey: 'non-commercial-and-evaluation'
      });
    },

    renderLogFileSelect(){

      if (!fs.existsSync(this.logPath)){
        fs.mkdirSync(this.logPath);
      }

      this.selectedLogFile = this.selectedLogFile || 'tc-data.log';

      fs.readdir(this.logPath, (err, files) => {
        //filter out file that are not .log files
        let logFiles = files.filter(f => f.split('.').pop() === 'log').sort();
        //fix sorting by putting data.log first
        let currLogIndex = logFiles.indexOf('tc-data.log');
        if(currLogIndex > -1 ){
          logFiles.splice(currLogIndex,1);
        }
        
        logFiles = ['tc-data.log', ...logFiles];
        logFiles.forEach(f => {
          var sel = document.getElementById('logfile-select');
          var opt = document.createElement('option');  
          opt.appendChild( document.createTextNode(f));
          opt.value = f; 
          opt.selected = this.selectedLogFile === f;
          sel.appendChild(opt); 
        });
      });
    }
  },

  computed: {
    logPath() { return this.$store.state.Settings.logPath },
    enableLogging() { return this.$store.state.Settings.enableLogging }
  }
}
</script>

<style>
  @import '~handsontable/dist/handsontable.full.css';

  .history-wrapper {
    width: 100%;
  }

  .select-container {
    padding: 20px;
  }

  #handsontable-container {
    font-family: Roboto;
    font-size: 12px;
    margin-bottom: 20px;
  }

  .handsontable .htDimmed {
    color: #000 !important;
  }
</style>