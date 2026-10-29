#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
全站内容体检 — 发布前跑一遍，只读，不修改任何文件。

检查项：
  1. 登记一致性：有正文无登记 / 有登记无正文 / 日期不一致
  2. 英文字段：缺失、空值、占位符、中文泄漏
  3. 正文空壳：中文正文极短或含"待补充"，英文正文明显短于中文
  4. 日记规范：frontmatter 必备字段、九节结构、观吾/山山人称
  5. 模板中文泄漏：英文页和组件里硬编码的中文文案
  6. 新闻质量：占位英文、英文直接复制中文、疑似伪造链接、跨天重复、非 AI 内容

用法：
  python scripts/audit-content.py          # 全部检查
  python scripts/audit-content.py --quiet  # 只输出高危项
退出码：有高危问题时返回 1，便于挂到 CI / pre-push。
"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QUIET = "--quiet" in sys.argv

CJK = re.compile(r"[一-鿿]")

# 标题类字段：句子级占位也算
PLACEHOLDERS_TITLE = [
    r"^AI industry news$",
    r"^English (Title|Summary|Content|Translation)$",
    r"^TODO",
    r"Lorem ipsum",
    r"^占位",
    r"^待翻译",
    r"^English summary$",
    r"^Day \d+$",
    r"^Work diary for",
]

# 摘要/正文字段：只认硬占位，泛泛但语法正常的句子不算错
PLACEHOLDERS_BODY = [
    r"^Content (to be added|coming soon)$",
    r"^TODO",
    r"Lorem ipsum",
    r"^占位",
    r"^待翻译",
]

issues = []


def add(sev, cat, where, detail):
    issues.append({"sev": sev, "cat": cat, "where": where, "detail": detail})


# ---------------------------------------------------------------- TS 解析
def split_object_fields(text):
    """把对象内部文本按顶层 key: value 切开，字符串里的逗号不算分隔符。"""
    parts, buf, depth, quote, i = [], [], 0, None, 0
    while i < len(text):
        ch = text[i]
        if quote:
            buf.append(ch)
            if ch == "\\" and i + 1 < len(text):
                buf.append(text[i + 1])
                i += 2
                continue
            if ch == quote:
                quote = None
            i += 1
            continue
        if ch in "'\"`":
            quote = ch
            buf.append(ch)
            i += 1
            continue
        if ch in "{([":
            depth += 1
        elif ch in "})]":
            depth -= 1
        elif ch == "," and depth == 0:
            parts.append("".join(buf))
            buf = []
            i += 1
            continue
        buf.append(ch)
        i += 1
    if "".join(buf).strip():
        parts.append("".join(buf))

    out = {}
    for p in parts:
        m = re.match(r"\s*([A-Za-z_][A-Za-z0-9_]*)\s*:\s*([\s\S]*)$", p)
        if m:
            out[m.group(1)] = m.group(2).strip()
    return out


def unquote(v):
    v = v.strip()
    if len(v) >= 2 and v[0] == v[-1] and v[0] in "'\"`":
        return v[1:-1]
    return v


def parse_ts_entries(path):
    """返回 [(行号, 字段字典)]，值已去引号。"""
    if not os.path.exists(path):
        return []
    src = open(path, encoding="utf-8").read()
    start = src.find("= [")
    if start < 0:
        return []
    i, entries, depth, obj_start, quote = start + 3, [], 0, None, None
    while i < len(src):
        ch = src[i]
        if quote:
            if ch == "\\":
                i += 2
                continue
            if ch == quote:
                quote = None
            i += 1
            continue
        if ch in "'\"`":
            quote = ch
            i += 1
            continue
        if ch == "{":
            if depth == 0:
                obj_start = i
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0 and obj_start is not None:
                body = src[obj_start + 1:i]
                fields = {k: unquote(v) for k, v in split_object_fields(body).items()}
                entries.append((src.count("\n", 0, obj_start) + 1, fields))
                obj_start = None
        elif ch == "]" and depth == 0:
            break
        i += 1
    return entries


def parse_md(path):
    txt = open(path, encoding="utf-8").read()
    fm = {}
    body = txt
    m = re.match(r"^---\s*\n([\s\S]*?)\n---\s*\n", txt)
    if m:
        body = txt[m.end():]
        for line in m.group(1).splitlines():
            mm = re.match(r"^([A-Za-z_][A-Za-z0-9_]*)\s*:\s*(.*)$", line)
            if mm:
                fm[mm.group(1)] = mm.group(2).strip().strip("'\"")
    return fm, body


def plain_len(html):
    return len(re.sub(r"<[^>]+>", "", html or "").strip())


def is_placeholder(v, rules=None):
    for p in (rules or PLACEHOLDERS_BODY):
        if re.search(p, (v or "").strip(), re.I):
            return True
    return False


def check_en(field, value, where, sev="中", rules=None, leak_sev="高"):
    if value is None:
        add(sev, "英文缺失", where, "%s 字段不存在" % field)
        return
    v = value.strip()
    if not v:
        add(sev, "英文缺失", where, "%s 为空" % field)
    elif is_placeholder(v, rules):
        add("高", "占位符", where, '%s = "%s"' % (field, v[:60]))
    elif CJK.search(v):
        m = CJK.search(v)
        st = max(0, m.start() - 20)
        add(leak_sev, "中文泄漏", where, "%s 含中文：…%s…" % (field, v[st:st + 50]))


# ---------------------------------------------------------------- 各项检查
def audit_articles():
    entries = parse_ts_entries(os.path.join(ROOT, "src/data/articles.ts"))
    md_dir = os.path.join(ROOT, "src/content/articles")
    md_files = {f[:-3] for f in os.listdir(md_dir) if f.endswith(".md")} if os.path.isdir(md_dir) else set()
    seen = set()

    for lineno, f in entries:
        slug = f.get("slug", "")
        where = "articles.ts:%d (%s)" % (lineno, slug or "无slug")
        seen.add(slug)
        for k in ("slug", "date", "title", "excerpt", "tag"):
            if not f.get(k):
                add("高", "中文字段缺失", where, "%s 缺失或为空" % k)
        check_en("titleEn", f.get("titleEn"), where, "中", PLACEHOLDERS_TITLE)
        check_en("excerptEn", f.get("excerptEn"), where, "中")
        check_en("tagEn", f.get("tagEn"), where, "中")
        check_en("contentEn", f.get("contentEn"), where, "高", leak_sev="中")

        md_path = os.path.join(md_dir, slug + ".md")
        if slug and not os.path.exists(md_path):
            add("高", "有登记无正文", where, "缺少 src/content/articles/%s.md" % slug)
            continue
        if not slug:
            continue

        fm, body = parse_md(md_path)
        md_where = "articles/%s.md" % slug
        if fm.get("date") and f.get("date") and fm["date"] != f["date"]:
            add("中", "日期不一致", where, "md=%s / ts=%s" % (fm["date"], f["date"]))
        for k in ("title", "date", "summary"):
            if not fm.get(k):
                add("中", "frontmatter缺失", md_where, "%s 缺失" % k)

        # 正文空壳：中文正文几乎没有内容，或明写待补充
        zh_len = plain_len(body)
        if "待补充" in body or "内容待补" in body:
            add("高", "正文空壳", md_where, "中文正文是占位符，页面只会显示一行字")
        elif zh_len < 200:
            add("高", "正文空壳", md_where, "中文正文仅 %d 字" % zh_len)

        # 中英体量严重失衡
        en_len = plain_len(f.get("contentEn"))
        if zh_len >= 800 and en_len < zh_len * 0.2:
            add("中", "英文正文过短", where, "contentEn %d 字 vs 中文 %d 字" % (en_len, zh_len))

    for slug in sorted(md_files - seen):
        add("高", "有正文无登记", "articles/%s.md" % slug, "未注册到 articles.ts，列表页看不到")


def audit_diaries():
    entries = parse_ts_entries(os.path.join(ROOT, "src/data/diaries.ts"))
    md_dir = os.path.join(ROOT, "src/content/diaries")
    md_files = {f[:-3] for f in os.listdir(md_dir) if f.endswith(".md")} if os.path.isdir(md_dir) else set()
    seen = set()

    REQUIRED_FM = ["date", "title", "titleEn", "summary", "summaryEn",
                   "category", "categoryEn", "dayNum", "mood", "energy"]
    SECTIONS = ["📍", "🎯", "💭", "🌊", "📊", "🎁", "🌅", "✨"]

    for lineno, f in entries:
        date = f.get("date", "")
        where = "diaries.ts:%d (%s)" % (lineno, date)
        seen.add(date)
        for k in ("date", "title", "summary"):
            if not f.get(k):
                add("高", "中文字段缺失", where, "%s 缺失或为空" % k)
        check_en("categoryEn", f.get("categoryEn"), where, "中")
        check_en("contentEn", f.get("contentEn"), where, "高", leak_sev="中")

        # 中文标题本身就是"建站第 N 天"时，英文 Day N 是正确翻译
        zh_title = f.get("title") or ""
        generic_zh = re.fullmatch(r"建站第\s*\d+\s*天", zh_title.strip()) is not None
        if not (generic_zh and re.fullmatch(r"Day \d+", (f.get("titleEn") or "").strip())):
            check_en("titleEn", f.get("titleEn"), where, "中", PLACEHOLDERS_TITLE)

        # 中文摘要本身是自动生成的模板句时，英文同款模板句不算缺陷
        zh_sum = f.get("summary") or ""
        auto_zh = ("自动生成" in zh_sum) or len(zh_sum.strip()) < 20
        if not (auto_zh and (f.get("summaryEn") or "").startswith("Work diary for")):
            check_en("summaryEn", f.get("summaryEn"), where, "中", PLACEHOLDERS_TITLE)

        ce = f.get("contentEn") or ""
        if re.search(r"吴总|\bMr\. Wu\b", ce):
            add("中", "人称错误", where, "contentEn 出现「吴总/Wu」")

        md_path = os.path.join(md_dir, date + ".md")
        if date and not os.path.exists(md_path):
            add("高", "有登记无正文", where, "缺少 src/content/diaries/%s.md" % date)
            continue
        if not date:
            continue

        fm, body = parse_md(md_path)
        md_where = "diaries/%s.md" % date
        for k in REQUIRED_FM:
            if not fm.get(k):
                add("低", "frontmatter缺失", md_where, "%s 缺失" % k)
        if fm.get("date") and fm["date"] != date:
            add("高", "日期不一致", where, "md=%s / ts=%s" % (fm["date"], date))
        missing = [s for s in SECTIONS if s not in body]
        if missing:
            add("低", "结构缺失", md_where, "缺章节：" + " ".join(missing))
        if re.search(r"吴总|\bMr\. Wu\b", body):
            add("中", "人称错误", md_where, "正文出现「吴总」")
        if "观吾" not in body or "山山" not in body:
            add("低", "协作视角缺失", md_where, "正文未同时出现观吾与山山")

    for slug in sorted(md_files - seen):
        add("高", "有正文无登记", "diaries/%s.md" % slug, "未注册到 diaries.ts，列表页看不到")


# 新闻英文的占位句：旧生成脚本留下的套话，语法正常所以抓不出来，只能点名
NEWS_PH_TITLE = [
    r"^new product launched$",
    r"^new ai chip breakthrough$",
    r"^ai industry news$",
    r"^robotics industry update$",
    r"^.* industry update$",
    r"^new model released$",
    r"^research breakthrough$",
    r"^new funding round$",
]
NEWS_PH_SUMMARY = [
    r"^a new ai (product|model) has been",
    r"^advances in ai chip technology",
]


def suspect_url(u):
    """链接是编的？看结构就能认出来：连号数字、标题拼的 slug、123456 占位"""
    if not u:
        return "无链接"
    if not u.startswith("http"):
        return "链接格式异常"
    if re.search(r"/articles/\d{4}-\d{2}-\d{2}-[a-z]", u):
        return "日期+英文slug"
    if re.search(r"/20\d\d/\d\d/[a-z0-9-]{6,}\.html", u):
        return "日期目录+slug"
    digits = "".join(re.findall(r"\d+", u))
    seq = "012345678901234567890123456789"
    for i in range(len(digits) - 4):
        chunk = digits[i:i + 5]
        if chunk in seq or chunk in seq[::-1]:
            return "连号 " + chunk
    return None


def audit_news():
    path = os.path.join(ROOT, "src/data/ai-news-summary.ts")
    if not os.path.exists(path):
        return
    src = open(path, encoding="utf-8").read()
    start, end = src.find("= ["), src.rfind("]")
    if start < 0 or end < 0:
        return
    try:
        data = json.loads(src[start + 2:end + 1])
    except json.JSONDecodeError as e:
        add("高", "数据解析失败", "ai-news-summary.ts", str(e)[:120])
        return

    titles = {}
    for day in data:
        d = day.get("date", "?")
        where = "ai-news-summary.ts (%s)" % d
        for k in ("date", "title", "summary", "comment"):
            if not day.get(k):
                add("高", "中文字段缺失", where, "%s 缺失" % k)
        for k in ("titleEn", "summaryEn", "commentEn"):
            check_en(k, day.get(k), where, "中")
        for k, rules in (("titleEn", NEWS_PH_TITLE), ("summaryEn", NEWS_PH_SUMMARY)):
            v = (day.get(k) or "").strip()
            if any(re.match(p, v, re.I) for p in rules):
                add("高", "新闻占位英文", where, '%s = "%s"' % (k, v[:50]))
        items = day.get("newsItems") or []
        if not items:
            add("高", "结构缺失", where, "newsItems 为空")
        for j, it in enumerate(items, 1):
            iw = "%s 第%d条" % (where, j)
            for k in ("title", "summary", "source", "category"):
                if not it.get(k):
                    add("高", "中文字段缺失", iw, "%s 缺失" % k)
            for k in ("titleEn", "summaryEn", "categoryEn"):
                check_en(k, it.get(k), iw, "中")
            for k, rules in (("titleEn", NEWS_PH_TITLE), ("summaryEn", NEWS_PH_SUMMARY)):
                v = (it.get(k) or "").strip()
                if any(re.match(p, v, re.I) for p in rules):
                    add("高", "新闻占位英文", iw, '%s = "%s"' % (k, v[:50]))
            if it.get("titleEn") and it.get("titleEn") == it.get("title"):
                add("高", "英文复制中文", iw, "titleEn 与中文标题完全相同")
            why = suspect_url((it.get("url") or "").strip())
            if why == "无链接":
                add("低", "新闻无链接", iw, (it.get("title") or "")[:30])
            elif why:
                add("高", "疑似伪造链接", iw, "%s：%s" % (why, (it.get("url") or "")[:70]))
            if it.get("title"):
                titles.setdefault(it["title"], []).append(d)

    for t, ds in titles.items():
        if len(ds) > 1:
            add("低", "新闻重复", "ai-news-summary.ts", "「%s」出现在 %s" % (t[:40], "、".join(ds)))


def audit_templates():
    """英文页 / 组件里硬编码的中文文案。

    跳过：注释、<style> 样式块、CSS 选择器、zh/en 双语字典行、
          中英对照的括注（如 "Guanwu"（观吾））、带 lang 三元的分支。
    """
    targets = ["src/pages/en", "src/components", "src/layouts"]
    for base in targets:
        base_dir = os.path.join(ROOT, base)
        for dirpath, _, files in os.walk(base_dir):
            for name in files:
                if not name.endswith((".astro", ".ts", ".js")):
                    continue
                path = os.path.join(dirpath, name)
                rel = os.path.relpath(path, ROOT).replace("\\", "/")
                in_style = False
                window = []
                for n, line in enumerate(open(path, encoding="utf-8"), 1):
                    window = (window + [line])[-15:]
                    low = line.lower()
                    if "<style" in low:
                        in_style = True
                        continue
                    if "</style>" in low:
                        in_style = False
                        continue
                    if in_style:
                        continue
                    st = line.strip()
                    if not CJK.search(line):
                        continue
                    if st.startswith(("//", "*", "/*", "<!--")):
                        continue
                    if any(("lang" in w or "isEn" in w) for w in window):  # 双语分支
                        continue
                    if "zh:" in line and "en:" in line:  # 双语字典
                        continue
                    if re.search(r"[\[(（]\s*[^\])）]*[一-鿿][^\])）]*[\])）]", st):  # 括注说明
                        continue
                    if re.match(r"^\.[\w-].*\{", st):    # CSS 选择器
                        continue
                    add("低", "模板中文", "%s:%d" % (rel, n), st[:90])


# ---------------------------------------------------------------- 输出
def main():
    for fn in (audit_articles, audit_diaries, audit_news, audit_templates):
        try:
            fn()
        except Exception as e:  # 单项失败不该让整体崩掉
            add("高", "检查器异常", fn.__name__, repr(e)[:120])

    order = {"高": 0, "中": 1, "低": 2}
    issues.sort(key=lambda i: order.get(i["sev"], 9))

    counts = {}
    for i in issues:
        counts[i["sev"]] = counts.get(i["sev"], 0) + 1

    print("=" * 68)
    print("内容体检：%s" % "，".join("%s %d" % (k, counts.get(k, 0)) for k in ("高", "中", "低")))
    print("=" * 68)

    shown = 0
    for sev in ("高", "中", "低"):
        group = [i for i in issues if i["sev"] == sev]
        if not group:
            continue
        if QUIET and sev != "高":
            break
        print("\n----- %s (%d) -----" % (sev, len(group)))
        per_cat = {}
        for i in group:
            per_cat.setdefault(i["cat"], []).append(i)
        for cat, items in per_cat.items():
            limit = {"高": len(items), "中": 20, "低": 8}.get(sev, 8)
            for i in items[:limit]:
                print("[%s] %s :: %s" % (cat, i["where"], i["detail"]))
                shown += 1
            if len(items) > limit:
                print("[%s] ……同类共 %d 条，未逐条列出" % (cat, len(items)))
                shown += len(items) - limit

    if shown < len(issues):
        print("\n（还有 %d 条未显示，去掉 --quiet 可看全部）" % (len(issues) - shown))

    return 1 if counts.get("高") else 0


if __name__ == "__main__":
    sys.exit(main())
