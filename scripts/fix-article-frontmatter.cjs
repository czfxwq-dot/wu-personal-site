const fs = require('fs');
const path = require('path');

const CONTENT_DIR = 'src/content/articles';
const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));

let fixed = 0;
files.forEach(file => {
  const filePath = path.join(CONTENT_DIR, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // 提取frontmatter
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return;
  
  const frontmatter = match[1];
  const lines = frontmatter.split('\n');
  
  const hasSubtitle = lines.some(l => l.startsWith('subtitle:'));
  const hasSummary = lines.some(l => l.startsWith('summary:'));
  
  if (!hasSubtitle || !hasSummary) {
    // 添加缺失的字段
    const newLines = [...lines];
    if (!hasSubtitle) {
      const titleIndex = newLines.findIndex(l => l.startsWith('title:'));
      newLines.splice(titleIndex + 1, 0, "subtitle: ''");
    }
    if (!hasSummary) {
      newLines.push("summary: ''");
    }
    
    const newFrontmatter = newLines.join('\n');
    content = content.replace(/^---\n[\s\S]*?\n---/, `---\n${newFrontmatter}\n---`);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ ${file}`);
    fixed++;
  }
});

console.log(`\n修复完成: ${fixed} 个文件`);
