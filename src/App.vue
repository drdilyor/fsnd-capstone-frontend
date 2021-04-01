<template>
  <div id="app">
    <app-header/>
    <router-view class="flex-grow-1"/>
    <app-footer/>
  </div>
</template>

<script>
import '@/assets/lib/bootstrap.min.css'
import '@/assets/scss/styles.scss'
export default {
  components: {
    AppHeader: require('@/components/AppHeader.vue').default,
    AppFooter: require('@/components/AppFooter.vue').default,
  }
}
</script>

<style>
html, body, #app {
  height: 100%;
}
#app {
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
