# 注册「自动推送」计划任务：每 10 分钟检查一次，有未推送的提交就推。
# 用法：右键本文件 → 使用 PowerShell 运行（只需一次）。
# 卸载：Unregister-ScheduledTask -TaskName "BanbaiGuan-AutoPush" -Confirm:$false

$taskName = 'BanbaiGuan-AutoPush'
$scriptsPath = $PSScriptRoot
$scriptPath = Join-Path $scriptsPath 'auto-push.ps1'

if (-not (Test-Path $scriptPath)) {
  Write-Host "找不到 $scriptPath" -ForegroundColor Red
  Read-Host "按回车退出"
  exit 1
}

Write-Host "注册计划任务：$taskName" -ForegroundColor Cyan
Write-Host "  脚本：$scriptPath"
Write-Host "  频率：每 10 分钟（08:00 起到当天结束）"
Write-Host ""

Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue

$action = New-ScheduledTaskAction -Execute 'powershell.exe' `
  -Argument "-NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$scriptPath`"" `
  -WorkingDirectory $scriptsPath

# 触发方式：每天 08:00 起，每 10 分钟一次，共 15 小时（到 23:00）。
# 不用「Once + 超长重复时长」，那个写法在部分版本的 Windows 上会因为时长超过
# 31 天而报错；Daily 触发器挂 Repetition 是兼容性最稳的做法。
$trigger = New-ScheduledTaskTrigger -Daily -At '08:00'
$repetition = (New-ScheduledTaskTrigger -Once -At '08:00' `
  -RepetitionInterval (New-TimeSpan -Minutes 10) `
  -RepetitionDuration (New-TimeSpan -Hours 15)).Repetition
$trigger.Repetition = $repetition

$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries `
  -StartWhenAvailable -MultipleInstances IgnoreNew `
  -ExecutionTimeLimit (New-TimeSpan -Minutes 5)

# 不用 -RunLevel Highest：凭据存在当前用户的 Windows 凭据管理器里，以本用户身份跑就行。
Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger `
  -Settings $settings -Description "每 10 分钟把已提交未推送的改动推到 origin/main" | Out-Null

$task = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
if ($task) {
  Write-Host "✅ 已注册" -ForegroundColor Green
  Write-Host "   状态：$($task.State)"
  Write-Host "   日志：scripts\logs\auto-push.log"
  Write-Host ""
  Write-Host "现在就试一次（不推送成功也算，会写日志）：" -ForegroundColor Yellow
  & powershell.exe -NoProfile -ExecutionPolicy Bypass -File $scriptPath
  Write-Host "   查看日志：Get-Content scripts\logs\auto-push.log -Tail 5"
} else {
  Write-Host "❌ 注册失败" -ForegroundColor Red
}
Read-Host "按回车退出"
