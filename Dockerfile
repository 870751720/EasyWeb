# 使用官方 Python 作为父镜像
FROM python:3.9-slim

# 设置工作目录
WORKDIR /app

# 复制要求文件并安装依赖
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# 复制应用程序代码
COPY . .

# 公开应用程序端口
EXPOSE 80

# 设置环境变量
ENV FLASK_APP=app.py

# 启动 Flask 应用
CMD ["flask", "run", "--host=0.0.0.0"]
