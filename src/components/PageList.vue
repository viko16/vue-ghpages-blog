<template>
  <section class="list-view">
    <div
      v-if="loading"
      class="loading">loading..</div>
    <div
      v-else-if="orderedList.length === 0"
      class="no-content">nothing..</div>
    <ol
      v-else
      class="list">
      <li
        v-for="{ title, sha, date } in orderedList"
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

    computed: {
      orderedList () {
        // Filter by title, Order by publish date, desc
        return this.lists
          .slice()
          .sort((itemA, itemB) => (new Date(itemB.date) - new Date(itemA.date)))
      }
    },

    watch: {
      '$route': 'loadList'
    },

    async mounted () {
      window.document.title = conf.blogTitle
      await this.loadList()
    },

    methods: {
      async loadList () {
        const { $route: { query } } = this
        this.loading = true
       
        this.lists = await (query.q ? api.searchFile : api.getList)(query.q)
          .catch(err => {
            this.loading = false
            // eslint-disable-next-line no-console
            return console.info('[loadList]', err)
          })
        
        this.loading = false
      }
    }

  }

</script>
