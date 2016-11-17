# vue-ghpages-blog

[![Join the chat at https://gitter.im/viko16/vue-ghpages-blog](https://badges.gitter.im/viko16/vue-ghpages-blog.svg)](https://gitter.im/viko16/vue-ghpages-blog?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![GitHub release](https://img.shields.io/github/release/viko16/vue-ghpages-blog.svg?style=flat)](https://github.com/viko16/vue-ghpages-blog/releases/latest)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

A blog based on GitHub pages by Vue.js 2 + Webpack 2.

一个依赖 GitHub Pages，无需本地生成的静态博客，使用了 Vue.js 2 组件开发，Webpack 2 打包。

![Post Screenshots](https://cloud.githubusercontent.com/assets/5064777/19349059/a815395c-9183-11e6-97c3-56514acf0f1d.png)

## Work in process

This is the new version of vue-ghpages-blog.

For the Vue 1.x version, please see the [vue-1 branch](https://github.com/viko16/vue-ghpages-blog/tree/vue-1). 

新版本尚在开发中，请移步 [vue-1 分支](https://github.com/viko16/vue-ghpages-blog/tree/vue-1)。

## Features

- Vue 2 / Vue-router / axios
- Webpack 2 / Babel 6 / Stylus
- No need to generate locally ( now using [TravisCI](https://travis-ci.org) )
- Hosting on GitHub Pages
- SessionStorage cache

## Demo

http://ukn.me

## Develop

**Note:** `src/conf.json` points the configuration of my personal blog. **If you fork this repository, modify it first.**  😳

```bash
# Install dependencies
npm install
# Develop with hot reload
npm run dev
# Lint and Test
npm run test
```

## About My Workflow
- All the posts store in [viko16/writings](https://github.com/viko16/writings), while [`src/conf.json`](src/conf.json) points it.
- When I push the code to develop branch, [TravisCI](.travis.yml) will deploy `gh-pages` automatically.

## License

MIT © [viko16](https://github.com/viko16)
