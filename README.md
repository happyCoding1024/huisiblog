# 慧思博客_前端

<div align=center>
  <img src="https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/huisiBrand200_Github.png" style="margin-right:20px;"/>
</div>

## 介绍

> 慧思：智慧和思考，特意去百度搜了一遍，发现没有用这个名字的，虽然听起来没有那么高雅，但寓意好呀。

慧思博客_前端是慧思个人博客的前端部分，采用 react 技术栈编写，后端使用 Node.js 编写，实现的功能前后端已经进行了联调测试。

慧思博客主页

![慧思博客项目主页](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/Github慧思博客主页照片900_400.png)

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


## UpdateLog & IssueLog

记录新增的功能，修正的 bug，解决问题的方法，TodoList，开发感悟等。

[updateIssueLog](doc/dev/updateIssueLog.md)

## 联系作者

如果您发现此项目有任何问题，希望可以抽时间告诉作者，感谢您的贡献，非常感谢。

如果您感觉此项目还可以，欢迎 star 鼓励一下作者，非常感谢。

联系方式：

- 在 [github issues](https://github.com/happyCoding1024/huisiblog/issues) 提交问题

- [博客园 codingOrange](https://www.cnblogs.com/zhangguicheng/)

- [b站直播前端学习，一起来学习吧(一天12小时以上)](https://space.bilibili.com/421338049)



