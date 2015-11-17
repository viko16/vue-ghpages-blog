## 最新版
目前是 v5.0，project_name 改为你要的目录名就好
`composer create-project laravel/laravel project_name --prefer-dist`

## 特定版本
v4.2
`composer create-project "laravel/laravel:4.2.*" project_name --prefer-dist`
v4.1
`composer create-project "laravel/laravel:4.1.*" project_name --prefer-dist`

## 小技巧
- 如果有权限问题，在前面加 `sudo`
- 加上参数`-vvv`会有详细日志，再也不用以为卡死啦

## 必装扩展 (以4.x 版本作例子)
- [laravel-ide-helper](https://github.com/barryvdh/laravel-ide-helper)
> - 执行 `composer require barryvdh/laravel-ide-helper:~1.11`
> - 在 `app/config/app.php` 增加 `'Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider',`
> - 执行 `php artisan clear-compiled`
> - 执行 `php artisan ide-helper:generate`
> - 执行 `php artisan optimize`

- [laravel-debugbar](https://github.com/barryvdh/laravel-debugbar)
> - 执行 `composer require barryvdh/laravel-debugbar:~1.8`
> - 在 `app/config/app.php` 增加 `'Barryvdh\Debugbar\ServiceProvider',`

- [laravel4-sae](https://github.com/chariothy/laravel4-sae)
> - `composer require chariothy/laravel4-sae dev-master`
> - 在 `app/config/app.php` 增加 `'Chariothy\SaeServiceProvider',` 和 `'SAE' => 'Chariothy\SaeFacade',`
> - 执行 `php artisan sae`
