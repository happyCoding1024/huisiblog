# 慧思博客_前端

## 介绍

慧思博客_前端是学习 React 过程中做的一个简化的博客系统，后端使用 Node 编写，实现的功能前后端已经进行了联调测试。


慧思博客主页(2020.04.09)

![慧思博客项目主页](https://images.cnblogs.com/cnblogs_com/zhangguicheng/1682690/o_200410070834慧思博客主页_900_400Github用.png)

## 项目运行

### 前端

> 只能展示部分功能，因为需要用到后端的数据

1）将 huisiblog 仓库 clone 到本地

2）进入 huisiblog 目录打开命令行窗口，运行 `npm install` 安装依赖。（注意命令行窗口的地址必须是 huisiblog 目录，window 用户在进入 huisiblog 目录后，按住 shift 右键在弹出的对话框中选择在此处打开命令行窗口即可）

3）依赖安装完成后，接着运行 `npm run start` 即可。

### 前后端联调

1）将 huisiblog 和 huisi_node 两个仓库 clone 到本地

2）进入 huisiblog 目录打开命令行窗口，运行 `npm install` 安装依赖。

3）进入 huisi_node 目录按住 shift 点击鼠标右键选择在此处打开命令行窗口运行 `npm run start` 

4）启动 Redis

进入 huisiblog/public/Redis 目录按住 shift 点击鼠标右键选择在此处打开命令行窗口，运行 `redis-server`（注：我的电脑是 win7 64bit，如果不能正常运行可参考  [Redis安装使用教程](https://www.runoob.com/redis/redis-install.html) 自行安装）

5）启动 nginx

进入 huisiblog/public/nginx 目录按住 shift 点击鼠标右键选择在此处打开命令行窗口，然后运行 `nginx` 即可）

6）启动 MySQL

如果没有安装 MySQL，可以参考 [MySQL安装使用教程]( https://blog.csdn.net/bobo553443/article/details/81383194 ) 自行安装，安装完 MySQL 之后再安装 MySQL workbench。打开 MySQL workbench 之后，点击如图所示的加号建立连接。

![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/慧思博客项目数据库连接1.png)

然后再按下图填写信息。

![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/慧思博客项目数据库连接.png)

然后再点击 OK 即可。

8）进入 huisi_node 目录打开命令行窗口，运行 `npm install` 安装依赖。

9）进入 huisi_node 目录按住 shift 点击鼠标右键选择在此处打开命令行窗口运行 `npm run dev`

10）最后，在浏览器中输入 localhost:8080 即可展示博客主页。

## 技术栈

- react + redux + react-redux

- redux-thunk

- immutable.js, redux-immutable

- axios

- antd

- styled-components

- react-router-dom

- react-transition-group

## 功能描述

- [x] 登录，注册（只支持用户名和密码这种简单的方式）
- [x] 新增博客（支持 Markdown）
- [x] 个人主页
- [x] 文章列表
- [x] 文章详情
- [x] 删除博客
- [x] 更新博客
- [x] 音乐播放
- [x] 键盘导航
- [x] 回到顶部

## TodoList

- [ ] 点赞，评论
- [ ] 留言
- [ ] 阅读数统计
- [ ] 标签分类
- [ ] 文章分类
- [ ] 分页显示
- [ ] ...

## UpdateLog & IssueLog

[updateIssueLog](doc/dev/updateIssueLog.md)





