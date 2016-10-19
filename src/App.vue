<template>
  <div id='app'>
    <header class="header">
      <router-link to="/">{{ title }}</router-link>
      <div style="clear: both"></div>
      <input class="search-bar" placeholder="Search.."
        ref="searchBar" v-model="keyword"
        @click="selectSearchText"
        @keyup.esc="resetSearch">
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
      resetSearch () {
        this.keyword = ''
        this.$refs.searchBar.blur()
      },
      selectSearchText () {
        this.$refs.searchBar.select()
      }
    },
    watch: {
      'keyword' () {
        if (this.keyword) {
          this.$router.push({name: 'list', query: { keyword: this.keyword }})
        } else {
          this.$router.push({name: 'list'})
        }
      }
    }
  }
</script>
