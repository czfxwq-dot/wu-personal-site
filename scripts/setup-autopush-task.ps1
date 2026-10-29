# 注册一次性推送任务：今天 21:42 跑一次 auto-push.ps1。
# 用法：右键本文件 → 使用 PowerShell 运行（只需一次）。
# 改成每天固定时间：把下面的 -Once 换成 -Daily，并删掉「已经过点」那段。
# 卸载：Unregister-ScheduledTask -TaskName "BanbaiGuan-AutoPush" -Confirm:$false

$taskName = 'BanbaiGuan-AutoPush'
$scriptsPath = $PSScriptRoot
$scriptPath = Join-Path $scriptsPath 'auto-push.ps1'

if (-not (Test-Path $scriptPath)) {
  Write-Host "找不到 $scriptPath" -ForegroundColor Red
  Read-Host "按回车退出"
  exit 1
}

# 今天 21:42；万一执行时已经过点了，就一分钟后跑，避免注册一个过去的时间被拒。
$fireAt = (Get-Date).Date.AddHours(21).AddMinutes(42)
if ((Get-Date) -ge $fireAt) { $fireAt = (Get-Date).AddMinutes(1) }

Write-Host "注册计划任务：$taskName" -ForegroundColor Cyan
Write-Host "  脚本：$scriptPath"
Write-Host "  触发：$($fireAt.ToString('yyyy-MM-dd HH:mm')) 跑一次"
Write-Host ""

Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue

$action = New-ScheduledTaskAction -Execute 'powershell.exe' `
  -Argument "-NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$scriptPath`"" `
  -WorkingDirectory $scriptsPath

$trigger = New-ScheduledTaskTrigger -Once -At $fireAt

$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries `
  -StartWhenAvailable -MultipleInstances IgnoreNew `
  -ExecutionTimeLimit (New-TimeSpan -Minutes 5)

# 不用 -RunLevel Highest：凭据存在当前用户的 Windows 凭据管理器里，以本用户身份跑就行。
Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger `
  -Settings $settings -Description "把已提交未推送的改动推到 origin/main" | Out-Null

$task = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
if ($task) {
  Write-Host "✅ 已注册，状态：$($task.State)" -ForegroundColor Green
  Write-Host ""
  Write-Host "现在就推一次（不等 21:42，免得白等）：" -ForegroundColor Yellow
  & powershell.exe -NoProfile -ExecutionPolicy Bypass -File $scriptPath
  Write-Host ""
  Write-Host "日志（最后 5 行）：" -ForegroundColor Cyan
  Get-Content (Join-Path $scriptsPath 'logs\auto-push.log') -Tail 5 -ErrorAction SilentlyContinue
} else {
  Write-Host "❌ 注册失败" -ForegroundColor Red
}
Read-Host "按回车退出"
