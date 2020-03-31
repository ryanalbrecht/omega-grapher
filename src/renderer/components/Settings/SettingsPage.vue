<template>
  <div class="settings-wrap">
      <div class="flex-grid">
        <div class="col">
          <h3>General</h3>

          <table>  
            
                      
            <tr>
              <td >
                <v-icon 
                  name="question-circle" 
                  scale="0.7"
                  data-tippy-content="The number of thermocouples to expect. The application will expect to recieve thermocouple Ids from 1 to x, where x is the value of this setting.<br/><br/>This setting will take effect only if display missing thermocouples is enabled."
                ></v-icon>
                Number thermocouples :
              </td>
              <td>
                <input type="text" size="7" name="numberThermocouples" v-model.number="settings.numberThermocouples">
                
                <span class="error" v-if="!$v.settings.numberThermocouples.required">Field is required</span>
                <span class="error" v-if="!$v.settings.numberThermocouples.minValue">Minimum value of 0</span>
                <span class="error" v-if="!$v.settings.numberThermocouples.maxValue">Maximum value of 128</span>
                <span class="error" v-if="!$v.settings.numberThermocouples.integer">Field must be an integer</span>
              </td>
            </tr>


            <tr>
              <td>
                <v-icon 
                  name="question-circle" 
                  scale="0.7"
                  data-tippy-content="Should the application display each individual thermocouple status below the chart."
                ></v-icon>
                Display Thermocouple Statuses :
              </td>
              <td>
                <input 
                  type="checkbox" 
                  name="displaySensorStatus" 
                  id="displaySensorStatus" 
                  class="css-checkbox" 
                  v-model="settings.displaySensorStatus"
                />
                <label for="displaySensorStatus"  class="css-label"></label>
              </td>
            </tr>


            <tr>
              <td>
                <v-icon 
                  name="question-circle" 
                  scale="0.7"
                  data-tippy-content="If the application does not recieve an expected thermocouple Id, it will create a dummy thermocouple and display it as 'dead'."
                ></v-icon>
                Display missing thermocouples :
              </td>
              <td>
                <input 
                  type="checkbox" 
                  name="displayMissingThermocouple" 
                  id="displayMissingThermocouple" 
                  class="css-checkbox" 
                  v-model="settings.displayMissingThermocouples"
                />
                <label for="displayMissingThermocouple"  class="css-label"></label>
              </td>
            </tr>


            <tr>
              <td>
                <v-icon 
                  name="question-circle" 
                  scale="0.7"
                  data-tippy-content="Perform an HTTP POST request on each thermocouple update to the configured URL. The request data will include a JSON array of the latest thermocouple data."
                ></v-icon>
                Post on update :
              </td>
              <td>
                <input 
                  type="checkbox" 
                  name="postOnUpdate" 
                  id="postOnUpdate" 
                  class="css-checkbox" 
                  v-model="settings.postOnUpdate"
                />
                <label for="postOnUpdate" class="css-label"></label>
              </td>
            </tr>


            <tr>
              <td>
                <v-icon 
                  name="question-circle" 
                  scale="0.7"
                  data-tippy-content="The URL to post to on each thermocouple data update."
                ></v-icon>
                Post Url :
              </td>
              <td>
                <input type="text" name="postUrl" size="50" v-model="settings.postUrl">
                <span class="error" v-if="!$v.settings.postUrl.url">Field must be a valid URL</span>
                <span class="error" v-if="!$v.settings.postUrl.required">Field is required if 'Post on Update' is true</span>
              </td>
            </tr>


          </table>
          
        </div>
        <div class="col">
          <h3>ZW-Rec Device</h3>

          <table>


            <tr>
              <td>
                <v-icon 
                  name="question-circle" 
                  scale="0.7"
                  data-tippy-content="The host name or IP address of the ZW-REC device.<br/><br/>ZW-REC devices have a default address of 192.168.1.200"
                ></v-icon>
                Host :
              </td>
              <td>
                <input type="text" size="20" name="host" v-model="settings.host">
                <span class="error" v-if="!$v.settings.host.required">Field is required</span>
              </td>
            </tr>


            <tr>
              <td>
                <v-icon 
                  name="question-circle" 
                  scale="0.7"
                  data-tippy-content="The 'client' username of the ZW-REC device.<br/><br/>ZW-REC devices have a default client username of 'login'"
                ></v-icon>  
                Client Username :
              </td>
              <td>
                <input type="text" size="20" name="clientUsername" v-model="settings.clientUsername">
                <span class="error" v-if="!$v.settings.clientUsername.required">Field is required</span>
              </td>
            </tr>


            <tr>
              <td>
                <v-icon 
                  name="question-circle" 
                  scale="0.7"
                  data-tippy-content="The 'client' password of the ZW-REC device.<br/><br/>ZW-REC devices have a default client password of '12345678'"
                ></v-icon>
                Client Password :
              </td>
              <td>
                <input type="text" size="20" name="clientPassword" v-model="settings.clientPassword">
                <span class="error" v-if="!$v.settings.clientPassword.required">Field is required</span>
              </td>
            </tr>


            <tr>
              <td>
                <v-icon 
                  name="question-circle" 
                  scale="0.7"
                  data-tippy-content="The 'admin' username if the ZW-REC device.<br/><br/>ZW-REC devices have a default admin username of 'admin'"
                ></v-icon>
                Admin Username :
              </td>
              <td>
                <input type="text" size="20" name="adminUsername" v-model="settings.adminUsername">
                <span class="error" v-if="!$v.settings.adminUsername.required">Field is required</span>
              </td>
            </tr>


            <tr>
              <td>
                <v-icon 
                  name="question-circle" 
                  scale="0.7"
                  data-tippy-content="The 'admin' username if the ZW-REC device.<br/><br/>ZW-REC devices have a default admin username of '00000000'"
                ></v-icon>     
                Admin Password :
              </td>
              <td>
                <input type="text" size="20" name="adminPassword" v-model="settings.adminPassword">
                <span class="error" v-if="!$v.settings.adminPassword.required">Field is required</span>
              </td>
            </tr>


          </table>
        </div>
      </div>

      <div class="flex-grid">
        <div class="col">
          <h3>Data Logging</h3>

          <table>


            <tr>
              <td>
                <v-icon 
                  name="question-circle" 
                  scale="0.7"
                  data-tippy-content="Wether the application should log thermocouple data to the configured log file.<br/><br/>The CSV data will include the date as the first value and data for thermocouples 1-128. If the thermocouple does not exist, then the value will be empty."
                ></v-icon>  
                Enable logging :
              </td>
              <td>
                <input 
                  type="checkbox" 
                  name="enableLogging" 
                  id="enableLogging" 
                  class="css-checkbox"
                  v-model="settings.enableLogging"
                />
                <label for="enableLogging" class="css-label"></label>
              </td>
            </tr>


            <tr>
              <td>
                <v-icon 
                  name="question-circle" 
                  scale="0.7"
                  data-tippy-content="The log path for the CSV file."
                ></v-icon>  
                Log Path :
              </td>
              <td>
                <input type="text" size="50" name="logPath" v-model="settings.logPath">
                <span class="error" v-if="!$v.settings.logPath.required">Field is required if logging is enabled</span>                
              </td>
            </tr>


            <tr>
              <td>
                <v-icon 
                  name="question-circle" 
                  scale="0.7"
                  data-tippy-content="The number of log files to keep. Log files are rolled and archive each day at midnight."
                ></v-icon>  
                Log Days To Keep :
              </td>
              <td>
                <input type="text" size="7" name="logDaysToKeep" v-model.number="settings.logDaysToKeep">
                <span class="error" v-if="!$v.settings.logDaysToKeep.minValue">Minimum value of 0</span>
                <span class="error" v-if="!$v.settings.logDaysToKeep.integer">Field must be an integer</span>
                <span class="error" v-if="!$v.settings.logDaysToKeep.required">Field is required if logging is enabled</span>
              </td>
            </tr>


          </table>

        </div>
        <div class="col">
          <h3>Chart</h3>

          <table>


            <tr>
              <td>
                <v-icon 
                  name="question-circle" 
                  scale="0.7"
                  data-tippy-content="The title of the chart."
                ></v-icon>  
                Title :
              </td>
              <td>
                <input type="text" size="50" name="chartTitle" v-model="settings.chartTitle">
                <span class="error" v-if="!$v.settings.chartTitle.required">Field is required</span>
              </td>
            </tr>


            <tr>
              <td>
                <v-icon 
                  name="question-circle" 
                  scale="0.7"
                  data-tippy-content="The amount of time the chart should display in minutes.<br/><br/>Exceeding 12000 data points can impact performance."
                ></v-icon>  
                Timespan :
              </td>
              <td>
                <input type="text" size="7" name="chartTimespan" v-model.number="settings.chartTimespan">
                <span class="error" v-if="!$v.settings.chartTimespan.required">Field is required</span>
                <span class="error" v-if="!$v.settings.chartTimespan.minValue">Minimum value of 0</span>
                <span class="error" v-if="!$v.settings.chartTimespan.maxValue">Maximum value of 9999</span>
                <span class="error" v-if="!$v.settings.chartTimespan.integer">Field must be an integer</span>                
              </td>
            </tr>


            <tr>
              <td>
                <v-icon 
                  name="question-circle" 
                  scale="0.7"
                  data-tippy-content="How often to retrieve thermocouple data in minutes. This should be set to what your thermocouples are set to.<br/><br/>Exceeding 12000 data points can impact performance."
                ></v-icon>  
                Update Rate :
              </td>
              <td>
                <input type="text" size="7" name="chartUpdateRate" v-model.number="settings.chartUpdateRate">
                <span class="error" v-if="!$v.settings.chartUpdateRate.required">Field is required</span>
                <span class="error" v-if="!$v.settings.chartUpdateRate.minValue">Minimum value of 0</span>
                <span class="error" v-if="!$v.settings.chartUpdateRate.integer">Field must be an integer</span>                 
              </td>
            </tr>

            <tr>
              <td>
                <v-icon 
                  name="question-circle" 
                  scale="0.7"
                  data-tippy-content="Wether to add points to the chart that are above the set level. Set the field to an empty value if you do not wish to disgard any points"
                ></v-icon>  
                Disgard Points Above :
              </td>
              <td>
                <input type="text" size="7" name="chartDisgardPointsAbove" v-model.number="settings.chartDisgardPointsAbove">
                <span class="error" v-if="!$v.settings.chartDisgardPointsAbove.integer">Field must be an integer</span>                 
              </td>
            </tr>

            <tr>
              <td>
                <v-icon 
                  name="question-circle" 
                  scale="0.7"
                  data-tippy-content="Wether to add points to the chart that are below the set level.  Set the field to an empty value if you do not wish to disgard any points"
                ></v-icon>  
                Disgard Points Below :
              </td>
              <td>
                <input type="text" size="7" name="chartDisgardPointsBelow" v-model.number="settings.chartDisgardPointsBelow">
                <span class="error" v-if="!$v.settings.chartDisgardPointsBelow.integer">Field must be an integer</span>                 
              </td>
            </tr>


          </table>
        </div>
      </div>

      <div class="flex-grid">
        <div class="col">
          <button @click="saveSettings">Save</button>
          <button @click="resetSettings">Reset</button>
          <button @click="defaultSettings">Defaults</button>
          <span style="font-weight: bold; color: rgb(223, 17, 17);" v-if="submitStatus == 'ERROR'">Please fix errors before submitting</span>  
        </div>
      </div>
  </div>
</template>

<script>
  import 'vue-awesome/icons/question-circle';
  import Icon from 'vue-awesome/components/Icon'

  import {mapState} from 'vuex';
  import Noty from 'noty';
  
  import { required, minValue, maxValue, url, integer, requiredIf } from 'vuelidate/lib/validators'

  import tippy from 'tippy.js';
  import 'tippy.js/dist/tippy.css';

  let equal = require('fast-deep-equal');
  let vex = require('vex-js');
  const defaultSettings = require('../../store/defaultSettings');
  vex.registerPlugin(require('vex-dialog'));
  vex.defaultOptions.className = 'vex-theme-wireframe';

  export default {
    
    components: {
      'v-icon': Icon
    },

    mounted(){
      tippy('[data-tippy-content]', {
        allowHTML: true
      });
    },

    data(){
      let enterSettings = { ...this.$store.state.Settings };
      let settings = { ...this.$store.state.Settings };
      //remove chartHeight setting as that is set on the chart component
      delete settings.chartHeight;

      return {
       settings,
       enterSettings,
       submitStatus: 'OK'
      }
    },

    methods: {
      saveSettings(){
        if(this.$v.$invalid){
          this.submitStatus = 'ERROR';
          return;
        }
        
        this.$store.dispatch({
          type:'Settings/set_settings',
          settings: this.settings
        })
        .then(()=>{
          this.submitStatus = 'OK';
          
          new Noty({
            theme: 'metroui',
            type: 'success',
            text: 'Settings saved.',
            timeout: 3000,
            progressBar: true,
            animation: {
              open: null,
              close: null
            }
          }).show();

        })
      },

      resetSettings(){
        this.settings = { ...this.$store.state.Settings }
        this.submitStatus = 'OK';
        delete this.settings.chartHeight;
      },

      defaultSettings(){
        this.settings = { ...defaultSettings };
        this.submitStatus = 'OK';
        delete this.settings.chartHeight;
      }
    },

    beforeRouteLeave(to, from, next){
      let storeSettings = {...this.$store.state.Settings};
      delete storeSettings.chartHeight; //I should fix this somehow :/
      let currSettings = {...this.settings};
      let settingsChanged = !equal(storeSettings, currSettings);
   


      if( !equal(this.enterSettings, storeSettings) ){

        if(!currSettings.displayMissingThermocouples){
          this.$store.dispatch("Thermocouples/remove_missing_thermocouples");
        }else{
          this.$store.dispatch("Thermocouples/add_missing_thermocouples");
        }

        if(this.enterSettings.numberThermocouples != storeSettings.numberThermocouples){
          this.$store.dispatch("Thermocouples/fetch_all_thermocouples");
        }

      }


      if(settingsChanged){
        vex.dialog.confirm({
          message: 'You have unsaved changes. Are you sure you wish to leave?',
          callback: function (value) {   
            if(value){
              next();
            }
          }
        })

      }else{
        next();
      }
    },

    validations: {
      settings: {
        numberThermocouples: {
          required,
          integer,
          minValue: minValue(0),
          maxValue: maxValue(128)
        },
        postUrl: {
          url,
          required: requiredIf(function(form){
            return this.settings.postOnUpdate
          })
        },
        host:{
          required,
        },
        clientUsername: {
          required,
        },
        clientPassword: {
          required,
        },
        adminUsername: {
          required,
        },
        adminPassword: {
          required,
        },
        logPath: {
          required: requiredIf(function(form){
            return this.settings.enableLogging
          })
        },
        logDaysToKeep: {
          required: requiredIf(function(form){
            return this.settings.enableLogging
          }),
          minValue: minValue(0),
          integer
        },
        chartTitle: {
          required,
        },
        chartTimespan: {
          required,
          integer,
          minValue: minValue(1),
          maxValue: maxValue(9999)
        },
        chartUpdateRate: {
          required,
          integer,
          minValue: minValue(1)
        },
        chartDisgardPointsAbove:{
          integer
        },
        chartDisgardPointsBelow: {
          integer
        }
      }
    }
  }
</script>

<style scoped>
  @import url("./checkbox.css");
  @import url("~vex-js/dist/css/vex.css");
  @import url("~vex-js/dist/css/vex-theme-wireframe");

  input[type=text] {
    max-width: 300px;
  }

  table {
    border-spacing: 10px;
  }

  td  {
    height: 25px;
  }

  .settings-wrap {
    padding:20px;
  }

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

  .fa-icon {
    color: grey;
    margin-bottom: -1px;
  }

  .error {
    width:100%;
    display: inline-block;
    font-weight: bold;
    color: rgb(223, 17, 17);
  }

</style>
