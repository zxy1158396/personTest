# 云服务器部署指南

## 前置要求

1. **云服务器**（推荐配置）：
   - CPU: 1核以上
   - 内存: 1GB以上
   - 系统: Ubuntu 20.04+ / CentOS 7+ / Debian 10+
   - 已开放 80 和 443 端口

2. **域名**：
   - 已购买域名
   - 已配置 DNS 解析指向服务器 IP

## 部署步骤

### 1. 服务器环境准备

#### 1.1 安装 Nginx

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

**CentOS:**
```bash
sudo yum install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

#### 1.2 安装 Node.js（用于构建，可选）

如果要在服务器上构建，需要安装 Node.js：

```bash
# 使用 NodeSource 安装 Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. 本地构建项目

在本地开发机器上：

```bash
# 安装依赖（如果还没安装）
npm install

# 构建生产版本
npm run build
```

构建完成后会生成 `dist` 目录。

### 3. 上传文件到服务器

#### 方法一：使用 SCP（推荐）

```bash
# 压缩 dist 目录
tar -czf dist.tar.gz dist/

# 上传到服务器（替换为你的服务器信息）
scp dist.tar.gz root@your-server-ip:/tmp/
```

#### 方法二：使用 FTP/SFTP 工具

使用 FileZilla、WinSCP 等工具上传 `dist` 目录到服务器。

### 4. 服务器端配置

#### 4.1 解压并移动文件

```bash
# SSH 登录服务器
ssh root@your-server-ip

# 解压文件
cd /tmp
tar -xzf dist.tar.gz

# 创建网站目录
sudo mkdir -p /var/www/personTest

# 移动文件
sudo mv dist/* /var/www/personTest/
sudo chown -R www-data:www-data /var/www/personTest  # Ubuntu/Debian
# 或
sudo chown -R nginx:nginx /var/www/personTest  # CentOS
```

#### 4.2 配置 Nginx

```bash
# 复制配置文件
sudo cp nginx.conf /etc/nginx/sites-available/personTest

# 修改配置文件中的域名
sudo nano /etc/nginx/sites-available/personTest
# 将 your-domain.com 替换为你的实际域名

# 创建软链接（Ubuntu/Debian）
sudo ln -s /etc/nginx/sites-available/personTest /etc/nginx/sites-enabled/

# 或直接复制到 conf.d（CentOS）
sudo cp nginx.conf /etc/nginx/conf.d/personTest.conf
```

#### 4.3 测试并重启 Nginx

```bash
# 测试配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

### 5. 配置 SSL 证书（HTTPS）

#### 5.1 安装 Certbot

```bash
# Ubuntu/Debian
sudo apt install certbot python3-certbot-nginx -y

# CentOS
sudo yum install certbot python3-certbot-nginx -y
```

#### 5.2 申请证书

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

按照提示完成证书申请，Certbot 会自动配置 Nginx。

#### 5.3 启用 HTTPS 配置

编辑 Nginx 配置文件，取消 HTTPS 部分的注释：

```bash
sudo nano /etc/nginx/sites-available/personTest
```

取消 HTTPS server 块和 HTTP 重定向的注释。

### 6. 防火墙配置

```bash
# Ubuntu/Debian (UFW)
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw reload

# CentOS (firewalld)
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

## 验证部署

1. 访问 `http://your-domain.com` 检查网站是否正常
2. 检查路由是否正常工作（如 `/quiz`, `/result` 等）
3. 检查静态资源是否正常加载

## 常见问题

### 1. 路由 404 错误

确保 Nginx 配置中有：
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### 2. 静态资源加载失败

检查文件路径和权限：
```bash
sudo chown -R www-data:www-data /var/www/personTest
sudo chmod -R 755 /var/www/personTest
```

### 3. Nginx 配置测试失败

检查配置文件语法：
```bash
sudo nginx -t
```

查看错误日志：
```bash
sudo tail -f /var/log/nginx/error.log
```

## 更新部署

当需要更新网站时：

```bash
# 本地重新构建
npm run build

# 上传新的 dist 目录
scp -r dist/* root@your-server-ip:/var/www/personTest/

# 或使用部署脚本
./deploy.sh
# 然后上传 dist.tar.gz 到服务器并解压
```

## 性能优化建议

1. **启用 Gzip 压缩**（已在配置中）
2. **配置 CDN**（可选，使用 Cloudflare 等）
3. **启用 HTTP/2**（HTTPS 配置中已包含）
4. **设置缓存策略**（已在配置中）

## 监控和维护

```bash
# 查看 Nginx 状态
sudo systemctl status nginx

# 查看访问日志
sudo tail -f /var/log/nginx/access.log

# 查看错误日志
sudo tail -f /var/log/nginx/error.log
```

## 安全建议

1. 定期更新系统和 Nginx
2. 使用强密码和 SSH 密钥认证
3. 配置防火墙规则
4. 定期备份网站文件
5. 监控服务器资源使用情况
