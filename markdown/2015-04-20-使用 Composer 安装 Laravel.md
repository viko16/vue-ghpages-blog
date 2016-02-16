## 最新版
目前是 v5.2，project_name 改为你要的目录名就好
```bash
composer create-project laravel/laravel project_name --prefer-dist -vvv
```

## 特定版本
v5.1
```bash
composer create-project laravel/laravel project_name "5.1.*" --prefer-dist -vvv
```

## 小技巧
- 如果有权限问题，在前面加 `sudo`
- 加上参数`-vvv`会有详细日志，再也不用以为卡死啦

## 常用扩展
- [laravel-ide-helper](https://github.com/barryvdh/laravel-ide-helper)
> - 执行 `composer require barryvdh/laravel-ide-helper`
> - 在 `config/app.php` 增加 `Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider::class,`
> - 执行 `php artisan ide-helper:generate`

- [laravel-debugbar](https://github.com/barryvdh/laravel-debugbar)
> - 执行 `composer require barryvdh/laravel-debugbar`
> - 在 `config/app.php` 增加 `Barryvdh\Debugbar\ServiceProvider::class,`


