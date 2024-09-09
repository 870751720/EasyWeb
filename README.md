# EasyWeb

# 新服务器
1 在config.ini 配置好主机ip
2 如果DAEMON_JSON不好用了需要再找
3 需要在github的Setting-Security-Secrets and Variables-Actions里面添加一个Repository SSH_PRIVATE_KEY的密钥,并且你的密钥变了这个也需要变,并且这个密钥新服务器也是用它
如果换仓库了,那么还需要加DOCKER_TOKEN来保证镜像分发拉取(教程:https://maimai.cn/article/detail?fid=1526972729&efid=VNF0gXh3X1BHO46nQtVwBQ)
去https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors 获取daemon的镜像加速地址
4 每次触发需要push release* 的tag上去

# todo
添加数据库
添加图片视频资源
以及对资源的上传保存等
