#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修复 ai-news-summary.ts 中的引号问题
将所有 summary 字段中的双引号替换为单引号
"""

from pathlib import Path
import re

def fix_summary_quotes():
    file_path = Path('src/data/ai-news-summary.ts')
    content = file_path.read_text(encoding='utf-8')

    lines = content.split('\n')
    fixed_lines = []
    fixed_count = 0

    for line in lines:
        # 检查是否是 summary 字段
        if '"summary":' in line:
            # 提取 summary 值
            match = re.search(r'"summary":\s*"(.*)"(,?)$', line)
            if match:
                summary_value = match.group(1)
                trailing_comma = match.group(2)

                # 将 summary 值中的双引号替换为单引号
                fixed_summary = summary_value.replace('"', "'")

                # 重新构建这一行
                fixed_line = f'      "summary": "{fixed_summary}"{trailing_comma}'
                fixed_lines.append(fixed_line)
                fixed_count += 1
            else:
                fixed_lines.append(line)
        else:
            fixed_lines.append(line)

    # 写回文件
    file_path.write_text('\n'.join(fixed_lines), encoding='utf-8')

    print(f"[OK] 修复了 {fixed_count} 行 summary 字段的引号问题")

if __name__ == '__main__':
    fix_summary_quotes()
