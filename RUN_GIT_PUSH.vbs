Dim WshShell, cmd, ret
Set WshShell = CreateObject("WScript.Shell")

Dim repo
repo = "C:\Users\User\OneDrive\claude\projects\AVATAR MAKER STUDIO\morow-studio-web"

Dim git
git = "C:\Program Files\Git\cmd\git.exe"

' Run git add + commit + push, show window, wait for completion
cmd = "cmd /c cd /d """ & repo & """ && """ & git & """ add package.json src\app\page.tsx src\app\api GIT_PUSH.bat INSTALL_AND_RUN.bat INSTALL_SDK.bat && """ & git & """ commit -m ""feat: add AI chat widget + api/chat route + fix package.json"" && """ & git & """ push origin main"

ret = WshShell.Run(cmd, 1, True)

If ret = 0 Then
    MsgBox "Git push OK! Now go to vercel.com to deploy.", 64, "Done"
Else
    MsgBox "Error code: " & ret & Chr(10) & "Please open Git Bash manually and run: git push origin main", 16, "Error"
End If
