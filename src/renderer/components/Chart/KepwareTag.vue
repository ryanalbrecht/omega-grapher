<template>
  <div class="kt-wrapper">
    
    <table>
      <tr>
        <td>
          <div class="status-indicator" v-bind:class="status[1]">
            <span v-if="kepwareTag.s">Good</span><span v-else>Bad</span>
          </div>          
        </td>
        <td>
          {{kepwareTag.id}}
        </td>
        <td>
          <span v-if="kepwareTag.s">{{parseFloat(kepwareTag.v).toFixed(2)}}</span>
          <span v-else>{{kepwareTag.r}}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>


export default {
  props: ['kepwareTag'],
  
  methods: {

  },

  computed: {

    status(){   
      if(!this.kepwareTag.s){
        return ['Bad','redBg']
      }

      return ['Good','greenBg']
    },

  }
}
</script>

<style scoped>
  td {
    padding:8px;
  }

  .kt-wrapper {
    /* padding: 8px; */
    box-sizing: content-box;
    background-color: #fff;
    font-size: 13px;
    border: 1px solid #bdbdbd;
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
  
</style>