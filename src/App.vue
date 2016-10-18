<template>
  <div id='app'>
    <header class="header">
      <input tag="h1" to="/" class="title search-bar" v-model="keyword" @keyup="goToSearch" onclick="this.select()">
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
        title: conf.blogTitle,
        keyword: ''
      }
    },
    mounted () {
      this.keyword = !this.$route.query.keyword || this.$route.query.keyword === this.title ? this.title : this.$route.query.keyword
    },
    methods: {
      goToSearch: function () {
        this.$router.push({name: 'list', query: {'keyword': this.keyword === this.title ? '' : this.keyword}})
      }
    }
  }
</script>
