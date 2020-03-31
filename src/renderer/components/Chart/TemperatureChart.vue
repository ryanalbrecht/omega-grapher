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

require('highcharts/modules/exporting')(Highcharts);
Highcharts.setOptions(theme.default);

export default {
  mounted(){

    this.$store.subscribe((mutation) =>{
      if(mutation.type === "Thermocouples/SET_THERMOCOUPLES"){
        this.updateChartData( this.$store.getters['Thermocouples/thermocouples'] );
      }
    });

    this.$store.subscribeAction((action,state)=>{
       if(action.type === "App/remove_chart_data"){
         this.removeChartData(action.payload);
       }
    })

    this.initChart();

  },

  methods: {

    initChart(){
      let chartContainer = document.getElementById("chart-container");
      this.chart = Highcharts.chart(chartContainer, {
        chart: {
          type: 'line',
          animation: false,
          margin: [50,20,50,50],
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
            }
        },
        yAxis: {
            title: {
                text: ''
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
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
                    enabled: false
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
      
      elementResizeDetector.listenTo(chartContainer,this.onContainerResized);
    },


    updateChartData(data){
      let dateInstance = new Date();

      let extremes = this.chart.xAxis[0].getExtremes();
      let newMinExtreme = dateInstance - (60000 * this.chartTimespan);

      if (
        extremes.dataMin < newMinExtreme
        && extremes.min < newMinExtreme) 
      {
          this.chart.xAxis[0].setExtremes(newMinExtreme, dateInstance);
      }

      data.forEach(tc => {
        if(tc.missing === '1' || tc.disabled === '1'){ return };
        
        this.addChartData(
          tc.id, 
          tc.name,
          dateInstance,
          parseFloat(tc.srs[0].r)
        );
      });

      this.chart.redraw();
    },


    addChartData(seriesId, name, x, y){
      
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

      let series = this.getOrAddChartSeries(seriesId, name);
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

    getOrAddChartSeries(seriesId, name){
      let series = this.chart.get(seriesId);
      
      if(series === undefined){
        series = this.chart.addSeries({
          id: seriesId,
          name: `${seriesId} | ${name}`
        }, false, false);
      }

      return series;
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
    padding: 20px 30px;
    width: 100%;
    resize: vertical;
    overflow: hidden;
  }

</style>