#!/usr/bin/env python3
import json
import re

# 读取翻译文件
with open('scripts/translations_ai_news.json', 'r', encoding='utf-8') as f:
    translations = json.load(f)

# 创建日期到翻译的映射
trans_map = {t['date']: t for t in translations}

# 读取数据文件
with open('src/data/ai-news-summary.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 按日期分割处理
count = 0
for date, trans in trans_map.items():
    if 'commentEn' not in trans or not trans['commentEn']:
        continue

    # 查找这个日期的条目
    pattern = rf'("date":\s*"{re.escape(date)}"[\s\S]*?"comment":\s*"[^"]*")\n(\s*\}})'
    match = re.search(pattern, content)

    if match:
        # 转义英文评论中的引号
        comment_en = trans['commentEn'].replace('\\', '\\\\').replace('"', '\\"')

        # 在 comment 后添加 commentEn
        replacement = f'{match.group(1)},\n  "commentEn": "{comment_en}"\n{match.group(2)}'
        content = content.replace(match.group(0), replacement)
        count += 1
        if count % 10 == 0:
            print(f'已更新 {count} 天...')
    else:
        print(f'未找到 {date}')

# 写回文件
with open('src/data/ai-news-summary.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f'\n完成！更新了 {count} 天的英文点评')
