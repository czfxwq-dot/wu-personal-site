# 半百观AI 定时任务一键安装脚本
# 运行方式：右键此文件 → 使用 PowerShell 运行（需要管理员权限）

# 检查管理员权限
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "错误：需要管理员权限！" -ForegroundColor Red
    Write-Host "请右键此文件，选择'使用 PowerShell 运行'" -ForegroundColor Yellow
    pause
    exit 1
}

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "半百观AI 定时任务安装" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# 设置变量
$pythonPath = "C:\Users\czfxw\AppData\Local\Programs\Python\Python312\python.exe"
$scriptsPath = "C:\Users\czfxw\Desktop\claude项目\wu-personal-site\scripts"

# 检查 Python 是否存在
if (-not (Test-Path $pythonPath)) {
    Write-Host "错误：找不到 Python！" -ForegroundColor Red
    Write-Host "请确认 Python 安装路径：$pythonPath" -ForegroundColor Yellow
    pause
    exit 1
}

# 删除已存在的任务
Write-Host "[1/4] 清理旧任务..." -ForegroundColor Yellow
Unregister-ScheduledTask -TaskName "BanbaiGuan-AutoDiary" -Confirm:$false -ErrorAction SilentlyContinue
Unregister-ScheduledTask -TaskName "BanbaiGuan-AutoNews" -Confirm:$false -ErrorAction SilentlyContinue

# 创建自动日记任务
Write-Host "[2/4] 创建自动日记任务..." -ForegroundColor Yellow
$action1 = New-ScheduledTaskAction -Execute $pythonPath -Argument "auto-diary.py" -WorkingDirectory $scriptsPath
$trigger1 = New-ScheduledTaskTrigger -Daily -At 22:00
$settings1 = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable
Register-ScheduledTask -TaskName "BanbaiGuan-AutoDiary" -Action $action1 -Trigger $trigger1 -Settings $settings1 -Description "每天22:00自动生成日记" -RunLevel Highest | Out-Null

# 创建自动AI新闻任务
Write-Host "[3/4] 创建自动AI新闻任务..." -ForegroundColor Yellow
$action2 = New-ScheduledTaskAction -Execute $pythonPath -Argument "auto-news.py" -WorkingDirectory $scriptsPath
$trigger2 = New-ScheduledTaskTrigger -Daily -At 22:00
$settings2 = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable
Register-ScheduledTask -TaskName "BanbaiGuan-AutoNews" -Action $action2 -Trigger $trigger2 -Settings $settings2 -Description "每天22:00自动采集AI新闻" -RunLevel Highest | Out-Null

# 验证任务
Write-Host "[4/4] 验证任务..." -ForegroundColor Yellow
$task1 = Get-ScheduledTask -TaskName "BanbaiGuan-AutoDiary" -ErrorAction SilentlyContinue
$task2 = Get-ScheduledTask -TaskName "BanbaiGuan-AutoNews" -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "=====================================" -ForegroundColor Green
if ($task1 -and $task2) {
    Write-Host "✓ 安装成功！" -ForegroundColor Green
    Write-Host ""
    Write-Host "已创建的任务：" -ForegroundColor Cyan
    Write-Host "  • BanbaiGuan-AutoDiary（自动日记）" -ForegroundColor White
    Write-Host "  • BanbaiGuan-AutoNews（自动AI新闻）" -ForegroundColor White
    Write-Host ""
    Write-Host "运行时间：每天 22:00" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "可以在任务计划程序中查看和管理" -ForegroundColor Yellow
} else {
    Write-Host "✗ 安装失败！" -ForegroundColor Red
    Write-Host "请检查错误信息" -ForegroundColor Yellow
}
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""
pause
