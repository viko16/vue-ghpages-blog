## 安装 Vagrant && VirtualBox
- <https://www.vagrantup.com/downloads.html>
- <https://www.virtualbox.org/wiki/Downloads>

## 下载 Vagrant box
`vagrant init ubuntu/trusty64`

然后编辑 Vagrantfile，按照 [GitLab的需求](http://doc.gitlab.com/ce/install/requirements.html) 调整一下虚拟鸡配置：（若不调整，GitLab 会报500 ¬_¬）

```
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  
  config.vm.box = "ubuntu/trusty64"

  config.vm.network "public_network"

  config.vm.provider "virtualbox" do |vb|
  
    vb.memory = "1024"
    vb.cpus = 2
  end
  
end
```

## 安装 GitLab
<https://about.gitlab.com/downloads/>

## 其他
- 我安装的是 GitLab CE Omnibus package，也就是一键安装包
- 系统版本为 Ubuntu 14.04 [下载地址](https://atlas.hashicorp.com/ubuntu/boxes/trusty64)
- gitlab 源码的路径在：`/opt/gitlab/embedded/service/gitlab-rails/`
