## 操作
在配置 vagrant 的时候发现一直同步不了，后来发现需要把静态文件缓存关掉才行

```
# Apache 配置添加:
EnableSendfile off
# Nginx 配置添加:
sendfile off;
```

## 参考
<http://rmingwang.com/vagrant-commands-and-config.html#3>