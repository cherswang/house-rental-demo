const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const appointmentsRouter = require('./routes/appointments');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件服务 - 提供前端页面
app.use(express.static(path.join(__dirname, '..')));

// API 路由
app.use('/api/appointments', appointmentsRouter);

// 根路径返回前端页面
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: '服务器内部错误',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
    console.log(`API 文档: http://localhost:${PORT}/api/appointments`);
});