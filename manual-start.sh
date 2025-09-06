#!/bin/bash

# 手动启动所有服务脚本

echo "手动启动所有服务..."
echo "请在不同的终端窗口中分别执行以下命令："

echo ""
echo "=================================="
echo "1. 启动后端服务 (端口: 8010)"
echo "=================================="
echo "cd backend"
echo "mvn spring-boot:run"
echo ""

echo "=================================="
echo "2. 启动管理端前端 (端口: 3010)"
echo "=================================="
echo "cd frontend-admin"
echo "npm start"
echo ""

echo "=================================="
echo "3. 启动客户端前端 (端口: 3011)"
echo "=================================="
echo "cd frontend-client"
echo "npm start"
echo ""

echo "=================================="
echo "访问地址："
echo "=================================="
echo "后端API: http://localhost:8010"
echo "管理端: http://localhost:3010"
echo "客户端: http://localhost:3011"
echo ""

echo "提示：请在不同的终端窗口中分别运行上述命令，以便可以同时查看各个服务的输出日志。"