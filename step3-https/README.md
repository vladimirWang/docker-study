## 拷贝ssl证书失败的原因
![alt text](image.png)
这里的/etc/ssl/cert是以Dockerfile为基准的根目录位置。
Dockerfile所在的位置为构建上下文，只能访问这里的文件

## 解决通过域名访问成功，但是通过ip失败
解决方案：
新增一个ip访问的server块, 用301强制跳转
![alt text](image-1.png)