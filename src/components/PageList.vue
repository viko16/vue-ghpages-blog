<template>
  <section class="list-view">
    <div
      v-if="loading"
      class="loading">loading..</div>
    <div
      v-else-if="lists.length === 0"
      class="no-content">nothing..</div>
    <ol
      v-else
      class="list">
      <li
        v-for="{ title, sha, date } in lists"
        :key="sha"
        class="list-item">
        <router-link
          :to="'/post/' + sha"
          class="item-title">
          {{ title }}
        </router-link>
        <br>
        <time
          :datetime="date | formatDate"
          :title="date | formatDate"
          pubdate="pubdate"
          class="item-date">{{ date | timeago }}</time>
      </li>
    </ol>
  </section>
</template>

<script>
  import api from '../api'
  import conf from '../config'

  export default {

    data () {
      return {
        lists: [],
        loading: true
      }
    },

    watch: {
      '$route': 'getList'
    },

    mounted () {
      window.document.title = conf.blogTitle
      this.getList()
    },

    methods: {
      getList () {
        const { loadList, search, $route: { query } } = this
        if (query.q) {
          search(query.q)
        } else {
          loadList()
        }
      },

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
      },

      search (keyword) {
        this.loading = true
        api.searchFile(keyword)
          .then(lists => {
            // eslint-disable-next-line no-console
            console.log(lists)
            this.loading = false
            this.lists = lists
          })
      }
    }

  }

</script>
