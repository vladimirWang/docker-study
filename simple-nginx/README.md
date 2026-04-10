## 制作镜像
docker build -t <镜像名>

## 运行容器
docker -d -p 80:80 <镜像名>

## 验证容器运行情况
curl http://localhost:80会看到 html标签


## nginx配置解释
### events模块
1. events 块是 Nginx 的核心配置块，必须存在，否则 Nginx 启动会直接报错
2. 里面的 worker_connections 是每个 worker 进程的最大并发连接数，默认值就是 1024，所以你写 1024 和不写效果完全一样，但 events 块本身不能省略
3. 最简写法：events {} 也能启动（用默认值），但规范写法建议保留 worker_connections 配置。

### worker_processes
1. Nginx 的默认值就是 worker_processes 1;（单进程），不写这行也能正常运行。
2. auto 是让 Nginx 自动匹配 CPU 核心数（比如 4 核 CPU 就开 4 个 worker 进程），属于性能优化项，不是运行必需项。
3. 对于你这个简单的单页面服务，1 个进程完全够用，写不写都不影响。
