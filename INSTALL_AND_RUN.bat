@echo off
chcp 65001 > nul
cd /d "C:\Users\User\OneDrive\claude\projects\AVATAR MAKER STUDIO\morow-studio-web"
echo 安裝所有套件（含 @anthropic-ai/sdk）...
call npm install
echo.
echo 啟動開發伺服器...
call npm run dev
pause
