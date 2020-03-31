<template>
  <div class="thermocouple-wrap">

    <div class="flex-grid">
      <div class="col">
          <h3>Thermocouple Data</h3>
          <table v-if="thermocouple !== null">
            <tr>
              <td>Id :</td>
              <td>{{thermocouple.id}}</td>
            </tr>
            <tr>
              <td>Name :</td>
              <td>{{thermocouple.name}}</td>
            </tr>
            <tr>
              <td>Type :</td>
              <td>{{thermocouple.typeStr}}</td>
            </tr>
            <tr>
              <td>Success % :</td>
              <td>{{thermocouple.quality}}</td>
            </tr>
            <tr>
              <td>Sequence :</td>
              <td>{{thermocouple.seq}}</td>
            </tr>
            <tr>
              <td>Expected Update Rate :</td>
              <td>{{thermocouple.update}}</td>
            </tr>
            <tr>
              <td>Signal Level (0-5):</td>
              <td>{{thermocouple.signalLevel}}</td>
            </tr>
            <tr>
              <td>RSSI:</td>
              <td>{{thermocouple.rssi}}</td>
            </tr>
            <tr>
              <td>Power:</td>
              <td>{{!!thermocouple.power}}</td>
            </tr>
            <tr>
              <td>Battery Level (0-4):</td>
              <td>{{thermocouple.batteryLevel}}</td>
            </tr>
            <tr>
              <td>Battery Voltage:</td>
              <td>{{thermocouple.battery/1000}}</td>
            </tr>
            <tr>
              <td>Firmware:</td>
              <td>{{thermocouple.firmware}}</td>
            </tr>
            <tr>
              <td>Number Sensors:</td>
              <td>{{thermocouple.sensors}}</td>
            </tr>
            <tr>
              <td>Sensor 1 :</td>
              <td>
                {{thermocouple.srs[0].r}}
              </td>
            </tr>
            <tr>
              <td>Sensor 2 :</td>
              <td>
                {{thermocouple.srs[1].r}}
              </td>
            </tr>
            <tr>
              <td>Sensor 3 :</td>
              <td>
                {{thermocouple.srs[2].r}}
              </td>
            </tr>
            <tr>
              <td>Sensor 4 :</td>
              <td>
                {{thermocouple.srs[3].r}}
              </td>
            </tr>
            <tr v-bind:class="{ warning: thermocouple.disabled == '1' }">
              <td>Disabled :</td>
              <td>
                {{thermocouple.disabled == '0' ? 'FALSE' : 'TRUE'}}
              </td>
            </tr>
            <tr v-bind:class="{ warning: thermocouple.missing == '1' }">
              <td>Dead :</td>
              <td>
                {{thermocouple.missing == '0' ? 'FALSE' : 'TRUE'}}
              </td>
            </tr>
            <tr v-bind:class="{ warning: thermocouple.lost == '1' }">
              <td>Lost :</td>
              <td>
                {{thermocouple.lost == '0' ? 'FALSE' : 'TRUE'}}
              </td>
            </tr>
            <tr v-bind:class="{ warning: thermocouple.open == '1' }">
              <td>Open :</td>
              <td>
                {{thermocouple.open == '0' ? 'FALSE' : 'TRUE'}}
              </td>
            </tr>
            <tr>
              <td colspan="2" align="center">update in {{this.countDown}}s</td>
            </tr>
          </table>
      </div>


      <div class="col">
        <table v-if="tcData !== undefined">            
          <tr>
            <td >
              <v-icon 
                name="question-circle" 
                scale="0.7"
                data-tippy-content="The name of the offset."
              ></v-icon>
              Name :
            </td>
            <td>
              <input type="text" size="50" name="EDName" v-model="tcData.EDName">
            </td>
          </tr>
          <tr>
            <td >
              <v-icon 
                name="question-circle" 
                scale="0.7"
                data-tippy-content="The expected update rate of the end device. If the end device misses more than 4 scheduled updates, it will be marked as lost."
              ></v-icon>
              Update Interval :
            </td>
            <td>
              <input type="text" size="8" name="EDSleepTime" v-model.number="tcData.EDSleepTime">
            </td>
          </tr>
          <tr>
            <td >
              <v-icon 
                name="question-circle" 
                scale="0.7"
                data-tippy-content="Offset for sensor 1. This can be negative"
              ></v-icon>
              Sensor 1 Offset :
            </td>
            <td>
              <input type="text" size="8" name="EDOffset0" v-model.number="tcData.EDOffset0">
            </td>
          </tr>
          <tr>
            <td >
              <v-icon 
                name="question-circle" 
                scale="0.7"
                data-tippy-content="Offset for sensor 2. This can be negative."
              ></v-icon>
              Sensor 2 Offset :
            </td>
            <td>
              <input type="text" size="8" name="EDOffset1" v-model.number="tcData.EDOffset1">
            </td>
          </tr>
          <!-- <tr>
            <td >
              <v-icon 
                name="question-circle" 
                scale="0.7"
                data-tippy-content="Offset for sensor 3. This can be negative."
              ></v-icon>
              Sensor 3 Offset :
            </td>
            <td>
              <input type="text" size="8" name="EDOffset2" v-model.number="tcData.EDOffset2">
            </td>
          </tr>
          <tr>
            <td >
              <v-icon 
                name="question-circle" 
                scale="0.7"
                data-tippy-content="Offset for sensor 4. This can be negative."
              ></v-icon>
              Sensor 4 Offset :
            </td>
            <td>
              <input type="text" size="8" name="EDOffset3" v-model.number="tcData.EDOffset3">
            </td>
          </tr> -->
          <tr>
            <td colspan="2" style="padding-top:10px;">
              <button @click="updateTarget1Sensor">Update</button>   

              <button v-if="thermocouple.disabled == '0'" @click="disableSensor">Disable</button> 
              <button v-if="thermocouple.disabled == '1'" @click="enableSensor">Enable</button>
              <button @click="removeData">Remove Data</button> 
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon'
import { mapActions } from 'vuex';
import Noty from 'noty';

import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

export default {
  components: {'v-icon': Icon},
  props: ['id'],
  mounted(){
    tippy('[data-tippy-content]', {
      allowHTML: true
    });

    this.fetch_target1_data();
    this.startUpdate();
  },

  data() {
    return {
      interval: null,
      refreshRate: 5, 
      countDown: 5,
      loading: false,
      error: false,
      tcData: undefined
    }
  },

  destroyed(){
    clearInterval(this.interval);
  },

  computed:{
    thermocouple(){
      return this.$store.getters['Thermocouples/thermocouples'].find(tc => tc.id === this.id);
    },
    allThermocouples(){
      return this.$store.getters['Thermocouples/thermocouples'];
    }
  },

  watch: {
    id: function() {
      this.tcData = undefined;
      this.fetch_target1_data();
    },
  },

  methods: {

    changeThermocouple(event){
      this.$router.replace(`/thermocouple/${event.target.value}`).catch( ()=>{} );
    },

    startUpdate(){
      this.interval = setInterval(()=>{
        this.countDown--;
        if(this.countDown < 0){
          this.countDown = this.refreshRate;
          this.updateData();
        }
      },1000)
    },

    updateData(){
      this.update_thermocouple(this.id);
    },

    fetch_target1_data(){
      this.loading = true;
      this.$store.state.App.zwRec.getThermocouple(this.id)
      .then((data) => {
        this.loading = false;
        this.tcData = {
          deviceID: data.id,
          EDName: data.name,
          EDSleepTime: data.update,
          EDOffset0: data.EDOffset0,
          EDOffset1: data.EDOffset1,
          EDOffset2: data.EDOffset2,
          EDOffset3: data.EDOffset3
        };
      })
      .catch(err=>{
        this.loading = false;
        this.error = true;
      })
    },

    updateTarget1Sensor(){
      this.$store.state.App.zwRec.setThermocouple({
        ...this.tcData
      }).then(()=>{
        this.updateData();
        new Noty({
          theme: 'metroui',
          type: 'success',
          text: 'End device updated.',
          timeout: 3000,
          progressBar: true,
          animation: {
            open: null,
            close: null
          }
        }).show();
      });
    },

    disableSensor(){
      this.$store.dispatch('Thermocouples/add_disabled_thermocouple', this.id);
    },

    enableSensor(){
      this.$store.dispatch('Thermocouples/remove_disabled_thermocouple', this.id);
    },

    removeData(){
       this.$store.dispatch('App/remove_chart_data', this.id);
    },

    ...mapActions('Thermocouples', [
      'update_thermocouple',
    ]),

  },

}
</script>

<style scoped>
  table {
    min-width: 280px;
  }

  td {
    padding: 4px;
  }

  tr:nth-child(even) {background: #cccccc}

  .flex-grid {
    display: flex;
  }

  .col {
    flex: 1;
    margin: 10px;
    padding: 10px;
    background-color: #d9d9d9;
  }

  @media (max-width: 500px) {
    .flex-grid {
      display: block;
    }
  }

  .loader-wrap {
    width: 100%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .loader {
    margin: 0 auto;
    margin-bottom: 20px;
    border: 12px solid #999999;
    border-radius: 50%;
    border-top: 12px solid #474747;
    width: 80px;
    height: 80px;
    -webkit-animation: spin 0.8s linear infinite; /* Safari */
    animation: spin 0.8s linear infinite;
  }

  .loader-text {
    text-align: center;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  input[type=text] {
    max-width: 300px;
  }

  .fa-icon {
    color: grey;
    margin-bottom: -1px;
  }

  .warning td {
    font-weight: bold;
    color: rgb(243, 9, 9);
  }

</style>