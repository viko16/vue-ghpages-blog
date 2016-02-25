> 是的没错，交给 GitHub 的 Api 去处理，而且还很简单…

## 想法

GitHub 的 `.md` 文件都可以在线预览，是因为 GitHub 已经把它们转换成为 HTML 了，而且还配上不错的样式。那么既然本博客是直接读取 GitHub Api 获取文章，那是否能直接拿到转换后的 HTML 呢？



## 旧方法 - 浏览器端渲染

之前的获取方式是获取了 Markdown 的 raw 形式，然后使用 JavaScript 在浏览器端进行渲染和代码高亮着色的：

- [marked](https://www.npmjs.com/package/marked) — 转换 md 为 html
- [highlight.js](https://www.npmjs.com/package/highlight.js) — 代码高亮和着色



## 新方法 - 让 GitHub 渲染

后来查阅了 Api 文档，发现其实只需要增加一段 http 请求头就可以了，文档里称为 `Media Types`，例子如下：

```javascript
xhr.setRequestHeader("Accept", "application/vnd.github.v3.html")
```

这样就可以让 GitHub Api 返回 HTML 而不是 raw 形式的 Markdown 文本了，省了浏览器端转换的一步，打包出来体积也小了很多。



## 代码高亮着色

GitHub 返回的 HTML 已经带有各种 class 了，我们只需要给各种 class 增加对应的样式就好。

```css
/* Style from GitHub */
.pl-c {
    color: #969896
}
.pl-c1, .pl-s .pl-v {
    color: #0086b3
}
.pl-e, .pl-en {
    color: #795da3
}
.pl-s .pl-s1, .pl-smi {
    color: #333
}
.pl-ent {
    color: #63a35c
}
.pl-k {
    color: #a71d5d
}
.pl-pds, .pl-s, .pl-s .pl-pse .pl-s1, .pl-sr, .pl-sr .pl-cce, .pl-sr .pl-sra, .pl-sr .pl-sre {
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
.pl-mh, .pl-mh .pl-en, .pl-ms {
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
```


## 参考

- <https://developer.github.com/v3/media/#html>
- <https://developer.github.com/v3/repos/#get>
- `https://api.github.com/repos/:owner/:repo/contents/{+path}`

