# 创建定时任务
$taskName = 'BanbaiGuan-AutoDiary'
$scriptPath = 'C:\Users\czfxw\Desktop\claude项目\wu-personal-site\scripts\run-auto-diary.bat'
$description = '每天22:00自动生成半百观AI网站日记'

# 删除已存在的任务
Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue

# 创建新任务
$action = New-ScheduledTaskAction -Execute $scriptPath
$trigger = New-ScheduledTaskTrigger -Daily -At 22:00
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Description $description -RunLevel Highest -Force

Write-Host "定时任务创建成功！" -ForegroundColor Green
Write-Host "任务名称：$taskName"
Write-Host "执行时间：每天 22:00"
Write-Host "执行脚本：$scriptPath"
