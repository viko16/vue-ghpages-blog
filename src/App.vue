<template>
  <div id='app'>
    <header class="header">
      <router-link to="/">{{ title }}</router-link>
      <div style="clear: both"></div>
      <input tag="h1" to="/" class="search-bar" v-model="keyword" @keyup.esc="resetSearch" onclick="this.select()">
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
        title: conf.blogTitle,
        keyword: ''
      }
    },
    methods: {
      resetSearch: function () {
        this.keyword = ''
        document.getElementsByClassName('search-bar')[0].blur()
      }
    },
    watch: {
      'keyword': function () {
        this.$router.push({name: 'list', query: {'keyword': this.keyword === this.title ? '' : this.keyword}})
      }
    }
  }
</script>
