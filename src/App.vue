<template>
  <div id="app">
    <Main/>
  </div>
</template>

<script>
import Main from './layouts/Main.vue'
import auth from '@/http/requests/auth/index.js'
export default {
  name: 'App',
  components: {
    Main
  }
  // async created () {
  //   auth.init()
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
