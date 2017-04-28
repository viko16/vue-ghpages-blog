<template>
  <input
  class="searchbar-input"
  placeholder="Search.."
  type="search"
  ref="searchBar"
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

    created () {
      this.keyword = this.$route.query.q || ''
    },

    methods: {
      resetSearch () {
        this.keyword = ''
        this.$refs.searchBar.blur()
      },
      selectSearchText () {
        this.$refs.searchBar.select()
      },
      updateQuery () {
        if (this.keyword) {
          this.$router.push({name: 'list', query: { q: this.keyword }})
        } else {
          this.$router.push({name: 'list', query: null})
        }
      }
    },

    watch: {
      'keyword': 'updateQuery'
    }

  }
</script>
