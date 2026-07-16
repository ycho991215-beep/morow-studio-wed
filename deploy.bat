@echo off
chcp 65001 > nul
cd /d "%~dp0"
echo Deploying to Vercel...
echo y | npx vercel --prod
pause
