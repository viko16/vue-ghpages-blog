<template>

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

</template>

<style>
    html, body {
        font-family: "PT Sans","Helvetica Neue",Helvetica,"Hiragino Sans GB","STHeitiSC-Light","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        font-size: 14px;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: none;
        color: #555;
        max-width: 820px;
        margin: 0 auto;
        padding: 18px;
    }

    header {
        border-bottom: 1px solid #eee;
    }

    header h1 {
        line-height: 2;
    }

    header a {
        color: #222;
    }

    header a:visited {
        color: #222;
    }

    header a:hover {
        color: #08c;
        text-decoration: none;
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

</style>