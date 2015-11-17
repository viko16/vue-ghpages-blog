## 跳坑与出坑
上网查了 N 久，发现其实就是 Gitlab 一键包的运行 Postgresql 用户有点不一样。。。

1. `su - gitlab-psql` （ps.我懒得找这个用户的密码，所以直接 `sudo su - gitlab-psql`）
2. `psql gitlabhq_production`

连上后，跑语句就好。

## 修改认证方式
由于默认只能以 Postgresql 所在主机上的 Linux 系统账号访问数据库，所以默认没法远程访问的。
若想修改，看下面一篇博文 + 官方文档~

## 附 Postgresql 简单操作语句
> 查看所有库：\l
查看所有表： \dt
查看某个表的结构： \d 表名

## 参考
<http://liguanglei.name/blogs/2014/08/07/access-control-for-gitlab-bundled-postgresql/>
<https://gitlab.com/gitlab-org/omnibus-gitlab/blob/master/doc/settings/database.md>