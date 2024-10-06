# EasyWeb

# 新工程

1 进入 install_win 执行 install.bat
2 vscode 安装推荐插件,并且项目 vscode 的配置用 .vscode 文件的

# 发布版本

1 push tag 上去即可

# 新服务器

1 需要在 github 的 Setting-Security-Secrets and Variables-Actions 里面添加一个 Repository SSH_PRIVATE_KEY 的密钥,并且你的密钥变了这个也需要变,并且这个密钥新服务器也是用它
2 进入 install_svr 执行 new_ip.bat,输入新 ip
3 docker 环境拉不下来的话,通过 push tag docker\*来执行
4 调用 init_project/create
5 git clone git@github.com:870751720/870751720.github.io.git 在 index.html 上把新 ip 替换了

# 迁移数据

需要保证 dokcer 先运行了
进入 install_svr
1 下载数据
执行 res_download.bat,获取命令行,在服务器执行
然后在 mobaxterm 上把 tmp 上的 backup.tar.gz 下载下来

2 上传数据
backup.tar.gz 上传到新服务器的 tmp
执行 res_upload.bat,获取命令行,在新服务器执行

# cocos 游戏框架

https://github.com/dgflash/oops-framework
