@echo off
chcp 65001 >nul
echo 正在创建定时任务...

:: 删除已存在的任务
schtasks /delete /tn "BanbaiGuan-AutoDiary" /f >nul 2>&1

:: 创建新任务
schtasks /create /tn "BanbaiGuan-AutoDiary" /tr "C:\Users\czfxw\Desktop\claude项目\wu-personal-site\scripts\run-auto-diary.bat" /sc daily /st 22:00 /rl highest /f

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo 定时任务创建成功！
    echo ========================================
    echo 任务名称：BanbaiGuan-AutoDiary
    echo 执行时间：每天 22:00
    echo 执行脚本：run-auto-diary.bat
    echo.
    echo 你可以在"任务计划程序"中查看此任务
    echo 按 Win+R，输入 taskschd.msc 打开
) else (
    echo.
    echo 创建失败，请确保以管理员身份运行此脚本
)

pause
