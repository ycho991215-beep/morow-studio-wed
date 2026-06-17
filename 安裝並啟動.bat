@echo off
chcp 65001 > nul
cd /d "%~dp0"
echo [1/2] Installing packages...
npm install
echo [2/2] Starting dev server...
npm run dev
pause
