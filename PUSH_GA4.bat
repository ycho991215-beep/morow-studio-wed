@echo off
chcp 65001 > nul
cd /d "%~dp0"
echo Staging GA4 layout changes...
"C:\Program Files\Git\cmd\git.exe" add src\app\layout.tsx
"C:\Program Files\Git\cmd\git.exe" commit -m "feat: add Google Analytics GA4 (G-8H3PG9LZV1)" 2>nul
echo Force pushing to main...
"C:\Program Files\Git\cmd\git.exe" push --force origin main
echo.
echo Done! Check Vercel dashboard in ~1 min.
pause
