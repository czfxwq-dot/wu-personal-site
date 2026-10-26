const fs = require('fs');
const translations = JSON.parse(fs.readFileSync('scripts/translations_ai_news.json', 'utf-8'));
let content = fs.readFileSync('src/data/ai-news-summary.ts', 'utf-8');

let count = 0;
translations.forEach(t => {
  if (!t.commentEn) return;

  // 转义引号
  const escaped = t.commentEn.replace(/\\/g, '\\\\').replace(/"/g, '\\"');

  // 查找这一天的 comment 行（匹配到下一个字段或结束）
  const pattern = new RegExp(`("date":\\s*"${t.date}"[\\s\\S]*?"comment":\\s*"[^"]*")\\n`, 'm');
  const match = content.match(pattern);

  if (match) {
    // 在 comment 行后添加 commentEn
    const replacement = match[1] + ',\n  "commentEn": "' + escaped + '"\n';
    content = content.replace(match[0], replacement);
    count++;
  } else {
    console.log('未找到', t.date);
  }
});

fs.writeFileSync('src/data/ai-news-summary.ts', content, 'utf-8');
console.log('更新了', count, '天');
