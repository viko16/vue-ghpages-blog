<template>
  <div id="app">
    <header class="header">
      <router-link to="/">{{ title }}</router-link>
      <div style="clear: both"/>
      <search-bar v-if="isPageList"/>
    </header>
    <router-view/>
    <footer-bar/>
  </div>
</template>

<style lang="stylus" src="./style/index.styl"></style>

<script>
  import conf from './config'
  import footerBar from './components/footerBar.vue'
  import searchBar from './components/searchBar.vue'

  export default {
    name: 'App',

    components: {
      footerBar,
      searchBar
    },

    data () {
      return {
        title: conf.blogTitle
      }
    },

    computed: {
      isPageList () {
        return this.$route.name === 'list'
      }
    }

  }
</script>
