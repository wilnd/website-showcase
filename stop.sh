#!/bin/bash
# 修复后的停止所有后台服务脚本
# 核心优化：放宽进程命令匹配规则，兼容不同启动方式的进程命令

echo "停止所有后台服务..."

# ======================================
# 1. 停止后端服务（Spring Boot）
# 匹配条件：包含 "java"（后端用 Java 运行）+ 排除 "grep"（避免匹配自身）
# ======================================
BACKEND_PIDS=$(ps aux | grep java | grep -v grep | awk '{print $2}')
if [ ! -z "$BACKEND_PIDS" ]; then
    # 用 -9 强制终止（确保彻底停止，避免残留）
    kill -9 $BACKEND_PIDS
    echo "后端服务已停止 (PID: $BACKEND_PIDS)"
else
    echo "未找到运行中的后端服务"
fi

# ======================================
# 2. 停止管理端开发服务器（frontend-admin）
# 匹配条件：包含 "node"（前端用 Node 运行）+ 包含 "frontend-admin"（区分客户端）
# ======================================
# 先进入管理端目录，通过 npm 停止（更安全，优先用）
if [ -d "frontend-admin" ]; then
    cd frontend-admin
    # 若 npm 能识别服务，用 npm stop 停止（需 package.json 配置 stop 脚本）
    npm stop > /dev/null 2>&1
    cd ..
fi
# 兜底：用进程查找强制停止（防止 npm stop 失效）
ADMIN_PIDS=$(ps aux | grep node | grep frontend-admin | grep -v grep | awk '{print $2}')
if [ ! -z "$ADMIN_PIDS" ]; then
    kill -9 $ADMIN_PIDS
    echo "管理端开发服务器已停止 (PID: $ADMIN_PIDS)"
else
    echo "未找到运行中的管理端开发服务器"
fi

# ======================================
# 3. 停止客户端开发服务器（frontend-client）
# 匹配条件：包含 "node" + 包含 "frontend-client"
# ======================================
# 先进入客户端目录，用 npm 停止
if [ -d "frontend-client" ]; then
    cd frontend-client
    npm stop > /dev/null 2>&1
    cd ..
fi
# 兜底：进程查找强制停止
CLIENT_PIDS=$(ps aux | grep node | grep frontend-client | grep -v grep | awk '{print $2}')
if [ ! -z "$CLIENT_PIDS" ]; then
    kill -9 $CLIENT_PIDS
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
