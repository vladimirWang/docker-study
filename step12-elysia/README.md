## Step10：用数据卷同步前端静态文件到 Nginx

这个 step 用 **bind mount（数据卷）** 把宿主机的 `frontend/dist` 同步到容器内 Nginx 静态目录：

- 宿主机：`./frontend/dist`
- 容器：`/usr/share/nginx/html`

对应配置在 `docker-compose.yml`：

```yaml
services:
  nginx:
    volumes:
      - ./frontend/dist:/usr/share/nginx/html:ro
```

### 使用方式

1) 先在宿主机构建前端产物（生成 `frontend/dist`）：

```bash
cd frontend
pnpm i
pnpm build
```

2) 启动：

```bash
cd ..
docker compose up -d --build
```

3) 验证：

- 访问首页，应该直接由容器里的 Nginx 读取 `/usr/share/nginx/html/index.html`
- 修改宿主机 `frontend/dist/index.html`（或重新 `pnpm build`），容器内会立刻看到变化（无需重建镜像）

## 把 sql 语句导入容器执行
图一这样执行 sql 语句会出现图二的警告信息，但是会正常执行
![alt text](image2.png)
![alt text](image.png)

