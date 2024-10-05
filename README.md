# EasyWeb

# 新工程
1 进入install_win执行install.bat

# 发布版本
1 push tag上去即可

# 新服务器
1 需要在github的Setting-Security-Secrets and Variables-Actions里面添加一个Repository SSH_PRIVATE_KEY的密钥,并且你的密钥变了这个也需要变,并且这个密钥新服务器也是用它
2 进入install_svr 执行new_ip.bat,输入新ip
3 docker环境拉不下来的话,通过push tag docker*来执行
4 调用init_project/create
5 git clone git@github.com:870751720/870751720.github.io.git 在index.html上把新ip替换了

# 迁移数据
需要保证dokcer先运行了
进入install_svr
1 下载数据
执行res_download.bat,获取命令行,在服务器执行
然后在mobaxterm上把 tmp 上的 backup.tar.gz 下载下来

2 上传数据
backup.tar.gz 上传到新服务器的 tmp
执行res_upload.bat,获取命令行,在新服务器执行

# cocos 游戏框架
https://github.com/dgflash/oops-framework