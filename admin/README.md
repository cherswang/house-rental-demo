# 房屋租赁后台管理系统

这是一个基于Vue 3 + Element Plus的后台管理系统，用于管理房屋租赁预约信息。

## 功能特性

- ✅ 预约列表查询与展示
- ✅ 预约状态筛选（待确认/已确认/已完成/已取消）
- ✅ 预约日期筛选
- ✅ 预约详情查看
- ✅ 预约信息编辑
- ✅ 预约状态更新
- ✅ 预约删除
- ✅ 分页显示
- ✅ 响应式设计

## 技术栈

- **Vue 3** - 前端框架
- **Vite** - 构建工具
- **Element Plus** - UI组件库
- **Axios** - HTTP客户端

## 安装与运行

### 1. 安装依赖

```bash
cd admin
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

**或者使用启动脚本:**
```bash
./start-admin.sh
```

管理系统将在 `http://localhost:8080` 启动。

### 3. 构建生产版本

```bash
npm run build
```

构建后的文件将生成在 `dist` 目录。

### 4. 预览生产版本

```bash
npm run preview
```

## 使用说明

### 登录

1. 访问 `http://localhost:8080`
2. 系统会自动跳转到登录页面
3. 输入任意用户名和密码（演示版本）
4. 点击登录按钮进入系统

### 预约管理

#### 查看预约列表
- 登录后会自动显示预约列表
- 默认显示所有状态的预约

#### 筛选预约
- **状态筛选**: 选择下拉框筛选不同状态的预约
  - 待确认（pending）
  - 已确认（confirmed）
  - 已完成（completed）
  - 已取消（cancelled）
- **日期筛选**: 选择特定日期查看预约
- 点击"查询"按钮执行筛选
- 点击"重置"按钮清空筛选条件

#### 查看预约详情
- 点击表格中的"详情"按钮
- 弹出对话框显示完整预约信息

#### 编辑预约
- 点击表格中的"编辑"按钮
- 可以修改以下信息：
  - 姓名
  - 联系电话
  - 电子邮箱
  - 预约日期
  - 状态
  - 留言
- 点击"保存"按钮提交修改

#### 删除预约
- 点击表格中的"删除"按钮
- 系统会弹出确认对话框
- 确认后删除预约

#### 分页操作
- 支持切换每页显示数量（10/20/30/50条）
- 支持页码跳转

## 项目结构

```
admin/
├── src/
│   ├── views/
│   │   ├── Login.vue          # 登录页面
│   │   ├── Dashboard.vue      # 仪表盘（预留）
│   │   └── Appointments.vue   # 预约管理页面
│   ├── router/
│   │   └── index.js           # 路由配置
│   ├── App.vue                # 根组件
│   └── main.js                # 入口文件
├── index.html                 # HTML模板
├── vite.config.js             # Vite配置
├── package.json               # 项目依赖
└── README.md                  # 使用说明
```

## API代理配置

系统通过Vite代理转发API请求到后端服务器：

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:3000',
    changeOrigin: true
  }
}
```

**确保后端服务器正在运行**，否则API请求会失败。

## 开发说明

### 路由守卫

系统实现了简单的路由守卫，检查登录状态：

```javascript
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})
```

### 数据验证

前端表单包含以下验证：
- 用户名和密码必填（登录页面）
- 手机号格式验证（后端API）
- 邮箱格式验证（后端API）

### 状态管理

预约状态映射：

```javascript
const statusMap = {
  pending: { text: '待确认', type: 'warning' },
  confirmed: { text: '已确认', type: 'success' },
  completed: { text: '已完成', type: 'info' },
  cancelled: { text: '已取消', type: 'danger' }
}
```

## 生产部署

### 构建静态文件

```bash
npm run build
```

### 部署到服务器

将 `dist` 目录的内容部署到Web服务器，例如：

**Nginx配置示例:**
```nginx
server {
    listen 80;
    server_name admin.example.com;
    
    root /path/to/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 后续扩展

### 用户认证系统

当前为演示版本，后续可以添加：
- 真实的用户认证系统
- JWT令牌验证
- 用户权限管理
- 多角色支持（管理员/普通用户）

### 其他功能

可以继续扩展：
- 房源管理
- 用户管理
- 统计报表
- 数据导出
- 消息通知

## 许可证

MIT License