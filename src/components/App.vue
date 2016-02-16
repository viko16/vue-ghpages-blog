<template>

    <div>
        <!-- header -->
        <header>
            <h1><a v-link="{ path: '/home' }">{{ $route.setting.blogTitle }}</a></h1>
        </header>

        <!-- main -->
        <router-view
            class="view"
            keep-alive
            transition
            transition-mode="out-in">
        </router-view>

        <footer>
            Copyright © {{ (new Date()).getFullYear() }} /
            Powered by <a href="https://github.com/viko16/vue-ghpages-blog" target="_blank">vue-ghpages-blog</a> /
            Author <a href="https://github.com/viko16" target="_blank">viko16</a>
        </footer>
    </div>

</template>

<style lang="less">

    body {
        font-family: "PT Sans","Helvetica Neue",Helvetica,"Hiragino Sans GB","STHeitiSC-Light","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        font-size: 16px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: none;
        color: #555;
        max-width: 820px;
        margin: 0 auto;
        padding: 18px;
    }

    header {
        border-bottom: 1px solid #eee;

        h1 {
            line-height: 2;
        }

        a {
            &, &:link, &:visited, &:active, &.focus {
                color: #222;
            }
            &:hover {
                color: #08c;
                text-decoration: none;
            }
        }
    }

    footer {
        text-align: center;
        font-size: .8rem;
        border-top: 1px solid #eee;
        padding-top: 1.5rem;
    }

    .v-transition {
        transition: opacity .2s ease;
    }

    .v-enter, .v-leave {
        opacity: 0;
    }

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

        &:hover, &:active {
            color: #e60900;
            text-decoration: underline;
        }
    }

    .publish-date {
        float: right;
        font-size: .8rem;
        line-height: 4;
        vertical-align: middle;
    }

</style>