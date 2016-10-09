<template>
  <section class="list-view">
    <div v-if="!lists">loading..</div>
    <ol v-if="lists" class="list">
      <li v-for="item in orderedList" class="list-item">
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
      orderedList () {
        // Order by publish date, desc
        return this.lists.sort((a, b) => (new Date(b.date) - new Date(a.date)))
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
          .catch(() => { /* TODO */ })
      }
    },

    watch: {
      '$route': 'loadList'
    }

  }
</script>
