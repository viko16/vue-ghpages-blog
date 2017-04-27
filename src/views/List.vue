<template>
  <section class="list-view">
    <div class="loading" v-if="loading">loading..</div>
    <div class="no-content" v-if="!filteredList.length">nothing..</div>
    <ol v-if="!!filteredList.length" class="list">
      <li v-for="{ title, sha, date } in filteredList" :key="sha" class="list-item">
        <router-link :to="'/post/' + sha" class="item-title">
          {{ title }}
        </router-link>
        <br>
        <time pubdate="pubdate" :datetime="date | formatDate" :title="date | formatDate" class="item-date">{{ date | timeago }}</time>
      </li>
    </ol>
  </section>
</template>

<script>
  import api from '../api'
  import conf from '../config'

  export default {
    name: 'listView',

    data () {
      return {
        lists: [],
        loading: false
      }
    },

    computed: {
      filteredList () {
        let keyword = (this.$route.query.q || '').toLowerCase()
        // Filter by title, Order by publish date, desc
        return this.lists
          .filter(item => (item.title.toLowerCase().indexOf(keyword) !== -1))
          .sort((itemA, itemB) => (new Date(itemB.date) - new Date(itemA.date)))
      }
    },

    created () {
      this.loadList()
    },

    methods: {
      loadList () {
        this.loading = true
        window.document.title = conf.blogTitle
        api.getList()
          .then(lists => {
            this.lists = lists
            this.loading = false
          })
          .catch(err => {
            this.loading = false
            console.error(err)
          })
      }
    },

    watch: {
      '$route': 'loadList'
    }

  }
</script>
