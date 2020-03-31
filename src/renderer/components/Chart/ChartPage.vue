<template>
  <div class="wrapper">

    <temperature-chart class="chart-wrap"></temperature-chart>

    <div class="thermocouple-wrap" v-if="displaySensorStatus">
      <thermocouple 
        v-for="tc in thermocouples" 
        :key="tc.id" 
        v-bind:thermocouple="tc"
        class="thermocouple"
      >
        {{tc.id}}
      </thermocouple>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Thermocouple from './Thermocouple';
import TemperatureChart from './TemperatureChart';

export default {
  name: 'chart-page',
  components: { Thermocouple, TemperatureChart },
  computed: {
    displaySensorStatus(){ return this.$store.state.Settings.displaySensorStatus },

    thermocouples(){
      return this.$store.getters['Thermocouples/thermocouples'];
    },
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

  .thermocouple {
    align-self: flex-start;
    margin: 6px 8px;
    cursor: pointer;
    user-select: none;
  }

</style>