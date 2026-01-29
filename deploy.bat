@echo off
REM Windows 部署脚本
REM 使用方法: deploy.bat

echo 开始部署...

REM 1. 构建生产版本
echo 正在构建生产版本...
call npm run build

if %errorlevel% neq 0 (
    echo 构建失败，请检查错误信息
    pause
    exit /b 1
)

echo 构建完成！

REM 2. 压缩 dist 目录（使用 PowerShell）
echo 正在压缩 dist 目录...
powershell -Command "Compress-Archive -Path dist -DestinationPath dist.zip -Force"

echo 压缩完成！dist.zip 已生成
echo.
echo 下一步操作：
echo 1. 将 dist.zip 上传到服务器
echo 2. 在服务器上解压: unzip dist.zip
echo 3. 将文件移动到网站目录: sudo mv dist/* /var/www/personTest/dist/
echo 4. 重启 Nginx: sudo systemctl restart nginx
echo.
pause
