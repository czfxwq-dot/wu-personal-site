#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
import re
import sys

# 设置标准输出为UTF-8
if sys.platform.startswith('win'):
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def fix_diary_markdown(file_path):
    """修复日记 markdown 文件，移除 HTML 内容的缩进"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 分离 frontmatter 和正文
    parts = content.split('---\n', 2)
    if len(parts) < 3:
        return False

    frontmatter = parts[1]
    body = parts[2]

    # 移除每行开头的空格（但保留换行符）
    lines = body.split('\n')
    fixed_lines = []
    for line in lines:
        # 移除行首的空格
        fixed_line = line.lstrip()
        fixed_lines.append(fixed_line)

    fixed_body = '\n'.join(fixed_lines)

    # 重新组合文件
    fixed_content = f'---\n{frontmatter}---\n{fixed_body}'

    # 写回文件
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(fixed_content)

    return True

def main():
    diaries_dir = 'src/content/diaries'
    fixed_count = 0

    for filename in os.listdir(diaries_dir):
        if filename.endswith('.md'):
            file_path = os.path.join(diaries_dir, filename)
            if fix_diary_markdown(file_path):
                fixed_count += 1
                print(f'✓ 修复: {filename}')

    print(f'\n完成！共修复 {fixed_count} 个文件')

if __name__ == '__main__':
    main()
