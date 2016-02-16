<template>

    <div class="post-view">

        <h1 id="title">
            {{ title | onlyTitle }}
            <span class="publish-date">{{ title | onlyPublishDate }}</span>
        </h1>

        <article
            class="post-content"
            v-html="content | marked"
            transition>
        </article>

    </div>

</template>

<script>

    import marked from 'marked';
    import hljs from 'highlight.js';
    import 'highlight.js/styles/github.css';

    marked.setOptions({
        breaks: true,
        highlight: (code) => hljs.highlightAuto(code).value
    });

    import store from '../store';
    import { onlyTitle, onlyPublishDate } from '../filters';

    import setting from '../setting';

    export default {

        name: 'PostView',

        filters: {
            marked,
            onlyTitle,
            onlyPublishDate
        },

        data () {
            return {
                title: '',
                content: 'Loading...'
            }
        },

        route: {
            data ({ to }) {
                const title = to.params.title;
                document.title = `${onlyTitle(title)} - ${setting.blogTitle}`;
                this.content = 'Loading...🐶🔫';

                return {
                    title,
                    content: store.getPost(title).then(content => content)
                }
            }
        }

    }

</script>

<style lang="less">

    .post-view {
        margin: 3rem 0;

        #title {
            line-height: 2;
            margin-bottom: 2rem;
        }

        p {
            line-height: 2rem;
            letter-spacing: 1px;
            word-wrap: break-word;
        }

        pre {
            border: 1px solid #e0e0e0;
            margin: 1.2rem -2px;
            padding: 15px 20px;
            font-size: 13px;
            font-family: Menlo,monospace;
            line-height: 2.2;
            display: block;
            overflow: auto;
            background: #fbfbfb;

            code {
                background: none;
            }
        }

        code {
            border: none;
            word-wrap: break-word;
            color: #d14;
            background-color: #f9f2f4;
        }

        blockquote {
            border-left: 4px solid #eee;
            margin: .8rem 0 1.6rem;
            padding-left: 1rem;
        }
    }

</style>