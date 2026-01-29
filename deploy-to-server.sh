#!/bin/bash
# 自动部署脚本 - hyperpersona.org
# 使用方法: ./deploy-to-server.sh

SERVER_IP="45.32.221.187"
SERVER_USER="root"
DEPLOY_PATH="/var/www/personTest/dist"
SSL_PATH="/etc/nginx/ssl"

echo "=========================================="
echo "  开始部署到服务器: ${SERVER_IP}"
echo "=========================================="
echo ""

# 1. 构建项目
echo "[1/6] 构建生产版本..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ 构建失败！请检查错误信息"
    exit 1
fi
echo "✅ 构建完成"
echo ""

# 2. 检查必要文件
echo "[2/6] 检查必要文件..."
if [ ! -d "dist" ]; then
    echo "❌ dist 目录不存在！"
    exit 1
fi
if [ ! -f "ssl/hyperpersona.org.crt" ]; then
    echo "❌ SSL证书文件不存在！"
    exit 1
fi
if [ ! -f "ssl/hyperpersona.org.key" ]; then
    echo "❌ SSL私钥文件不存在！"
    exit 1
fi
echo "✅ 文件检查通过"
echo ""

# 3. 上传网站文件
echo "[3/6] 上传网站文件到服务器..."
scp -r dist/* ${SERVER_USER}@${SERVER_IP}:${DEPLOY_PATH}/
if [ $? -ne 0 ]; then
    echo "❌ 文件上传失败！"
    exit 1
fi
echo "✅ 网站文件上传完成"
echo ""

# 4. 上传SSL证书
echo "[4/6] 上传SSL证书..."
ssh ${SERVER_USER}@${SERVER_IP} "mkdir -p ${SSL_PATH}"
scp ssl/hyperpersona.org.crt ${SERVER_USER}@${SERVER_IP}:${SSL_PATH}/
scp ssl/hyperpersona.org.key ${SERVER_USER}@${SERVER_IP}:${SSL_PATH}/
if [ $? -ne 0 ]; then
    echo "❌ SSL证书上传失败！"
    exit 1
fi
echo "✅ SSL证书上传完成"
echo ""

# 5. 上传Nginx配置
echo "[5/6] 上传Nginx配置..."
scp nginx.conf ${SERVER_USER}@${SERVER_IP}:/etc/nginx/sites-available/hyperpersona.org
if [ $? -ne 0 ]; then
    echo "❌ Nginx配置上传失败！"
    exit 1
fi
echo "✅ Nginx配置上传完成"
echo ""

# 6. 在服务器上执行配置
echo "[6/6] 配置服务器..."
ssh ${SERVER_USER}@${SERVER_IP} << 'ENDSSH'
    set -e
    
    echo "  设置SSL证书权限..."
    chmod 600 /etc/nginx/ssl/hyperpersona.org.key
    chmod 644 /etc/nginx/ssl/hyperpersona.org.crt
    chown root:root /etc/nginx/ssl/*
    
    echo "  启用Nginx站点..."
    if [ -d "/etc/nginx/sites-enabled" ]; then
        ln -sf /etc/nginx/sites-available/hyperpersona.org /etc/nginx/sites-enabled/
    else
        cp /etc/nginx/sites-available/hyperpersona.org /etc/nginx/conf.d/hyperpersona.org.conf
    fi
    
    echo "  设置文件权限..."
    if id "www-data" &>/dev/null; then
        chown -R www-data:www-data /var/www/personTest
    elif id "nginx" &>/dev/null; then
        chown -R nginx:nginx /var/www/personTest
    fi
    chmod -R 755 /var/www/personTest
    
    echo "  测试Nginx配置..."
    nginx -t
    if [ $? -ne 0 ]; then
        echo "❌ Nginx配置测试失败！"
        exit 1
    fi
    
    echo "  重启Nginx..."
    systemctl restart nginx
    systemctl status nginx --no-pager -l
    
    echo "✅ 服务器配置完成"
ENDSSH

if [ $? -ne 0 ]; then
    echo "❌ 服务器配置失败！"
    exit 1
fi

echo ""
echo "=========================================="
echo "  ✅ 部署完成！"
echo "=========================================="
echo ""
echo "🌐 网站地址: https://hyperpersona.org"
echo ""
echo "请访问网站验证部署是否成功"
