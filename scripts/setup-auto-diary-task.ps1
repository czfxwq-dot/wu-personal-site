# 半百观AI 自动日记定时任务安装脚本

$taskName = "半百观AI自动日记"
$scriptPath = "C:\Users\czfxw\Desktop\claude项目\wu-personal-site\scripts\run-auto-diary.bat"

Write-Host "========================================"
Write-Host "半百观AI 自动日记定时任务安装"
Write-Host "========================================"
Write-Host ""

# 检查脚本是否存在
if (-not (Test-Path $scriptPath)) {
    Write-Host "错误：找不到脚本文件 $scriptPath"
    Write-Host "请确认文件路径正确"
    pause
    exit 1
}

# 删除已存在的任务
$existingTask = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
if ($existingTask) {
    Write-Host "发现已有任务，正在删除..."
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
    Write-Host "已删除旧任务"
}

# 创建新任务
Write-Host "创建定时任务..."

try {
    $trigger = New-ScheduledTaskTrigger -Daily -At 22:00
    $action = New-ScheduledTaskAction -Execute $scriptPath
    $settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable
    
    Register-ScheduledTask -TaskName $taskName -Trigger $trigger -Action $action -Settings $settings -Description "每天22:00自动生成半百观AI网站日记" -RunLevel Highest | Out-Null
    
    Write-Host "定时任务创建成功！"
    Write-Host ""
    Write-Host "任务详情："
    Write-Host "  名称：半百观AI自动日记"
    Write-Host "  时间：每天 22:00"
    Write-Host "  脚本：$scriptPath"
    Write-Host ""
    Write-Host "你可以在任务计划程序中查看和管理此任务"
    Write-Host "按 Win+R，输入 taskschd.msc 打开任务计划程序"
    Write-Host ""
    pause
}
catch {
    Write-Host "创建任务失败：$($_.Exception.Message)"
    Write-Host "请确保以管理员身份运行此脚本"
    pause
    exit 1
}
