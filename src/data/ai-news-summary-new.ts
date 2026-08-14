// AI新闻汇总数据 — 每天一条汇总型，包含多条新闻整合
// 格式：date, title(汇总标题), summary(汇总摘要), newsItems(具体新闻列表), comment(一句话点评)
export interface NewsItem {
  title: string;
  titleEn?: string;
  summary: string;
  summaryEn?: string;
  source: string;
  category: string;
  categoryEn?: string;
  url?: string; // 原始新闻链接
}

export interface DailyNewsSummary {
  date: string;
  title: string;
  titleEn?: string;
  summary: string;
  summaryEn?: string;
  newsItems: NewsItem[];
  comment: string;
  commentEn?: string;
}

export const dailyNewsSummaries: DailyNewsSummary[] = [
  {
