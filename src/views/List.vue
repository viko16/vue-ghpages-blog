<template>
  <div>
    <div v-if="!items">loading..</div>
    <ol v-if="items">
      <li v-for="item in items">
        <router-link :to="'/post/' + item.sha">{{ item.name }}</router-link>
      </li>
    </ol>
  </div>
</template>

<script>
  import api from '../api'

  export default {
    name: 'listView',

    data () {
      return {
        items: null
      }
    },

    created () {
      this.loadList()
    },

    methods: {
      loadList () {
        api.getList()
          .then(items => this.items = items)
          .catch(() => { /* TODO */ })
      }
    },

    watch: {
      '$route': 'loadList'
    }

  }
</script>
