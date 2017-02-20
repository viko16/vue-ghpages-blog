<template>
  <input class="search-bar"
        placeholder="Search.."
        ref="searchBar"
        v-show="isPageList"
        v-model="keyword"
        @click="selectSearchText"
        @keyup.esc="resetSearch">
</template>

<script>
  export default {
    data () {
      return {
        keyword: ''
      }
    },
    computed: {
      isPageList () {
        return this.$route.name === 'list'
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
