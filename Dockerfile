## 构建基于 nginx 基础镜像的Docker容器
FROM nginx

## 设置作者
MAINTAINER HRET

## 删除默认配置
RUN rm /etc/nginx/conf.d/default.conf

## 添加自定义配置文件
ADD default.conf /etc/nginx/conf.d/

## 拷贝静态资源
COPY dist/ /usr/share/nginx/html/