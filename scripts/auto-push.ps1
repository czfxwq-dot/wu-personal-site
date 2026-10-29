# 自动推送：把「已提交但未推送」的提交推到 origin/main。
# 只推提交，绝不碰工作区里未提交的改动——夜间生成的机械稿因此不会被推上线。
# 由计划任务 BanbaiGuan-AutoPush 每 10 分钟调用一次。

$repo = Split-Path -Parent $PSScriptRoot
Set-Location $repo

$logDir = Join-Path $repo 'scripts\logs'
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir | Out-Null }
$log = Join-Path $logDir 'auto-push.log'
function Write-Log($msg) {
  "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')  $msg" | Add-Content -Path $log -Encoding UTF8
}

# 0 字节的 index.lock 会挡住 git 命令，而且报错看着像成功。先清掉。
$lock = Join-Path $repo '.git\index.lock'
if (Test-Path $lock) {
  if ((Get-Item $lock).Length -eq 0) {
    Remove-Item $lock -Force -ErrorAction SilentlyContinue
    Write-Log '清理了残留的 index.lock'
  } else {
    Write-Log 'index.lock 非空，可能有 git 进程在跑，跳过本轮'
    exit 0
  }
}

git fetch origin --quiet 2>$null | Out-Null
$ahead = [int](git rev-list --count origin/main..HEAD 2>$null)
if ($LASTEXITCODE -ne 0) { Write-Log '读取待推送数量失败，跳过本轮'; exit 0 }
if ($ahead -le 0) { exit 0 }   # 没有待推送的提交，什么都不做，也不写日志

$head = git log -1 --format='%h %s'
$out = git push origin main 2>&1
if ($LASTEXITCODE -eq 0) {
  Write-Log "已推送 $ahead 个提交，HEAD: $head"
} else {
  Write-Log "推送失败（$ahead 个提交待推送），HEAD: $head"
  $out | ForEach-Object { Write-Log "  $_" }
}
