## 缘由

大概从几年前就开始用 [Typecho](http://typecho.org/) ，从上一年开始挂在 SAE 上，由于 SAE 的各种不稳定，所以很早就考虑将博客迁移了。

这次直接一口气自己 [写了一只](https://github.com/viko16/vue-ghpages-blog) 挂在 GitHub Pages 上，所以得考虑下文章怎么方便的迁出。


## 步骤

1. 从 Typecho 的数据库读取
2. 分别写到 `.md` 文件 （噢好简单..


## 分析

Typecho 从 0.9 开始原生支持 Markdown 编辑器，所以我一直以来都是用 md 来写自己的博客。

看了 Typehco 的数据库和源码，发现在 `contents` 表下面 `text` 字段中 md 格式都是用 `<!--markdown-->` 来作标识的，所以直接脚本写起。

需要注意的地方是输出文件之前记得把 title 中的特殊字符替换走，比如 `/`。


## 脚本

<https://gist.github.com/viko16/6b6a973d8f285d74a951>
