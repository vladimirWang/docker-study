## 网络连通性判断
当项目用docker启动后，公网 IP 能通，说明防火墙、端口映射、网络连通性全都是 OK 的。

## 通过公网ip可以访问，但是通过域名访问失败
1. 域名解析没有做
2. 没有配server_name

## 这样配置只支持http，不支持https

## 验证方法
ping <ip>
ping <server_name>