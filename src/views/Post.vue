<template>
  <div>
    <div v-if="!content">loading..</div>
    <article v-if="content" v-html="content"></article>
  </div>
</template>

<script>
  import api from '../api'

  export default {
    name: 'postView',

    data () {
      return {
        content: null
      }
    },

    created () {
      this.loadPost()
    },

    methods: {
      loadPost () {
        api.getDetail(this.$route.params.hash)
          .then(cnt => this.content = cnt)
          .catch(() => { /* TODO */ })
      }
    }
  }
</script>
