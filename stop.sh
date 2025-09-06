#!/bin/bash

# 停止所有后台服务脚本

echo "停止所有后台服务..."

# 查找并停止后端服务
BACKEND_PIDS=$(ps aux | grep 'mvn spring-boot:run' | grep -v grep | awk '{print $2}')
if [ ! -z "$BACKEND_PIDS" ]; then
    kill $BACKEND_PIDS
    echo "后端服务已停止 (PID: $BACKEND_PIDS)"
else
    echo "未找到运行中的后端服务"
fi

# 查找并停止管理端开发服务器
ADMIN_PIDS=$(ps aux | grep 'frontend-admin' | grep 'npm start' | grep -v grep | awk '{print $2}')
if [ ! -z "$ADMIN_PIDS" ]; then
    kill $ADMIN_PIDS
    echo "管理端开发服务器已停止 (PID: $ADMIN_PIDS)"
else
    echo "未找到运行中的管理端开发服务器"
fi

# 查找并停止客户端开发服务器
CLIENT_PIDS=$(ps aux | grep 'frontend-client' | grep 'npm start' | grep -v grep | awk '{print $2}')
if [ ! -z "$CLIENT_PIDS" ]; then
    kill $CLIENT_PIDS
    echo "客户端开发服务器已停止 (PID: $CLIENT_PIDS)"
else
    echo "未找到运行中的客户端开发服务器"
fi

echo ""
echo "=========================================="
echo "所有后台服务已停止！"
echo "=========================================="
echo "如需重新启动："
echo "后台启动: ./start.sh"
echo "手动启动: ./manual-start.sh"
echo "=========================================="