// 新闻来源名中英对照
//
// ai-news-summary.ts 里的 source 一直是中文媒体名（36氪、虎嗅……），
// 中文页直接显示没问题，英文页照搬就会出现「… at 24 frames per second. 36氪 Nvidia to invest …」
// 这种一句话里嵌中文的排版。这里统一给英文页做映射，数据里的 source 保持原样不动。
//
// 新增来源只要在这里补一行；漏补时英文页会回退显示原名，体检脚本会提示。

export const SOURCE_NAMES_EN: Record<string, string> = {
  '36氪': '36Kr',
  '虎嗅': 'Huxiu',
  'IT之家': 'IT Home',
  '开源中国': 'OSChina',
  '机器之心': 'Synced',
  '量子位': 'QbitAI',
  '财联社': 'Cailian Press',
  '证券时报': 'Securities Times',
  '腾讯新闻': 'Tencent News',
  '钛媒体': 'TMTPost',
  '东方财富': 'East Money',
  '澎湃': 'The Paper',
};

/** 取来源名的英文写法；没有映射时回退原名。 */
export function sourceNameEn(name: string): string {
  const key = (name || '').trim();
  return SOURCE_NAMES_EN[key] || key;
}
