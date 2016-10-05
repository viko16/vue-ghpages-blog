<template>
  <section class="post-view">
    <div v-if="!content">loading..</div>
    <h1 class="post-title">
      {{ title }}
      <time pubdate="pubdate" :datetime="this.date" class="post-date">{{ this.date | timeago }}</time>
    </h1>
    <article v-if="content" v-html="htmlFromMarkdown"></article>
  </section>
</template>

<script>
  import Vue from 'vue'
  import api from '../api'
  import conf from '../conf.json'
  import marked from 'marked'
  import hljs from 'highlight.js'
  import fm from 'front-matter'

  marked.setOptions({
    highlight(code) {
      return hljs.highlightAuto(code).value
    },
    breaks: true,
    gfm: true
  })

  export default {
    name: 'postView',

    data () {
      return {
        title: '',
        date: null,
        content: '',
      }
    },

    computed: {
      htmlFromMarkdown() {
        return marked(fm(this.content).body)
      }
    },

    created () {
      this.loadPost()
    },

    methods: {
      loadPost () {
        api.getDetail(this.$route.params.hash)
          .then(text => {
            // parse front-matter
            // https://github.com/jxson/front-matter#fmstring
            const content = fm(text)
            this.content = content.body
            this.title = content.attributes.title
            this.date = content.attributes.date
            // set window title
            window.document.title = `${this.title} - ${conf.blogTitle}`
          })
          .catch(() => { /* TODO */ })
      },

      newTab() {
        Vue.nextTick(function () {
          // Load the external link into new tab
          const linksArray = Array.from(document.querySelectorAll('a'))
          const currentHost = window.location.host
          linksArray.forEach(el => {
            if (el.href && el.host !== currentHost)
              el.target = '_blank'
              // https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
              el.rel = 'noopener noreferrer'
          })
        })
      }
    },

    watch: {
      'htmlFromMarkdown': 'newTab'
    }
  }
</script>
