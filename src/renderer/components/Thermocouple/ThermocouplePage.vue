<template>
  <div>
    <div style="padding:10px">
      Select Thermocouple: 
      <select style="width: 200px; font-family: consolas" v-model="id">
        <option v-for="tc in allThermocouples" :key="tc.id" :value="tc.id">
          {{tc.id}} | {{tc.name}}
        </option>
      </select>
    </div>
    <thermocouple-editor v-bind:id="id"></thermocouple-editor>
  </div>
</template>

<script>
import ThermocoupleEditor from './ThermocoupleEditor';

export default {
  components: {ThermocoupleEditor},
  data() {
    return {
      id: this.$route.params.id
    }
  },
  computed:{
    allThermocouples(){
      return this.$store.getters['Thermocouples/thermocouples'];
    }
  },

}
</script>

<style>

</style>