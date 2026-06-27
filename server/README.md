# 房屋租赁后端服务器

这是房屋租赁展示系统的后端API服务器，使用Node.js + Express + SQLite构建。

## 功能特性

- ✅ 预约看房表单提交
- ✅ 预约数据管理（增删改查）
- ✅ SQLite数据库存储
- ✅ RESTful API接口
- ✅ 跨域支持

## 技术栈

- **Node.js** - 运行环境
- **Express** - Web框架
- **better-sqlite3** - SQLite数据库
- **cors** - 跨域中间件
- **dotenv** - 环境变量管理

## 安装与运行

### 1. 安装依赖

```bash
cd server
npm install
```

### 2. 启动服务器

**开发模式（自动重启）:**
```bash
npm run dev
```

**生产模式:**
```bash
npm start
```

**或者使用启动脚本:**
```bash
./start-server.sh
```

服务器将在 `http://localhost:3000` 启动。

## API 接口文档

### 基础URL
```
http://localhost:3000/api
```

### 预约管理接口

#### 1. 获取预约列表

**GET** `/appointments`

查询参数：
- `page` - 页码（默认1）
- `limit` - 每页数量（默认10）
- `status` - 状态筛选（pending/confirmed/completed/cancelled）
- `date` - 日期筛选

响应示例：
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "张三",
      "phone": "13800138000",
      "email": "zhangsan@example.com",
      "appointment_date": "2024-01-15",
      "message": "希望下午看房",
      "status": "pending",
      "created_at": "2024-01-10 10:30:00",
      "updated_at": "2024-01-10 10:30:00"
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

#### 2. 获取单个预约详情

**GET** `/appointments/:id`

响应示例：
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "张三",
    "phone": "13800138000",
    "email": "zhangsan@example.com",
    "appointment_date": "2024-01-15",
    "message": "希望下午看房",
    "status": "pending",
    "created_at": "2024-01-10 10:30:00",
    "updated_at": "2024-01-10 10:30:00"
  }
}
```

#### 3. 创建新预约

**POST** `/appointments`

请求体：
```json
{
  "name": "张三",
  "phone": "13800138000",
  "email": "zhangsan@example.com",
  "appointment_date": "2024-01-15",
  "message": "希望下午看房"
}
```

响应示例：
```json
{
  "success": true,
  "message": "预约成功",
  "data": {
    "id": 1,
    "name": "张三",
    "phone": "13800138000",
    "email": "zhangsan@example.com",
    "appointment_date": "2024-01-15",
    "message": "希望下午看房",
    "status": "pending",
    "created_at": "2024-01-10 10:30:00",
    "updated_at": "2024-01-10 10:30:00"
  }
}
```

#### 4. 更新预约状态

**PUT** `/appointments/:id`

请求体：
```json
{
  "status": "confirmed"
}
```

响应示例：
```json
{
  "success": true,
  "message": "状态更新成功",
  "data": {
    "id": 1,
    "name": "张三",
    "phone": "13800138000",
    "email": "zhangsan@example.com",
    "appointment_date": "2024-01-15",
    "message": "希望下午看房",
    "status": "confirmed",
    "created_at": "2024-01-10 10:30:00",
    "updated_at": "2024-01-10 11:00:00"
  }
}
```

#### 5. 更新预约信息

**PUT** `/appointments/:id/details`

请求体：
```json
{
  "name": "李四",
  "phone": "13900139000",
  "email": "lisi@example.com",
  "appointment_date": "2024-01-16",
  "message": "希望上午看房"
}
```

#### 6. 删除预约

**DELETE** `/appointments/:id`

响应示例：
```json
{
  "success": true,
  "message": "预约删除成功"
}
```

## 数据库结构

### appointments 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER | 主键，自增 |
| name | TEXT | 姓名（必填） |
| phone | TEXT | 联系电话（必填） |
| email | TEXT | 电子邮箱（可选） |
| appointment_date | TEXT | 预约日期（必填） |
| message | TEXT | 留言（可选） |
| status | TEXT | 状态（pending/confirmed/completed/cancelled） |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

## 项目结构

```
server/
├── database/
│   └── database.js        # 数据库配置和初始化
├── routes/
│   └── appointments.js    # 预约路由
├── data/
│   └── appointments.db     # SQLite数据库文件（自动创建）
├── .env                   # 环境变量配置
├── package.json           # 项目依赖
└── server.js              # 服务器入口文件
```

## 环境变量

在 `.env` 文件中配置：

```env
PORT=3000
NODE_ENV=development
```

## 开发说明

### 数据验证

- 姓名、电话、预约日期为必填项
- 电话格式：11位手机号（1开头）
- 邮箱格式：标准邮箱格式验证

### 错误处理

所有错误都会返回统一格式：
```json
{
  "success": false,
  "message": "错误信息",
  "error": "详细错误信息（仅开发环境）"
}
```

## 前端集成

前端表单会自动提交数据到后端API。确保：

1. 后端服务器已启动
2. 前端页面通过同一服务器访问（或配置CORS）
3. API地址正确（默认使用相对路径）

## 生产部署

### 使用 PM2（推荐）

```bash
# 安装 PM2
npm install -g pm2

# 启动服务
pm2 start server.js --name house-rental-api

# 查看日志
pm2 logs house-rental-api

# 重启服务
pm2 restart house-rental-api

# 停止服务
pm2 stop house-rental-api
```

### 使用 Docker

创建 `Dockerfile`:

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

构建和运行：
```bash
docker build -t house-rental-api .
docker run -p 3000:3000 house-rental-api
```

## 许可证

MIT License