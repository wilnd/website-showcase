# 网站展示平台

这是一个包含管理端和客户端的网站展示平台，使用Java后端和React前端构建。

## 项目结构

```
my-website-showcase/
├── backend/           # Java后端服务 (端口: 8010)
├── frontend-admin/    # 管理端前端 (端口: 3010)
├── frontend-client/   # 客户端前端 (端口: 3011)
├── DATABASE_DESIGN.md # 数据库设计
└── database_schema.sql # 数据库初始化脚本
```

## 技术栈

### 后端
- Java 11+
- Spring Boot 2.7.0
- Spring Data JPA
- MySQL

### 前端
- React 18
- Ant Design
- Axios

## 环境要求

### 开发环境 (Mac)
- JDK 11+
- Node.js 16+
- MySQL 8.0+

### 部署环境 (Ubuntu)
- OpenJDK 11+
- Node.js 16+
- MySQL 8.0+
- Nginx

## 快速开始

### 1. 数据库设置

执行数据库初始化脚本:
```bash
mysql -u root -p < database_schema.sql
```

### 2. 后端启动

```bash
cd backend
mvn clean install

# 本地开发环境启动
mvn spring-boot:run -Dspring-boot.run.profiles=local

# 远程部署环境启动
mvn spring-boot:run -Dspring-boot.run.profiles=remote
```

后端服务将运行在 `http://localhost:8010`

### 3. 管理端启动

```bash
cd frontend-admin
npm install
npm start
```

管理端将运行在 `http://localhost:3010`

### 4. 客户端启动

```bash
cd frontend-client
npm install
npm start
```

客户端将运行在 `http://localhost:3011`

## 环境变量配置

前端项目使用环境变量来配置API地址，可以在 `.env` 文件中修改：

- `frontend-admin/.env` - 管理端环境变量
- `frontend-client/.env` - 客户端环境变量

默认配置：
```
REACT_APP_API_BASE_URL=http://localhost:8010
```

如果需要部署到不同的环境，只需修改 `.env` 文件中的 `REACT_APP_API_BASE_URL` 值。

## 启动方式

### 自动后台启动（推荐用于部署）
```bash
# 启动所有服务（后台运行）
./start.sh

# 停止所有服务
./stop.sh
```

### 手动前台启动（推荐用于开发调试）
```bash
# 查看手动启动命令
./manual-start.sh
```

手动启动时，请在不同的终端窗口中分别运行各个服务的启动命令，这样可以实时查看每个服务的输出日志。

## 配置文件说明

后端服务提供了三种配置文件：
- `application.properties` - 默认配置（本地开发）
- `application-local.properties` - 本地开发环境配置
- `application-remote.properties` - 远程部署环境配置

通过 `-Dspring-boot.run.profiles=` 参数指定要使用的配置文件。

## 端口配置

- 后端API: http://localhost:8010
- 管理端前端: http://localhost:3010
- 客户端前端: http://localhost:3011

## 部署指南

### Ubuntu部署步骤

1. 安装依赖:
```bash
sudo apt update
sudo apt install openjdk-11-jdk nodejs npm mysql-server nginx
```

2. 创建数据库并导入表结构

3. 构建后端:
```bash
cd backend
mvn clean package
```

4. 构建前端:
```bash
cd frontend-admin
npm run build
cd ../frontend-client
npm run build
```

5. 配置Nginx反向代理

6. 启动服务

## API接口

### 管理端接口
- `POST /api/websites` - 创建网站
- `PUT /api/websites/{id}` - 更新网站
- `DELETE /api/websites/{id}` - 删除网站

### 客户端接口
- `GET /api/websites` - 获取网站列表（分页）
- `GET /api/websites/{id}` - 获取网站详情

## 功能说明

### 管理端
- 添加/编辑/删除网站信息
- 管理网站标题、URL、描述和图片

### 客户端
- 浏览网站列表
- 查看网站详情
- 滚动分页加载更多内容