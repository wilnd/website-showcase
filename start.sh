#!/bin/bash

# 后台启动所有服务脚本

echo "后台启动所有服务..."
echo "所有服务将在后台运行，日志将保存到 logs/ 目录中。"

# 创建日志目录
mkdir -p logs

# 启动后端服务
echo "启动后端服务 (端口: 8010)..."
cd backend
nohup mvn spring-boot:run > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
echo "后端服务已启动，PID: $BACKEND_PID"
cd ..

# 等待后端服务启动
sleep 10

# 启动管理端开发服务器
echo "启动管理端开发服务器 (端口: 3010)..."
cd frontend-admin
nohup npm start > ../logs/admin.log 2>&1 &
ADMIN_PID=$!
echo "管理端开发服务器已启动，PID: $ADMIN_PID"
cd ..

# 启动客户端开发服务器
echo "启动客户端开发服务器 (端口: 3011)..."
cd frontend-client
nohup npm start > ../logs/client.log 2>&1 &
CLIENT_PID=$!
echo "客户端开发服务器已启动，PID: $CLIENT_PID"
cd ..

echo ""
echo "=========================================="
echo "所有服务已以后台模式启动！"
echo "=========================================="
echo "访问地址："
echo "后端API: http://localhost:8010"
echo "管理端: http://localhost:3010"
echo "客户端: http://localhost:3011"
echo ""
echo "查看日志："
echo "后端日志: tail -f logs/backend.log"
echo "管理端日志: tail -f logs/admin.log"
echo "客户端日志: tail -f logs/client.log"
echo ""
echo "停止服务: ./stop.sh"
echo "手动启动: ./manual-start.sh"
echo "=========================================="