<template>
  <div id='app'>
    <header class="header">
      <router-link to="/">{{ title }}</router-link>
    </header>
    <router-view></router-view>
    <footer class="footer">
      Copyright © {{ (new Date()).getFullYear() }} |
      Powered by <a href="https://github.com/viko16/vue-ghpages-blog" target="_blank">vue-ghpages-blog</a>
    </footer>
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
