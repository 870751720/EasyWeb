# EasyWeb

# 新工程
1 进入install_win执行install.bat

# 发布版本
1 push tag上去即可

# 新服务器
1 需要在github的Setting-Security-Secrets and Variables-Actions里面添加一个Repository SSH_PRIVATE_KEY的密钥,并且你的密钥变了这个也需要变,并且这个密钥新服务器也是用它
1 在config.env 配置好主机ip,config.ts里面配置好api的ip

3 docker环境拉不下来的话,通过push tag docker*来执行
4 调用init_project/create

# 转移额外需要做的事情
1 迁移数据库
2 迁移上传的资源
