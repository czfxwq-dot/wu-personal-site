# 半百观AI 自动日记系统

## 📋 系统概述

自动日记系统会在每天 22:00 自动生成当天的工作日记，并提交到网站。

### 功能
- ✅ 自动生成日记页面（.astro 文件）
- ✅ 自动更新 diaries.ts 数据文件
- ✅ 自动构建并部署到网站
- ✅ 记录当天工作摘要和系统统计

### 文件结构
```
scripts/
├── auto-diary.py          # 自动日记生成脚本
├── auto-deploy.sh         # 自动部署脚本
├── run-auto-diary.bat     # Windows 批处理（定时任务调用）
└── setup-auto-diary-task.ps1  # 定时任务安装脚本
```

---

## 🚀 安装定时任务

### 方法一：使用 PowerShell 脚本（推荐）

1. 右键点击 `setup-auto-diary-task.ps1`
2. 选择"使用 PowerShell 运行"
3. 如果提示权限问题，右键选择"以管理员身份运行"

### 方法二：手动创建定时任务

1. 按 `Win+R`，输入 `taskschd.msc`，回车
2. 点击右侧"创建基本任务"
3. 名称：`半百观AI自动日记`
4. 触发器：每天 22:00
5. 操作：启动程序
6. 程序：`C:\Users\czfxw\Desktop\claude项目\wu-personal-site\scripts\run-auto-diary.bat`
7. 完成

---

## 🔧 手动运行

如果需要手动生成日记：

```bash
cd "C:/Users/czfxw/Desktop/claude项目/wu-personal-site/scripts"
PYTHONIOENCODING=utf-8 python auto-diary.py
```

---

## 📊 日志查看

自动日记的运行日志保存在：
```
scripts/auto-diary.log
```

查看最新日志：
```bash
tail -20 scripts/auto-diary.log
```

---

## ⚙️ 配置说明

### 修改生成时间

编辑 PowerShell 脚本中的触发器时间：
```powershell
$trigger = New-ScheduledTaskTrigger -Daily -At 22:00  # 改为你想要的时间
```

### 修改日记内容模板

编辑 `auto-diary.py` 中的 `get_today_diary_content()` 函数。

### 禁用自动日记

1. 打开任务计划程序（`taskschd.msc`）
2. 找到"半百观AI自动日记"
3. 右键选择"禁用"或删除

---

## 🐛 故障排查

### 问题1：定时任务没有运行

**检查：**
1. 任务计划程序中任务是否启用
2. 电脑是否在 22:00 处于开机状态
3. 查看日志文件 `scripts/auto-diary.log`

### 问题2：日记生成失败

**可能原因：**
- Python 未安装或不在 PATH 中
- 脚本路径错误
- 权限不足

**解决：**
```bash
# 测试 Python
python --version

# 手动运行脚本
cd scripts
PYTHONIOENCODING=utf-8 python auto-diary.py
```

### 问题3：部署失败

**可能原因：**
- Git 未配置
- 网络连接问题
- GitHub 认证失败

**解决：**
```bash
# 检查 Git 配置
git config user.name
git config user.email

# 检查远程仓库
git remote -v

# 手动部署
cd ..
./scripts/auto-deploy.sh
```

---

## 📈 统计信息

自动日记会记录以下统计：
- 日记总数
- 半百观文章数
- AI新闻条数

这些数据会自动显示在当天的日记页面中。

---

## 🔄 更新历史

- **2026-10-18**: 初始版本
  - 自动日记生成脚本
  - Windows 定时任务支持
  - 自动部署集成

---

## 📞 技术支持

如有问题，请检查：
1. `scripts/auto-diary.log` - 运行日志
2. 任务计划程序 - 任务状态
3. Git 提交历史 - 部署记录

---

*最后更新：2026-10-18*
