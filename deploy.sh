#!/bin/bash

# 网站展示平台部署脚本

set -e

echo "开始部署网站展示平台..."

# 后端部署
echo "1. 部署后端服务..."
cd backend
mvn clean package -DskipTests
cd ..

# 前端管理端部署
echo "2. 部署管理端前端..."
cd frontend-admin
npm install
npm run build
cd ..

# 前端客户端部署
echo "3. 部署客户端前端..."
cd frontend-client
npm install
npm run build
cd ..

echo "部署完成！"

echo "启动服务步骤："
echo "1. 启动MySQL数据库并创建website_showcase数据库"
echo "2. 运行后端：cd backend && java -jar target/website-showcase-1.0.0.jar"
echo "3. 配置Nginx指向frontend-admin/build和frontend-client/build目录"