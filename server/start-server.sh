#!/bin/bash

# 房屋租赁后端服务器启动脚本

echo "正在启动房屋租赁后端服务器..."

# 进入服务器目录
cd "$(dirname "$0")"

# 检查node_modules是否存在，如果不存在则安装依赖
if [ ! -d "node_modules" ]; then
    echo "正在安装依赖..."
    npm install
fi

# 启动服务器
echo "启动服务器..."
npm start