<template>
  <div id='app'>
    <header class="header">
      <router-link to="/">{{ title }}</router-link>
    </header>
    <router-view></router-view>
  </div>
</template>

<style lang="stylus" src="./style/index.styl"></style>

<script>
  import conf from './conf.json'

  export default {
    data () {
      return {
        title: conf.blogTitle
      }
    }
  }
</script>
