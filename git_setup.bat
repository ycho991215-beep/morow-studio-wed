@echo off
chcp 65001 > nul
cd /d "%~dp0"
echo [1/5] Setting branch to main...
git branch -m main
echo [2/5] Setting user config...
git config user.email "ycho991215@gmail.com"
git config user.name "Eason"
echo [3/5] Staging all files...
git add -A
echo [4/5] Committing...
git commit -m "init: P3 Morow Studio website"
echo.
echo === Done! ===
echo.
git log --oneline -3
pause
