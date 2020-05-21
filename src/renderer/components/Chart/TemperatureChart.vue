<template>

 
    <div id="chart-container" v-bind:style="{ height: chartHeight + 'px' }"></div>
  
  
</template>

<script>
import { mapState, mapActions } from 'vuex';
import * as Highcharts from "highcharts";
import Moment from "moment";
import MomentTimeZone from "moment-timezone";
import Noty from 'noty';

window.moment = Moment
MomentTimeZone();

let elementResizeDetector = require("element-resize-detector")();
let theme = require("./_highchartTheme");
let _ = require('lodash');

let loadThermocoupleHistory = require('./_thermocoupleHistoryLoader').default;
let loadKepwareHistory = require('./_kepwareHistoryLoader').default;

require('highcharts/modules/exporting')(Highcharts);
Highcharts.setOptions(theme.default);

export default {

  data(){
    return {
      yAxisFloor: this.$store.state.Settings.chartYAxisFloor,
      yAxisCeiling: this.$store.state.Settings.chartYAxisCeiling,
      currentHighlightedSeries: ''
    }
  },

  mounted(){
    this.$store.subscribe((mutation, state) =>{
      if(mutation.type === "Thermocouples/SET_THERMOCOUPLES"){
        this.updateChartData( this.$store.getters['Thermocouples/temperaturePacket_thermocouples'] );
      }

      if(mutation.type === "Thermocouples/SET_KEPWARETAGS"){
        this.updateChartData( this.$store.getters['Thermocouples/temperaturePacket_kepwareTgas'] );
      }

      if(mutation.type === "Settings/SET_SETTINGS"){
        this.chart.yAxis[0].update({
          //null means highcharts will calculate automatically
          floor: state.Settings.chartYAxisFloor || null,
          ceiling: state.Settings.chartYAxisCeiling || null,
        });
      }

      if(mutation.type === "App/SET_MOUSEOVERTHERMOCOUPLE"){
        this.highlightSeries(state.App.mouseOverThermocouple);
      }

    });

    this.$store.subscribeAction((action,state)=>{
       if(action.type === "App/remove_chart_data"){
         this.removeChartData(action.payload);
       }
    });

    this.$store.subscribeAction((action,state)=>{
       if(action.type === "App/remove_all_chart_data"){
         this.removeAllChartData();
       }
    });

    this.initChart();

  },

  methods: {

    initChart(){
      let chartContainer = document.getElementById("chart-container");
      this.chart = Highcharts.chart(chartContainer, {
        chart: {
          type: 'line',
          animation: false,
          margin: [50,50,50,50],
          borderColor: "#bdbdbd",
          borderWidth: 1,
          zoomType: 'x',
        },
        credits: {
          enabled: false
        },
        title: {
            text: this.chartTitle
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            labels: {
                format: '{value:%H:%M}'
            },
            lineWidth: 1,
        },
        yAxis: [
          {
              title: {
                  text: ''
              },
              floor: this.yAxisFloor || null,
              ceiling: this.yAxisCeiling || null,
              startOnTick: true,
          },
          {
              title: {
                  text: ''
              },
              floor: this.yAxisFloor || null,
              ceiling: this.yAxisCeiling || null,
              startOnTick: true,
              opposite: true
          },
        ],
        tooltip: {
            enabled: true,
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 2);
            }
        },
        plotOptions: {
            series: {
                turboThreshold: 0,
                lineWidth: 1,
                marker: {
                    enabled: false,
                    symbol: 'circle'
                },
                connectNulls: true
            },
            line: {
                animation: false,
                shadow: false,
                stickyTracking: true,
                enableMouseTracking: true
            },
            spline: {
                animation: false,
                shadow: false,
                stickyTracking: true,
                enableMouseTracking: true
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        }
      });  
      
      // Load thermocouple data that has stored in tc-data.log
      loadThermocoupleHistory(this.$store, (tcData)=>{
        for(let key in tcData){
          if(this.$store.state.Settings.disabledThermocouples.indexOf(key) > -1){
            continue;
          }

          var tp = { 
            id    :key, 
            name  :'', 
            color :this.$store.state.App.defaultChartSeriesColor, 
            type  :'TC'  
          };

          let series = this.getOrAddChartSeries(tp);
          series.setData(tcData[key],false,false,false);
          //debugger;
        }

        this.chart.redraw();
      });

      // Load kepware data that has stored in kp-data.log
      loadKepwareHistory(this.$store, (kpData)=>{
        if(this.$store.state.Settings.kepwareTags.length == 0){
          return;
        }

        for(let key in kpData){
          //get kep tag at index
          let tag = this.$store.state.Settings.kepwareTags[key-1];

          var tp = { 
            id    :tag.id, 
            name  :`${tag.id} |`, 
            color :tag.color, 
            type  :'KP'  
          };

          let series = this.getOrAddChartSeries(tp);
          series.setData(kpData[key],false,false,false);
          //debugger;
        }

        this.chart.redraw();
      });

      elementResizeDetector.listenTo(chartContainer,this.onContainerResized);
      
    },


    updateChartData(data){
      let dateInstance = new Date();

      let extremes = this.chart.xAxis[0].getExtremes();
      let newMinExtreme = dateInstance - (60000 * this.chartTimespan);

      //remove all points below minimum value
      for(let series of this.chart.series){
        for(let point of series.data){
          if(point.x < newMinExtreme){
            point.remove()
          }
        }
      }

      // if (
      //   extremes.dataMin < newMinExtreme
      //   && extremes.min < newMinExtreme) 
      // {
      //     this.chart.xAxis[0].setExtremes( newMinExtreme, dateInstance);
      // }


      //loop over temperature packets
      data.forEach(tp => {
        if(tp.missing === '1' || tp.disabled === '1'){ return };
        tp.datetime = dateInstance;
        this.addChartData(tp);
      });

      this.chart.redraw();
    },


    addChartData(temperaturePacket){
      var { temperature, datetime } = temperaturePacket;

      let x = datetime;
      let y = temperature;

      if(
        this.chartDisgardPointsAbove != ''
        && y > this.chartDisgardPointsAbove 
      ){
        return;
      }

      if(
        this.chartDisgardPointsBelow != ''
        && y < this.chartDisgardPointsBelow 
      ){
        return;
      }

      let series = this.getOrAddChartSeries(temperaturePacket);
      let shouldShift = false;

      let extremes = this.chart.xAxis[0].getExtremes();
      let firstPoint = series.data[0];

      if(firstPoint && firstPoint.x < extremes.min){
        shouldShift = true;
      }

      series.addPoint({ x, y }, false, shouldShift, false);
    },

    removeChartData(id){
      let series = this.chart.get(id);
      if(series !== undefined){
        series.remove();
      }

      new Noty({
        theme: 'metroui',
        type: 'success',
        text: `Data for device ${id} removed from chart.`,
        timeout: 3000,
        progressBar: true,
        animation: {
          open: null,
          close: null
        }
      }).show();

    },

    removeAllChartData(){
      for(let series of this.chart.series){
        series.setData([],false,false,false);
      }
      this.chart.redraw();
    },

    getOrAddChartSeries(temperaturePacket){
      var { id, name, color, type } = temperaturePacket;
      let series = this.chart.get(id);
      
      if(series === undefined){
        series = this.chart.addSeries({
          id: id,
          name: `${id} | ${name}`,
          color: color,
          previousColor: color,
          yAxis: type == 'TC' ? 0 : 1,
          zIndex: type == 'TC' ? 1 : 2,
          lineWidth: type == 'TC' ? 1 : 1.5,
        }, false, false);
      }

      if(series.name != `${id} | ${name}`){
        this.updateChartSeriesName(id,name);
      }

      return series;
    },

    updateChartSeriesName(id,name){
      let series = this.chart.get(id);
      series.update({
        name: name 
      }, false)
    },

    highlightSeries(seriesId){
      if(this.currentHighlightedSeries != seriesId){
        let series = this.chart.get(this.currentHighlightedSeries);

        if(series !== undefined){
          series.update({
            color: series.options.previousColor,
            lineWidth: 1,
            zIndex: 1  
          });
          this.currentHighlightedSeries = '';
        }
      }

      if(seriesId !== ''){
        let s = this.chart.get(seriesId);
        
        if(s !== undefined){
          //store the current color in the series object to be used later;
          s.options.previousColor = s.options.color;

          s.update({
            color: '#e81313',
            lineWidth: 4,
            zIndex: 10  
          });
          this.currentHighlightedSeries = seriesId;
        }
      }
    },


    set_chart_height_debounced: _.debounce( function(height){
      this.set_chart_height(height);
    }, 200),

    onContainerResized(elm){
      this.set_chart_height_debounced(elm.clientHeight);
      this.chart.reflow()
    },

    ...mapActions('Settings', [
      'set_chart_height'
    ]),
  },

  computed: {
    ...mapState('Settings', [
      'chartHeight',
      'chartTitle',
      'chartTimespan',
      'chartDisgardPointsAbove',
      'chartDisgardPointsBelow'
    ])
  },

  watch: {
    chartTitle(newChartTitle) {
      this.chart.setTitle({text: newChartTitle});
    }
  }

}
</script>

<style>
  .chart-wrap {
    padding: 10px 30px 10px 30px;
    width: 100%;
    resize: vertical;
    overflow: hidden;
  }

  .highcharts-axis-line {
    display: none !important;
  }

</style>