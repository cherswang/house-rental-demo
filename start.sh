#!/bin/bash

# 房屋租赁展示系统 - 启动脚本

echo "================================"
echo "  房屋租赁信息展示系统"
echo "================================"
echo ""

# 检查Python是否安装
if command -v python3 &> /dev/null; then
    echo "✓ 使用 Python3 启动服务器"
    echo ""
    echo "请在浏览器中打开: http://localhost:8000"
    echo "按 Ctrl+C 停止服务器"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "✓ 使用 Python 启动服务器"
    echo ""
    echo "请在浏览器中打开: http://localhost:8000"
    echo "按 Ctrl+C 停止服务器"
    echo ""
    python -m http.server 8000
else
    echo "✗ 未找到 Python"
    echo ""
    echo "请安装 Python 或使用其他方式启动本地服务器"
    echo "例如: npx serve ."
    echo "或使用 VS Code 的 Live Server 扩展"
fi
