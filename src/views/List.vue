<template>
  <section class="list-view">
    <div
      class="loading"
      v-if="loading">loading..</div>
    <div
      class="no-content"
      v-else-if="filteredList.length === 0">nothing..</div>
    <ol
      v-else
      class="list">
      <li
        v-for="{ title, sha, date } in filteredList"
        :key="sha"
        class="list-item">
        <router-link
          :to="'/post/' + sha"
          class="item-title">
          {{ title }}
        </router-link>
        <br>
        <time
          pubdate="pubdate"
          :datetime="date | formatDate"
          :title="date | formatDate"
          class="item-date">{{ date | timeago }}</time>
      </li>
    </ol>
  </section>
</template>

<script>
  import api from '../api'
  import conf from '../config'

  export default {
    name: 'ListView',

    data () {
      return {
        lists: [],
        loading: true
      }
    },

    computed: {
      filteredList () {
        let keyword = ''
        if (this.$route) {
          keyword = (this.$route.query.q || '').toLowerCase()
        }
        // Filter by title, Order by publish date, desc
        return this.lists
          .filter(item => (item.title.toLowerCase().indexOf(keyword) !== -1))
          .sort((itemA, itemB) => (new Date(itemB.date) - new Date(itemA.date)))
      }
    },

    watch: {
      '$route': 'loadList'
    },

    mounted () {
      window.document.title = conf.blogTitle
      this.loadList()
    },

    methods: {
      loadList () {
        this.loading = true
        api.getList()
          .then(lists => {
            this.loading = false
            this.lists = lists
          }, err => {
            this.loading = false
            // eslint-disable-next-line no-console
            console.info('[getList]', err)
          })
      }
    }

  }

</script>
