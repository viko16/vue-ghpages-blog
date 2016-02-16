## 问题

换了台新机，要把之前的 vagrant 迁移过来，兴高采烈的 `vagrant package` 打包，AirDrop 迁移到新机导入后，却发现启动时卡在 ssh 阶段，具体是这样的：

```bash
 default: Warning: Connection timeout. Retrying...
 default: Warning: Authentication failure. Retrying...
 default: Warning: Authentication failure. Retrying..
```

## 原因
搜了半天，找到大概的原因在于 vagrant 读取 `~/.vagrant.d/insecure_private_key` ，然而这个私钥又读取有问题。。。

## 解决
1. `vagrant init xxx` 之后先修改 Vagrantfile 配置项 `config.ssh.insert_key = false`
2. 然后才开启 `vagrant up`
3. 如果还是遇到错误，不管它，用正常方式 ssh 进去，帐号密码都是 vagrant，端口是 2222
4. 在 vagrant 内执行以下几句：
```bash
wget https://raw.githubusercontent.com/mitchellh/vagrant/master/keys/vagrant.pub -O .ssh/authorized_keys
chmod 700 .ssh
chmod 600 .ssh/authorized_keys
chown -R vagrant:vagrant .ssh
```
5. 退回宿主机，`vagrant reload`
6. 搞定

## 其他方法
有部分说，`vagrant package` 之前先 `rm /etc/udev/rules.d/70-persistent-net.rule`，以便排除网卡配置的干扰，不知可行性如何

## 参考
- <https://github.com/mitchellh/vagrant/issues/5186#issuecomment-77681605> （可行√）
- <http://comments.gmane.org/gmane.comp.tools.vagrant/5209>