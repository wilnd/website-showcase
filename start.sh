#!/bin/bash

# 启动网站展示平台

echo "启动网站展示平台..."

# 创建日志目录
mkdir -p logs

# 启动后端服务
echo "启动后端服务..."
cd backend
nohup mvn spring-boot:run > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
echo "后端服务已启动，PID: $BACKEND_PID"
cd ..

# 等待后端服务启动
sleep 10

# 启动管理端开发服务器
echo "启动管理端开发服务器..."
cd frontend-admin
nohup npm start > ../logs/admin.log 2>&1 &
ADMIN_PID=$!
echo "管理端开发服务器已启动，PID: $ADMIN_PID"
cd ..

# 启动客户端开发服务器
echo "启动客户端开发服务器..."
cd frontend-client
nohup npm start > ../logs/client.log 2>&1 &
CLIENT_PID=$!
echo "客户端开发服务器已启动，PID: $CLIENT_PID"

echo "所有服务启动命令已执行！"
echo "请稍等片刻，让服务完全启动..."
echo ""
echo "访问地址："
echo "后端API: http://localhost:8010"
echo "管理端: http://localhost:3010"
echo "客户端: http://localhost:3011"
echo ""
echo "日志文件位于 logs/ 目录中"