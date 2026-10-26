#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import re
import sys

# 设置标准输出为UTF-8
if sys.platform.startswith('win'):
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def fix_english_content():
    """修复 diaries.ts 中的英文内容缩进"""
    file_path = 'src/data/diaries.ts'

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 使用正则表达式找到所有 contentEn 字段并移除缩进
    def remove_indentation(match):
        field_content = match.group(1)
        # 按行分割
        lines = field_content.split('\\n')
        # 移除每行开头的空格
        fixed_lines = [line.lstrip() for line in lines]
        # 重新组合
        fixed_content = '\\n'.join(fixed_lines)
        return f'contentEn: `{fixed_content}`'

    # 匹配 contentEn: `...` 模式
    pattern = r'contentEn: `([^`]*)`'
    fixed_content = re.sub(pattern, remove_indentation, content)

    # 写回文件
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(fixed_content)

    # 统计修复数量
    count = len(re.findall(pattern, content))
    print(f'完成！共修复 {count} 个英文内容字段')

if __name__ == '__main__':
    fix_english_content()
