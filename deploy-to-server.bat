@echo off
REM Windows 自动部署脚本 - hyperpersona.org
REM 使用方法: deploy-to-server.bat

set SERVER_IP=45.32.221.187
set SERVER_USER=root
set DEPLOY_PATH=/var/www/personTest/dist
set SSL_PATH=/etc/nginx/ssl

echo ==========================================
echo   开始部署到服务器: %SERVER_IP%
echo ==========================================
echo.

REM 1. 构建项目
echo [1/6] 构建生产版本...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ 构建失败！请检查错误信息
    pause
    exit /b 1
)
echo ✅ 构建完成
echo.

REM 2. 检查必要文件
echo [2/6] 检查必要文件...
if not exist "dist" (
    echo ❌ dist 目录不存在！
    pause
    exit /b 1
)
if not exist "ssl\hyperpersona.org.crt" (
    echo ❌ SSL证书文件不存在！
    pause
    exit /b 1
)
if not exist "ssl\hyperpersona.org.key" (
    echo ❌ SSL私钥文件不存在！
    pause
    exit /b 1
)
echo ✅ 文件检查通过
echo.

REM 3. 上传网站文件
echo [3/6] 上传网站文件到服务器...
scp -r dist/* %SERVER_USER%@%SERVER_IP%:%DEPLOY_PATH%/
if %errorlevel% neq 0 (
    echo ❌ 文件上传失败！
    pause
    exit /b 1
)
echo ✅ 网站文件上传完成
echo.

REM 4. 上传SSL证书
echo [4/6] 上传SSL证书...
ssh %SERVER_USER%@%SERVER_IP% "mkdir -p %SSL_PATH%"
scp ssl\hyperpersona.org.crt %SERVER_USER%@%SERVER_IP%:%SSL_PATH%/
scp ssl\hyperpersona.org.key %SERVER_USER%@%SERVER_IP%:%SSL_PATH%/
if %errorlevel% neq 0 (
    echo ❌ SSL证书上传失败！
    pause
    exit /b 1
)
echo ✅ SSL证书上传完成
echo.

REM 5. 上传Nginx配置
echo [5/6] 上传Nginx配置...
scp nginx.conf %SERVER_USER%@%SERVER_IP%:/etc/nginx/sites-available/hyperpersona.org
if %errorlevel% neq 0 (
    echo ❌ Nginx配置上传失败！
    pause
    exit /b 1
)
echo ✅ Nginx配置上传完成
echo.

REM 6. 在服务器上执行配置
echo [6/6] 配置服务器...
ssh %SERVER_USER%@%SERVER_IP% "chmod 600 %SSL_PATH%/hyperpersona.org.key && chmod 644 %SSL_PATH%/hyperpersona.org.crt && chown root:root %SSL_PATH%/* && ln -sf /etc/nginx/sites-available/hyperpersona.org /etc/nginx/sites-enabled/ 2>nul || cp /etc/nginx/sites-available/hyperpersona.org /etc/nginx/conf.d/hyperpersona.org.conf && chown -R www-data:www-data /var/www/personTest 2>nul || chown -R nginx:nginx /var/www/personTest && chmod -R 755 /var/www/personTest && nginx -t && systemctl restart nginx && systemctl status nginx --no-pager -l"

if %errorlevel% neq 0 (
    echo ❌ 服务器配置失败！
    pause
    exit /b 1
)

echo.
echo ==========================================
echo   ✅ 部署完成！
echo ==========================================
echo.
echo 🌐 网站地址: https://hyperpersona.org
echo.
echo 请访问网站验证部署是否成功
pause
