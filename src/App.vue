<template>
  <div id="app">
    <!-- <keep-alive> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
    <navbar></navbar>
  </div>
</template>

<script>
import navbar from './components/navbar.vue'
import alert from './components/alert.vue'
export default {
  name: 'App',
  components:{
    navbar,alert
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
