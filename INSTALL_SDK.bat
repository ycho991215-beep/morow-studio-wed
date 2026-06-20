@echo off
chcp 65001 > nul
cd /d "C:\Users\User\OneDrive\claude\projects\AVATAR MAKER STUDIO\morow-studio-web"
echo 安裝 @anthropic-ai/sdk...
npm install @anthropic-ai/sdk
echo.
echo 完成！請重新啟動 dev server（重跑 INSTALL_AND_RUN.bat）
pause
