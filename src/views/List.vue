<template>
  <section class="list-view">
    <div v-if="!lists">loading..</div>
    <ol v-if="lists" class="list">
      <li v-for="item in filteredList" class="list-item">
        <router-link :to="'/post/' + item.sha" class="item-title">
          {{ item.title }}
        </router-link>
        <br>
        <time pubdate="pubdate" :datetime="item.date" class="item-date">{{ item.date | timeago }}</time>
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
