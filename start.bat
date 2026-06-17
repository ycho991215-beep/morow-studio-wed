@echo off
chcp 65001 > nul
cd /d "%~dp0"
echo Testing npm path...
"C:\Program Files\nodejs\npm.cmd" --version
echo.
echo Starting Next.js dev server...
"C:\Program Files\nodejs\npm.cmd" run dev
echo.
echo === Server stopped or failed. ===
pause
