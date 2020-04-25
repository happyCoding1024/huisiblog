# updateIssueLog

开发过程中的学习笔记 [studyNote_React](studyNote.md)

## TodoList

- [ ] 点赞，评论
- [ ] 留言
- [ ] 阅读数统计
- [ ] 标签分类
- [ ] 文章分类
- [ ] 分页显示
- [ ] ...

## 2020年4月17日10:17:53（研究上线）

**Linux系统目录**

![Linux系统目录]( https://images.cnblogs.com/cnblogs_com/zhangguicheng/1618684/o_200417023053003-Linux的树形示意图.png)

Linux 系统中没有盘符的概念，只有一个根目录 `/`，所有的文件都在它下面。

Linux 系统是一个多用户的系统，在同一时间内可以有多个用户同时使用。例如在上面图片中的 `home` 目录下就有三个用户，每个用户又都有自己的文件目录，这样也就实现了多用户同时使用这个系统。windows 系统是一个单用户的系统，因为在 windows 中磁盘是所有用户共享的，并不会给某个用户单独的一个文件目录。

Linux 主要目录速查表

- `/`根目录，一般根目录只存放目录，在 Linux 下只有一个根目录，所有的文件都存放在根目录下。
- `/bin、/usr/bin` 可执行二进制文件的目录，如常用的命令：ls，mv，cd 等。  

- `/home` 存放用户的目录，每个用户都存在这个目录下。`~` 表示当前用户的家目录，`~edu` 表示的是用户 edu 的家目录
- `/etc` 用于保存系统配置文件的目录，不建议在此目录下存放可执行文件。

![1587092601938]( https://images.cnblogs.com/cnblogs_com/zhangguicheng/1618684/o_200417030420Linux目录速查表.png)

**Node安装**

```bash
node安装路径 /usr/local/src
```

**安装淘宝镜像**

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
//创建软链接
ln -s /usr/local/src/node-v0.10.18/bin/cnpm /usr/local/bin/cnpm
```

## 2020年4月17日19:01:46（域名和服务器备案）

服务器和域名在备案，要求服务器关闭，域名解析删除，等到备案成功之后再将项目上线。

## 2020年4月22日14:38:06（更改主页和登录界面样式）

主页：

![主页](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20200422144111.png)

登录页面：

![登录页面](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20200422144224.png)

## 2020年4月25日（更新键盘导航组件）

更新键盘导航组件至 v1.1.4 
