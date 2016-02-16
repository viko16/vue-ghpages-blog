因为安全性问题， Yii2 的 Gii 默认只能本地访问（localhost / 127.0.0.1 / ::1）。

由于环境都在 vagrant，我只能配置为允许远程访问，将我的 IP 加入白名单。

官方文档上是这样写的：

> config/web.php
```php
'gii' => [
    'class' => 'yii\gii\Module',
    'allowedIPs' => ['127.0.0.1', '::1', '192.168.33.*']
],
```

然而会报错，经测试可以这样写：

```php
// $config['modules']['gii'] = 'yii\gii\Module';
    $config['modules']['gii'] = [
        'class' => 'yii\gii\Module',
        'allowedIPs' => ['127.0.0.1', '::1', '192.168.33.*']
    ];
```

> 即把 `if (YII_ENV_DEV) { }` 内的 `$config['modules']['gii'] = 'yii\gii\Module'` 重写。

实测有效。


## 参考
<http://stackoverflow.com/a/29683092/4501478>
<http://www.yiiframework.com/doc-2.0/guide-tool-gii.html>