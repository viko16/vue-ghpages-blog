<template>

    <div class="post-view">

        <h1 id="title">
            {{ title | onlyTitle }}
            <span class="publish-date">{{ title | onlyPublishDate }}</span>
        </h1>

        <article
            class="post-content"
            v-html="content"
            transition>
        </article>

    </div>

</template>

<script>

    import store from '../store';
    import { onlyTitle, onlyPublishDate } from '../filters';

    import setting from '../setting';

    export default {

        name: 'PostView',

        filters: {
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
        },

        watch: {
            'content'() {
                // Load the external link into new tab
                let linksArray = Array.from(document.querySelectorAll('a'));
                const currentHost = window.location.host;
                linksArray.forEach(el => {
                    if (el.href && el.host !== currentHost)
                        el.target = '_blank'
                });
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
            font-family: Menlo, monospace;
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
            color: #BD4D69;
            background-color: #f9f2f4;
        }

        blockquote {
            border-left: 4px solid #eee;
            margin: .8rem 0 1.6rem;
            padding-left: 1rem;
        }
    }

    .highlight {

        // Style from GitHub
        .pl-c {
            color: #969896
        }

        .pl-c1,.pl-s .pl-v {
            color: #0086b3
        }

        .pl-e,.pl-en {
            color: #795da3
        }

        .pl-s .pl-s1,.pl-smi {
            color: #333
        }

        .pl-ent {
            color: #63a35c
        }

        .pl-k {
            color: #a71d5d
        }

        .pl-pds,.pl-s,.pl-s .pl-pse .pl-s1,.pl-sr,.pl-sr .pl-cce,.pl-sr .pl-sra,.pl-sr .pl-sre {
            color: #183691
        }

        .pl-v {
            color: #ed6a43
        }

        .pl-id {
            color: #b52a1d
        }

        .pl-ii {
            background-color: #b52a1d;
            color: #f8f8f8
        }

        .pl-sr .pl-cce {
            color: #63a35c;
            font-weight: bold
        }

        .pl-ml {
            color: #693a17
        }

        .pl-mh,.pl-mh .pl-en,.pl-ms {
            color: #1d3e81;
            font-weight: bold
        }

        .pl-mq {
            color: #008080
        }

        .pl-mi {
            color: #333;
            font-style: italic
        }

        .pl-mb {
            color: #333;
            font-weight: bold
        }

        .pl-md {
            background-color: #ffecec;
            color: #bd2c00
        }

        .pl-mi1 {
            background-color: #eaffea;
            color: #55a532
        }

        .pl-mdr {
            color: #795da3;
            font-weight: bold
        }

        .pl-mo {
            color: #1d3e81
        }

    }

    .anchor {
        display: none;
    }

</style>
