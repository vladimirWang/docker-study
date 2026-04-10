## 拷贝ssl证书失败的原因
![alt text](image.png)
这里的/etc/ssl/cert是以Dockerfile为基准的根目录位置。
Dockerfile所在的位置为构建上下文，只能访问这里的文件

## 要让访问http+ip转发到https+域名的配置方式
![alt text](image-2.png)
1. server_name要写ip
2. ssl证书要配置，否则直接ssl握手失败
3. ssl握手成功后，走后续的301重定向