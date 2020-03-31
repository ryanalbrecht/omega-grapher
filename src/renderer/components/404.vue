<template>
  <div>404! The route <i>'{{currentRoute}}'</i> has not been implemented</div>
</template>

<script>
export default {
  computed: {
    currentRoute: function(){
      return this.$router.currentRoute.fullPath
    }
  }
}
</script>

<style>

</style>