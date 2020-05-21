<template>
  <div class="tc-wrapper" v-on:click="click" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <div class="tc-row">
      <div class="id">{{paddedId}}</div>
      <div class="name">{{thermocouple.name}}</div>
    </div>
    <div class="tc-row">
      <div class="status">
        <div class="status-indicator" v-bind:class="status[1]">
          {{status[0]}}
        </div>
        <span v-if="thermocouple.batteryLevel <= 2 && thermocouple.missing === '0'">
          <v-icon :name="battery.name" scale="1.15" class="battery-indicator" :style="{color:battery.color}"></v-icon>
        </span>
      </div>
      <div class="reading">
        <span v-if="thermocouple.missing === '0' && thermocouple.disabled === '0'">{{reading}}</span> <!---<span v-html="symbol" style="font-size:11px"></span>--->
        </div>
    </div>
  </div>
</template>

<script>

import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon'

export default {
  components: {'v-icon': Icon},
  props: ['thermocouple'],
  
  methods: {
    click(){
      this.$router.replace(`/thermocouple/${this.thermocouple.id}`).catch( ()=>{} );
    },
    mouseenter(){
      this.$store.dispatch('App/set_mouseOverThermocouple', this.thermocouple.id);
    }, 
    mouseleave(){
      this.$store.dispatch('App/set_mouseOverThermocouple');
    }
  },
  
  computed: {
    paddedId(){
      return this.thermocouple.id.padStart(2,'0');
    },
    status(){
      if(this.thermocouple.missing === '1'){
        return ['Dead','greyBg']
      }

      if(this.thermocouple.disabled === '1'){
        return ['Disabled','blueBg']
      }      

      if(this.thermocouple.lost === '1'){
        return ['Lost','redBg']
      }

      if(this.thermocouple.open === '1'){
        return ['Open','orangeBg']
      }

      return ['Good','greenBg']
    },
    symbol(){
      return this.thermocouple.srs[0].s;
    },
    reading(){
      let temp = parseFloat(this.thermocouple.srs[0].r);
      return Math.floor(temp);
    },
    battery(){
      let iconName = ['battery-empty','battery-quarter','battery-half'];
      let iconColor = ['#dddddd','#bd6a6a','#d3b455'];

      return {
        color: iconColor[this.thermocouple.batteryLevel],
        name: iconName[this.thermocouple.batteryLevel]
      }
    }
  }
}
</script>

<style scoped>
  .tc-wrapper {
    padding: 8px;
    width: 123px;
    box-sizing: content-box;
    background-color: #fff;
    font-size: 15px;
    border: 1px solid #bdbdbd;
  }

  .tc-wrapper:active {
    background-color: #b8b8b8;
  }

  .tc-row {
    display: flex;
    flex-direction: row;
  }

  .tc-row:nth-child(1) {
    padding-bottom: 5px;
  }

  .id {
    width: 25%;
  }

  .name {
    text-align: right;
    width: 75%;
  }

  .reading {
    width: 45%;
    text-align: right;
  }

  .reading span {
    vertical-align: middle;
  }

  .status {
    width: 55%
  }

  .status-indicator {
    display: inline-block;
    padding: 2px 3px;
    color:#fff;
    font-size: 11px;
    border-radius: 4px;
  } 

  .redBg {
    background-color: #bd6a6a;
  }

  .greenBg{
    background-color: #6abd78;
  }

  .orangeBg {
    background-color: #d3b455;
  }

  .blueBg{
    background-color: #686fd3;
  }

  .greyBg {
    background-color: #7a7a7a;
  }

  .battery-indicator {
    margin-bottom: -5px;
  }
  
</style>