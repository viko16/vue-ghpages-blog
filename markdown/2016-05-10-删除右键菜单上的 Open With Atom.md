> 在 Windows 下安装过 Atom，卸载后发现右键菜单里还有 "Open With Atom" 的项，打开注册表干掉它，记录一下..

## 步骤
1. 运行"regedit"
1. 找到 HKEY_CLASSES_ROOT\Directory\Background\shell\Atom
1. 整个文件夹删掉，即时生效

## 参考
- <https://discuss.atom.io/t/uninstall-on-windows-leaves-context-menu-items/12818/3>
