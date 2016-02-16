### 代码

``` bash
cd /usr/local/bin
mv php php-bak
mv mysql mysql-bak
ln -s /Applications/MAMP/bin/php/php5.5.10/bin/php /usr/local/bin/php
ln -s /Applications/MAMP/Library/bin/mysql /usr/local/bin/mysql
ln -s /Applications/MAMP/tmp/mysql/mysql.sock /tmp/mysql.sock
```

其中 MAMP 目录自行调整

### 掉过的坑

- 最后一句要加上，不然会报错 `Can't connect to local MySQL server through socket '/tmp/mysql.sock'`
- 替换前 `which php` & `which mysql` 查看具体位置
- 替换后 `php -v` & `mysql -V` 查看版本号是否正确

### 参考

- <http://segmentfault.com/q/1010000000719202/a-1020000000719560>
- <http://www.aschroder.com/2009/03/how-to-use-the-mamp-mysql-command-line-client-in-a-terminal/>