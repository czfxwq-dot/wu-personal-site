@echo off
echo Creating scheduled task...

:: Delete existing task
schtasks /delete /tn "BanbaiGuan-AutoDiary" /f >nul 2>&1

:: Create new task
schtasks /create /tn "BanbaiGuan-AutoDiary" /tr "C:\Users\czfxw\Desktop\claude项目\wu-personal-site\scripts\run-auto-diary.bat" /sc daily /st 22:00 /rl highest /f

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo SUCCESS: Scheduled task created!
    echo ========================================
    echo Task name: BanbaiGuan-AutoDiary
    echo Run time: Daily at 22:00
    echo Script: run-auto-diary.bat
    echo.
    echo You can view this task in Task Scheduler
    echo Press Win+R, type taskschd.msc to open
) else (
    echo.
    echo FAILED: Please run as administrator
)

echo.
pause
