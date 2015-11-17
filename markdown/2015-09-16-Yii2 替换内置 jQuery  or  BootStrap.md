修改 `config/web.php` 文件

```php
'components' => [ 
    'assetManager' => [
        'class' => 'yii\web\AssetManager',
        'bundles' => [
            'yii\web\JqueryAsset' => [
                'js' => [
                    YII_ENV_DEV ? 'js/jquery.js' : 'js/jquery.min.js'
                ]
            ],
            'yii\bootstrap\BootstrapPluginAsset' => [
                'js' => [
                    YII_ENV_DEV ? 'js/bootstrap.js' : 'js/bootstrap.min.js',
                ]
            ],
            'yii\bootstrap\BootstrapAsset' => [
                'css' => [
                    YII_ENV_DEV ? 'css/bootstrap.css' : 'css/bootstrap.min.css',
                ]
            ]

        ],
    ],
],
```