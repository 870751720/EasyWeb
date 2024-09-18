# EasyWeb

# 新服务器
1 在config.env 配置好主机ip,config.ts里面配置好api的ip
2 需要在github的Setting-Security-Secrets and Variables-Actions里面添加一个Repository SSH_PRIVATE_KEY的密钥,并且你的密钥变了这个也需要变,并且这个密钥新服务器也是用它
3 docker环境拉不下来的话,通过push tag docker*来执行
4 调用init_project的create_tables,注意把权限打开

# 转移额外需要做的事情
1 迁移数据库
2 迁移上传的资源

# 新UI
# 安装 Nvm
1
https://github.com/coreybutler/nvm-windows/releases ->Assets->nvm-setup.exe

2
nvm help can see all
nvm install 22.1.0
nvm use 22.1.0
3
npx create-react-app easy_react
