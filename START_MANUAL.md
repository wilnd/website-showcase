# 手动启动服务说明

本项目包含三个主要服务，您可以通过手动方式在前台启动它们，以便查看实时日志。

## 服务列表及端口

1. **后端服务** - 端口: 8010
2. **管理端前端** - 端口: 3010
3. **客户端前端** - 端口: 3011

## 手动启动步骤

### 1. 启动后端服务

打开第一个终端窗口：
```bash
cd /Users/chenhao/code/personal/my-website-showcase/backend
mvn spring-boot:run
```

等待服务完全启动（看到类似 "Started WebsiteShowcaseApplication" 的消息）。

### 2. 启动管理端前端

打开第二个终端窗口：
```bash
cd /Users/chenhao/code/personal/my-website-showcase/frontend-admin
npm start
```

### 3. 启动客户端前端

打开第三个终端窗口：
```bash
cd /Users/chenhao/code/personal/my-website-showcase/frontend-client
npm start
```

## 访问地址

- 后端API: http://localhost:8010
- 管理端: http://localhost:3010
- 客户端: http://localhost:3011

## 停止服务

要停止服务，只需在各个终端窗口中按 `Ctrl + C`。

## 优势

手动前台启动的优势：
1. 实时查看每个服务的输出日志
2. 便于调试和排查问题
3. 可以清楚地看到启动过程中的错误信息
4. 适合开发和测试环境

## 注意事项

1. 请确保按照顺序启动服务（后端服务应最先启动）
2. 每个服务都需要在独立的终端窗口中运行
3. 如果修改了代码，需要重启相应的服务