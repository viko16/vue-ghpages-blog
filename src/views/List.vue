<template>
  <section class="list-view">
    <div v-if="!lists">loading..</div>
    <ol v-if="lists" class="list">
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
  import conf from '../conf.json'

  export default {
    name: 'listView',

    data () {
      return {
        lists: null
      }
    },

    computed: {
      filteredList () {
        let keyword = (this.$route.query.keyword || '').toLowerCase()
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
        window.document.title = conf.blogTitle
        api.getList()
          .then(lists => {
            this.lists = lists
          })
          .catch(err => { console.error(err) })
      }
    },

    watch: {
      '$route': 'loadList'
    }

  }
</script>
