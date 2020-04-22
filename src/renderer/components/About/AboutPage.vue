<template>
  <div id="wrapper">
    <img id="logo" class="logo" src="~@/assets/logo.svg" alt="electron-vue">
    <main>
      <div class="left-side">
        <span class="title">
          Omega Grapher
        </span>
        <system-information></system-information>
      </div>

      <div class="right-side">
        <div class="doc ">
          <div class="title">About</div>
          <p>
            Omega Grapher is an application designed to communicate and chart thermocouple data from an Omega Engineering ZW-REC device.
          </p>
          <p>  
            Pease contact ryan@techemet.com to report any bugs or request additional features.
          </p>
        </div>
        <div class="doc">
          <div class="title alt">Links</div>
          <button @click="open('http://www.omegagrapher.com')">Omega Grapher</button>
          <button @click="open('http://www.techemet.com')">Techemet LP</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import SystemInformation from './SystemInformation.vue';
  
  const { shell } = require('electron')

  export default {
    components: {SystemInformation},
    methods: {
      open(link){
        shell.openExternal(link);
      }
    }  
  }
</script>

<style scoped>


  #wrapper {
    height: 100vh;
    padding: 100px 180px;
    width: 100vw;
  }
  #logo {
    height: auto;
    margin-bottom: 40px;
    width: 420px;
  }
  main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  main > div { flex-basis: 50%; }
  .left-side {
    display: flex;
    flex-direction: column;
  }
  .right-side {
    margin-top:50px
  }
  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }
  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }
  .title.alt {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .doc p {
    color: black;
    margin-bottom: 10px;
    font-size: 14px;
  }

</style>