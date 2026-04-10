## 制作镜像
docker build -t <镜像名>

## 运行容器
docker -d -p 80:80 <镜像名>

## 验证容器运行情况
curl http://localhost:80会看到 html标签
