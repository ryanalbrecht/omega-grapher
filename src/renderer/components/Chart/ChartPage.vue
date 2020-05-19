<template>
  <div class="wrapper">

    <div class="request-error" v-if="tcRequestError">Thermocouple Update Error</div>
    <div class="request-error" v-if="kpRequestError">Kepware Update Error</div>

    <temperature-chart class="chart-wrap"></temperature-chart>

    <div class="thermocouple-wrap" v-if="displaySensorStatus">
      <thermocouple 
        v-for="tc in thermocouples" 
        :key="tc.id" 
        v-bind:thermocouple="tc"
        class="thermocouple"
      ></thermocouple>
    </div>

    <div class="thermocouple-wrap" v-if="displaySensorStatus">
      <kepwareTag 
        v-for="kt in kepwareTags" 
        :key="kt.id" 
        v-bind:kepwareTag="kt"
        class="thermocouple"
      ></kepwareTag> 
    </div> 

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Thermocouple from './Thermocouple';
import kepwareTag from './kepwareTag';
import TemperatureChart from './TemperatureChart';

export default {
  name: 'chart-page',
  components: { Thermocouple, TemperatureChart, kepwareTag },
  computed: {
    displaySensorStatus(){ return this.$store.state.Settings.displaySensorStatus },

    thermocouples(){
      return this.$store.getters['Thermocouples/thermocouples'];
    },

    kepwareTags(){
      return this.$store.state.Thermocouples.kepwareTags;
    },

    tcRequestError(){
      return this.$store.state.Thermocouples.thermcoupleRequestError;
    },

    kpRequestError(){
      return this.$store.state.Thermocouples.kepwareRequestError;
    }

  }
}
</script>

<style scoped>

  .wrapper {
    margin: 0;
    width: 100%;
    height: 100%;
  }

  .thermocouple-wrap {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }

  .request-error {
    margin: 10px 0px 0px 30px;
    padding:6px;
    font-size: 11px;
    float:left;
    background-color: rgb(211, 0, 0);
    color: white;
    border: 0px solid rgb(75, 75, 75);
    animation: error-flash 1s infinite;
  }  


  @keyframes error-flash {
    0% { background-color: #d30000; color:#fff}
    49% { background-color: #d30000; color:#fff}
    50% { background-color: #eaeaea; color:#000}
    100% { background-color: #eaeaea; color:#000}
  }


  .thermocouple {
    align-self: flex-start;
    margin: 6px 8px;
    cursor: pointer;
    user-select: none;
  }

</style>