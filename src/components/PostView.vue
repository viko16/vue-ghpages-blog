<template>

    <div class="post-view">

        <h1 id="title">
            {{ title | onlyTitle }}
            <span>{{ title | onlyPublishDate }}</span>
        </h1>

        <article
            class="post-content"
            v-html="content | marked">
        </article>

    </div>

</template>

<script>

    import marked from 'marked';
    marked.setOptions({
        breaks: true
    });

    import store from '../store';
    import { onlyTitle, onlyPublishDate } from '../filters';

    import setting from '../setting';

    export default {

        name: 'PostView',

        filters: {
            marked: marked,
            onlyTitle: onlyTitle,
            onlyPublishDate: onlyPublishDate
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

<style>

    h1,
    h2,
    h3,
    h4 {
        font-weight: 400;
        color: #222;
    }

    h1 {
        line-height: 3;
        font-size: 1.8rem;
    }

    h2,
    h3 {
        line-height: 2.5rem;
        margin-top: 2.5rem;
    }

    h2 {
        font-size: 1.6rem;
    }

    h3 {
        font-size: 1.2rem;
    }

    ul,
    ol {
        line-height: 2.1;
        padding: 5px 25px;
    }

    ul li {
        padding: 0;
        margin: 0;
        line-height: 2.1rem;
    }

    a {
        color: #08c;
        overflow-wrap: break-word;
        word-break: break-all;
        text-decoration: none;
        padding: 0 .3rem;
    }

    a:hover {
        color: #e60900;
        text-decoration: underline;
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
        background: #F8F8F8;
    }

    code {
        border: none;
        word-wrap: break-word;
        color: #c7254e;
        background-color: #f9f2f4;
    }

    pre code {
        background: none;
    }

    blockquote {
        border-left: 4px solid #eee;
        margin: .8rem 0 1.6rem;
        padding-left: 1rem;
    }

    .post-view {
        margin: 4rem 0;
    }

    .post-view #title {
        line-height: 1;
        margin-bottom: 3rem;
    }

    .post-view #title span {
        float: right;
        font-size: .8rem;
        line-height: 2;
        vertical-align: middle;
    }

</style>