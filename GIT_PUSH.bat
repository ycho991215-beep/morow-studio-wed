@echo off
chcp 65001 > nul

set "REPO=C:\Users\User\OneDrive\claude\projects\AVATAR MAKER STUDIO\morow-studio-web"
set "GIT=C:\Program Files\Git\cmd\git.exe"

cd /d "%REPO%"
if errorlevel 1 (
  echo ERROR: cannot find folder
  pause
  exit /b 1
)

echo Removing git lock if exists...
if exist ".git\index.lock" del /f ".git\index.lock"

echo Adding changed files...
"%GIT%" add package.json "src\app\page.tsx" "src\app\api\" INSTALL_AND_RUN.bat INSTALL_SDK.bat GIT_PUSH.bat

echo Committing...
"%GIT%" commit -m "feat: add AI chat widget + api/chat route + fix package.json"

echo Pushing to GitHub...
"%GIT%" push origin main

echo.
echo DONE - go to vercel.com to deploy
pause
