# 半百观AI 自动日记定时任务安装脚本
# 运行方式：右键点击此文件，选择"使用 PowerShell 运行"

$taskName = "半百观AI自动日记"
$scriptPath = "C:\Users\czfxw\Desktop\claude项目\wu-personal-site\scripts\run-auto-diary.bat"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "半百观AI 自动日记定时任务安装" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查脚本是否存在
if (-not (Test-Path $scriptPath)) {
    Write-Host "❌ 错误：找不到脚本文件 $scriptPath" -ForegroundColor Red
    Write-Host "请确认文件路径正确" -ForegroundColor Yellow
    pause
    exit 1
}

# 删除已存在的任务
$existingTask = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
if ($existingTask) {
    Write-Host "⚠️  发现已有任务，正在删除..." -ForegroundColor Yellow
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
    Write-Host "✅ 已删除旧任务" -ForegroundColor Green
}

# 创建新任务
Write-Host "📝 创建定时任务..." -ForegroundColor Cyan

$trigger = New-ScheduledTaskTrigger -Daily -At 22:00
$action = New-ScheduledTaskAction -Execute $scriptPath
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

try {
    Register-ScheduledTask -TaskName $taskName -Trigger $trigger -Action $action -Settings $settings -Description "每天22:00自动生成半百观AI网站日记" -RunLevel Highest | Out-Null
    Write-Host "✅ 定时任务创建成功！" -ForegroundColor Green
    Write-Host ""
    Write-Host "任务详情：" -ForegroundColor Cyan
    Write-Host "  名称：半百观AI自动日记" -ForegroundColor White
    Write-Host "  时间：每天 22:00" -ForegroundColor White
    Write-Host "  脚本：$scriptPath" -ForegroundColor White
    Write-Host ""
    Write-Host "你可以在任务计划程序中查看和管理此任务" -ForegroundColor Yellow
    Write-Host "按 Win+R，输入 taskschd.msc 打开任务计划程序" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "按任意键退出..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}
catch {
    Write-Host "❌ 创建任务失败：$($_.Exception.Message)" -ForegroundColor Red
    Write-Host "请确保以管理员身份运行此脚本" -ForegroundColor Yellow
    pause
    exit 1
}
