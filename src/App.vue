<template>
  <div id="app">
    <app-header/>
    <router-view/>
  </div>
</template>

<script>
import '@/assets/lib/bootstrap.min.css'
export default {
  components: {
    AppHeader: require('@/components/AppHeader.vue').default,
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
