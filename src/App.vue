<template>
  <div id="app">
    <SpellingBee/>
  </div>
</template>

<script>
import SpellingBee from './components/SpellingBee.vue'

export default {
  name: 'app',
  components: {
    SpellingBee
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
