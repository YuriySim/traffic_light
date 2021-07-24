<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
  import Layout from '@/layouts/Layout.vue'

  export default {

    computed: {
      layout() {
        return this.$route.meta.layout || 'layout'
      }
    },

    components: {
      Layout,
    },
  }
</script>

<style lang="scss">
  @import './assets/style.css';
</style>
