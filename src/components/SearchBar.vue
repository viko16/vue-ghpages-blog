<template>
  <input
    ref="searchBar"
    v-model="keyword"
    class="searchbar-input"
    placeholder="Search.."
    type="search"
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

    watch: {
      'keyword': 'updateQuery'
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
          this.$router.push({name: 'page-list', query: { q: this.keyword }})
        } else {
          this.$router.push({name: 'page-list', query: null})
        }
      }
    }

  }
</script>
