<template>
  <div id="app">
    <keep-alive include="chart-page">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'omega-grapher',

    data(){
      return {
        nextDataUpdateTimeout: undefined
      }
    },

    mounted() {

      this.$store.subscribe((mutation,state)=>{
        if(mutation.type === 'App/SET_CHARTUPDATING' && mutation.payload.isUpdating){
          this.updateThermocoupleData();
        }
      })

      this.$store.dispatch('App/init_load')
      

      //give a slight pause to finish loading if there is any loading to be done
      setTimeout(()=>{
        this.set_isChartUpdating(true);
      },400);
      
    },

    computed: {
      ...mapState('App', [
        'isChartUpdating'
      ]),

      ...mapState('Settings', [
        'chartUpdateRate',
      ]),
    },

    watch: {
      chartUpdateRate(newVal, oldVal){
        if(newVal != oldVal){
          clearTimeout(this.nextDataUpdateTimeout);
          this.updateThermocoupleData();
        }
      }
    },

    methods: {
      updateThermocoupleData(){
        if(this.isChartUpdating){
          this.fetch_all_thermocouples();
          this.fetch_all_kepwareTags();          

          this.nextDataUpdateTimeout = setTimeout(this.updateThermocoupleData, this.chartUpdateRate*1000);
        }
      },

      ...mapActions('Thermocouples', [
        'fetch_all_thermocouples',
        'fetch_all_kepwareTags',
      ]),

      ...mapActions('App', [
        'set_isChartUpdating'
      ])
    },

  }
</script>

<style>

    @import "~noty/lib/noty.css";
    @import "~noty/lib/themes/metroui.css";

    @font-face {
      font-family: 'Roboto';
      src: url('assets/fonts/Roboto-Regular.ttf')  format('truetype');
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }


    body { 
      font-family: Consolas; 
      font-size: 13px; 
      background-color: #eaeaea; 
    }

    input {
      font-size:12px;
      font-family:consolas;
      padding:3px;
    }

    button {
      font-family:consolas;
      font-size:12px;
      padding:3px;
    }


  /* change vex themes */

  .tippy-box, .tippy-content {
    border-radius: 0px !important;
    font-size: 11px !important;
  }

  .vex.vex-theme-wireframe .vex-content {
    border-color: #777 !important;
  }

  .vex-content, .vex-dialog-button {
    font-family: Consolas !important;
    font-size: 12px !important;
    border-color: #777 !important;
  }

  .vex.vex-theme-wireframe .vex-dialog-button.vex-dialog-button-primary {
    background-color: #999 !important;
  }


</style>
