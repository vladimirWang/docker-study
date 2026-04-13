FROM nginx:alpine

# prod = www.hetou.vip；test = test.hetou.vip（对应 conf.d 下文件名）
ARG NGINX_SITE=prod
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./conf.d/${NGINX_SITE}.conf /etc/nginx/conf.d/site.conf

COPY html/dist /usr/share/nginx/html

COPY ssl /etc/ssl/cert
