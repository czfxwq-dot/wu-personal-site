#!/bin/bash
# 新增文章辅助脚本
# 用法: ./scripts/new-article.sh <slug> <date> <title> <excerpt> <tag>
# 示例: ./scripts/new-article.sh my-article 2026-06-17 "文章标题" "文章摘要" "AI思考"

set -e

SLUG="$1"
DATE="$2"
TITLE="$3"
EXCERPT="$4"
TAG="$5"

if [ -z "$SLUG" ] || [ -z "$DATE" ] || [ -z "$TITLE" ] || [ -z "$EXCERPT" ] || [ -z "$TAG" ]; then
  echo "❌ 缺少参数"
  echo "用法: $0 <slug> <date> <title> <excerpt> <tag>"
  exit 1
fi

# 检查 .astro 文件是否存在
ASTRO_FILE="src/pages/banbaiguan/${SLUG}.astro"
if [ ! -f "$ASTRO_FILE" ]; then
  echo "❌ 文章页面不存在: $ASTRO_FILE"
  echo "请先创建 .astro 文件"
  exit 1
fi

# 检查是否已注册
if grep -q "slug: '${SLUG}'" src/data/articles.ts; then
  echo "⚠️  文章已注册: ${SLUG}"
  exit 0
fi

# 插入到 articles.ts 顶部（在 export const articles: ArticleEntry[] = [ 之后）
TEMP_FILE=$(mktemp)
awk -v slug="$SLUG" -v date="$DATE" -v title="$TITLE" -v excerpt="$EXCERPT" -v tag="$TAG" '
  /export const articles: ArticleEntry\[\] = \[/ {
    print $0
    print "  {"
    print "    slug: \047" slug "\047,"
    print "    date: \047" date "\047,"
    print "    title: \047" title "\047,"
    print "    excerpt: \047" excerpt "\047,"
    print "    tag: \047" tag "\047,"
    print "  },"
    next
  }
  { print }
' src/data/articles.ts > "$TEMP_FILE"

mv "$TEMP_FILE" src/data/articles.ts
echo "✅ 已注册文章到 articles.ts: ${SLUG}"
echo "📎 下一步: npm run build && ./deploy.sh"
