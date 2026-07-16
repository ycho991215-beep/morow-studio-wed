Set WshShell = CreateObject("WScript.Shell")

Dim repo
repo = "C:\Users\User\OneDrive\claude\projects\AVATAR MAKER STUDIO\morow-studio-web"

' Open cmd in the repo directory and keep it open
WshShell.Run "cmd /k cd /d """ & repo & """", 1, False

' Wait for cmd to open
WScript.Sleep 2000

' Bring cmd to front
WshShell.AppActivate "cmd.exe"
WScript.Sleep 500

' Remove git lock if exists
WshShell.SendKeys "del /f .git\index.lock 2>nul{ENTER}"
WScript.Sleep 500

' Git add all changed files
WshShell.SendKeys """C:\Program Files\Git\cmd\git.exe"" add package.json src\app\page.tsx src\app\api INSTALL_AND_RUN.bat INSTALL_SDK.bat GIT_PUSH.bat RUN_GIT_PUSH.vbs DO_GIT_PUSH.vbs{ENTER}"
WScript.Sleep 1000

' Git commit
WshShell.SendKeys """C:\Program Files\Git\cmd\git.exe"" commit -m ""feat: add AI chat widget + api/chat route + sdk in package.json""{ENTER}"
WScript.Sleep 2000

' Git push
WshShell.SendKeys """C:\Program Files\Git\cmd\git.exe"" push origin main{ENTER}"
WScript.Sleep 8000

' Show done message
WshShell.SendKeys "echo === PUSH DONE - check GitHub now ==={ENTER}"
