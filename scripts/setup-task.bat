@echo off
chcp 65001 >nul
echo ========================================
echo 半百观AI 自动日记定时任务安装
echo ========================================
echo.

:: 检查管理员权限
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 需要管理员权限
    echo 请右键点击此文件，选择"以管理员身份运行"
    pause
    exit /b 1
)

echo [信息] 正在创建定时任务...
echo.

:: 删除已存在的任务
schtasks /delete /tn "半百观AI自动日记" /f >nul 2>&1

:: 创建新任务
schtasks /create /tn "半百观AI自动日记" /tr "\"C:\Users\czfxw\Desktop\claude项目\wu-personal-site\scripts\run-auto-diary.bat\"" /sc daily /st 22:00 /rl highest /f

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo [成功] 定时任务创建成功！
    echo ========================================
    echo.
    echo 任务详情：
    echo   名称：半百观AI自动日记
    echo   时间：每天 22:00
    echo   脚本：C:\Users\czfxw\Desktop\claude项目\wu-personal-site\scripts\run-auto-diary.bat
    echo.
    echo 你可以在任务计划程序中查看和管理此任务
    echo 按 Win+R，输入 taskschd.msc 打开任务计划程序
) else (
    echo.
    echo [错误] 创建任务失败
    echo 请确保以管理员身份运行此脚本
)

echo.
pause
