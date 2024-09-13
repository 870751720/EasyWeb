# EasyWeb

# 新服务器
1 在config.env 配置好主机ip,config.ts里面配置好api的ip
3 需要在github的Setting-Security-Secrets and Variables-Actions里面添加一个Repository SSH_PRIVATE_KEY的密钥,并且你的密钥变了这个也需要变,并且这个密钥新服务器也是用它
4 每次触发需要push tag上去
5 docker环境拉不下来的话,通过push tag docker*来执行

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
# todo

添加图片视频资源
以及对资源的上传保存等
