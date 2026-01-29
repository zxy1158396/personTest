#!/bin/bash

# 云服务器部署脚本
# 使用方法: ./deploy.sh

echo "开始部署..."

# 1. 构建生产版本
echo "正在构建生产版本..."
npm run build

if [ $? -ne 0 ]; then
    echo "构建失败，请检查错误信息"
    exit 1
fi

echo "构建完成！"

# 2. 压缩 dist 目录（可选，用于上传到服务器）
echo "正在压缩 dist 目录..."
tar -czf dist.tar.gz dist/

echo "压缩完成！dist.tar.gz 已生成"
echo ""
echo "下一步操作："
echo "1. 将 dist.tar.gz 上传到服务器"
echo "2. 在服务器上解压: tar -xzf dist.tar.gz"
echo "3. 将文件移动到网站目录: sudo mv dist/* /var/www/personTest/dist/"
echo "4. 重启 Nginx: sudo systemctl restart nginx"
