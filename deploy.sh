#!/bin/bash
# 部署到 Cloudflare Pages 生产环境
# 必须使用 master 分支，否则自定义域名不生效
# 用法: ./deploy.sh

set -e

cd "$(dirname "$0")"

echo "🔨 构建中..."
npm run build

echo "🚀 部署到 Production (master 分支)..."
wrangler pages deploy docs \
  --project-name wu-personal-site \
  --branch master \
  --commit-dirty=true

echo "✅ 部署完成"
echo "📎 生产环境: https://ban-bai.com/"
echo "📎 预览链接: https://production.wu-personal-site.pages.dev/"
