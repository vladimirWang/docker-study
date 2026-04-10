## 拷贝ssl证书失败的原因
![alt text](image.png)
这里的/etc/ssl/cert是以Dockerfile为基准的根目录位置。
Dockerfile所在的位置为构建上下文，只能访问这里的文件