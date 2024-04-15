## 构建基于 node-alpine 基础镜像的Docker容器
FROM node:21.2.0-alpine
## 设置作者
LABEL authors="HRET"
## 设置工作目录
WORKDIR /app

## 添加项目文件
ADD . /app

## 安装pnpm
RUN npm install -g pnpm
## 安装项目依赖
COPY package.json .
RUN pnpm install

## 运行
CMD [ "pnpm", "dev" ]