#!/bin/bash

# 半百观AI 网站自动部署脚本
# 功能：build → git commit → git push → 自动部署到 Vercel via GitHub Actions

set -e  # 遇错即停

echo "🚀 开始部署半百观AI网站..."
echo ""

# 进入网站目录
cd "$(dirname "$0")/.."

# 检查是否有未提交的更改
if git diff --quiet && git diff --staged --quiet; then
    echo "✅ 没有新的更改需要部署"
    exit 0
fi

# 获取当前日期
DATE=$(date +%Y-%m-%d)
TIME=$(date +%H:%M)

# 生成 commit 信息
COMMIT_MSG="更新日记 ${DATE} ${TIME}"

# 检查是否有新的日记页
if git diff --name-only | grep -q "src/pages/diary/"; then
    echo "📝 检测到新日记页"
    COMMIT_MSG="新增日记 ${DATE}"
fi

# Build
echo "🔨 正在构建网站..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败，停止部署"
    exit 1
fi

echo "✅ 构建成功"
echo ""

# Git 操作
echo "📦 提交更改..."
git add .
git commit -m "${COMMIT_MSG}"

echo "📤 推送到 GitHub..."
git push origin main

echo ""
echo "✅ 推送成功！GitHub Actions 将自动部署到 Vercel"
echo "🔗 查看部署状态：https://github.com/$(git remote get-url origin | sed 's/.*github.com[:/]\(.*\)\.git/\1/')/actions"
echo ""
echo "🎉 部署流程完成！"
