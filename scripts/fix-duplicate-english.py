#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修复 diaries.ts 中的重复 titleEn 和 summaryEn 条目
"""

from pathlib import Path
import re

def fix_duplicate_english_fields():
    """修复重复的英文字段"""
    diaries_file = Path('src/data/diaries.ts')
    content = diaries_file.read_text(encoding='utf-8')

    # 移除重复的 titleEn 行（保留第一个）
    # 匹配模式：titleEn: `...`,\n    titleEn: `...`,
    pattern = r'(titleEn: `[^`]+`,)\s*\n\s*titleEn: `[^`]+`,'
    content = re.sub(pattern, r'\1', content)

    # 移除重复的 summaryEn 行（保留第一个）
    pattern = r'(summaryEn: `[^`]+`,)\s*\n\s*summaryEn: `[^`]+`,'
    content = re.sub(pattern, r'\1', content)

    # 写回文件
    diaries_file.write_text(content, encoding='utf-8')

    # 统计修复数量
    original_count = len(re.findall(r'titleEn:', diaries_file.read_text(encoding='utf-8')))
    print(f"[OK] Fixed duplicate English fields")
    print(f"[OK] Remaining titleEn entries: {original_count}")

    return original_count

if __name__ == '__main__':
    print("=" * 60)
    print("Fixing Duplicate English Fields in diaries.ts")
    print("=" * 60)
    print()

    count = fix_duplicate_english_fields()

    print()
    print(f"[DONE] Fixed duplicates, {count} titleEn entries remaining")
    print("=" * 60)
