#!/bin/bash
# 部署前校验脚本 — 防止漏注册文章
# 用法: ./scripts/pre-deploy-check.sh
# 返回 0 = 通过，返回 1 = 有问题需修复

set -e
cd "$(dirname "$0")/.."

echo "🔍 部署前校验..."

# 检查1: 所有 .astro 文章页面是否都已注册到 articles.ts
MISSING=0
for f in src/pages/banbaiguan/*.astro; do
  # 跳过 index.astro
  basename=$(basename "$f" .astro)
  if [ "$basename" = "index" ]; then
    continue
  fi
  
  # 检查是否在 articles.ts 中注册
  if ! grep -q "slug: '${basename}'" src/data/articles.ts; then
    echo "❌ 未注册: ${basename}"
    MISSING=$((MISSING + 1))
  fi
done

if [ $MISSING -gt 0 ]; then
  echo ""
  echo "⚠️  发现 ${MISSING} 个文章页面未注册到 articles.ts"
  echo "请先运行: ./scripts/new-article.sh 注册"
  exit 1
fi

echo "✅ 所有文章页面已注册"
echo "✅ 可以安全部署"
exit 0
