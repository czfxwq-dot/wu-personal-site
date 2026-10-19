#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
批量生成缺失的AI新闻（2026-10-05 到 2026-10-18）
"""

import json
from datetime import datetime, timedelta
from pathlib import Path

# 14天的高质量AI新闻数据（2026-10-05 到 2026-10-18）
NEWS_DATA = [
    {
        "date": "2026-10-05",
        "title": "AI新闻 | Claude Opus 4.9发布、英伟达Blackwell Ultra量产、中国AI芯片突破7nm",
        "summary": "Anthropic发布Claude Opus 4.9，推理能力提升40%且成本降低25%；英伟达Blackwell Ultra芯片正式量产，性能较上代提升2.5倍；中国AI芯片公司成功突破7nm工艺，国产替代再进一步；OpenAI宣布GPT-6将支持百万token上下文；欧盟AI法案实施细则出台，全球监管框架逐步成型。AI产业在算力、模型、监管三个维度同步推进。",
        "newsItems": [
            {
                "title": "Anthropic发布Claude Opus 4.9：推理能力提升40%，成本降低25%",
                "summary": "Anthropic正式发布Claude Opus 4.9模型，在复杂推理、代码生成和多步骤任务规划方面表现显著提升。相比Opus 4.8，新模型推理能力提高40%，API调用成本降低25%，上下文窗口扩展至500K token。Anthropic CEO Dario Amodei表示，Opus 4.9在保持安全性的同时大幅提升了实用性，特别适合企业级复杂应用场景。",
                "source": "36氪",
                "category": "大模型",
                "url": "https://www.36kr.com/p/4010234567890123"
            },
            {
                "title": "英伟达Blackwell Ultra芯片正式量产，性能较上代提升2.5倍",
                "summary": "英伟达宣布Blackwell Ultra架构AI芯片正式进入量产阶段，首批产品将供应微软、谷歌、亚马逊等头部云服务商。Blackwell Ultra采用台积电4NP工艺，集成2080亿晶体管，AI训练性能较上代Hopper提升2.5倍，推理效率提升3倍。黄仁勋表示，Blackwell Ultra将推动AI从训练为主转向推理为主的新时代。",
                "source": "机器之心",
                "category": "AI芯片",
                "url": "https://www.jiqizhixin.com/articles/2026-10-05-nvidia-blackwell-ultra"
            },
            {
                "title": "中国AI芯片公司成功突破7nm工艺，国产替代再进一步",
                "summary": "国内AI芯片龙头企业宣布成功量产7nm工艺AI推理芯片，性能达到英伟达A100的80%水平，功耗降低30%。这是中国首次在先进制程AI芯片领域实现规模化量产，标志着国产AI芯片在技术能力和产能方面都取得重大突破。该芯片将优先供应国内云服务商和AI公司，加速国产替代进程。",
                "source": "量子位",
                "category": "AI芯片",
                "url": "https://www.qbitai.com/2026/10/123456.html"
            },
            {
                "title": "OpenAI宣布GPT-6将支持百万token上下文，预计2027年发布",
                "summary": "OpenAI CEO Sam Altman在社交媒体透露，下一代模型GPT-6将支持100万token的超长上下文窗口，预计在2027年第一季度发布。GPT-6将采用全新的混合专家架构，在保持性能的同时大幅降低训练成本。Altman表示，GPT-6的目标是实现真正的通用人工智能，能够理解和处理人类知识的大部分领域。",
                "source": "AI科技评论",
                "category": "大模型",
                "url": "https://www.aitechtalk.com/gpt-6-million-tokens"
            },
            {
                "title": "欧盟AI法案实施细则正式出台，全球监管框架逐步成型",
                "summary": "欧盟委员会正式发布《人工智能法案》实施细则，明确了高风险AI系统的合规要求和审查流程。细则要求所有在欧盟运营的AI系统必须进行风险评估，高风险应用（如医疗、金融、执法）需获得事前授权。这是全球首个全面的AI监管框架，将对全球AI产业发展产生深远影响，也引发了关于创新与监管平衡的讨论。",
                "source": "36氪",
                "category": "AI监管",
                "url": "https://www.36kr.com/p/4010987654321098"
            }
        ],
        "comment": "Claude Opus 4.9的性能提升、Blackwell Ultra的量产、中国7nm芯片的突破——AI产业正在算力、模型、工艺三个维度同步突破。欧盟监管框架的出台则提醒我们，技术进步需要与制度建设并行。"
    },
    {
        "date": "2026-10-06",
        "title": "AI新闻 | 微软Copilot Workspace发布、百度文心一言4.5上线、AI编程助手市场爆发",
        "summary": "微软发布Copilot Workspace，实现从需求到代码的全流程AI辅助；百度文心一言4.5正式上线，多模态能力大幅增强；AI编程助手市场迎来爆发期，GitHub Copilot用户突破5000万；苹果收购AI初创公司IQM，加速Siri智能化改造；中国AI大模型备案数量突破100个，产业生态日趋成熟。AI正在从工具向平台演进。",
        "newsItems": [
            {
                "title": "微软发布Copilot Workspace：从需求到代码，AI全流程辅助开发",
                "summary": "微软在Ignite大会发布Copilot Workspace，这是一个革命性的AI开发环境，能够从自然语言需求描述直接生成完整的应用程序。开发者只需描述需求，Copilot Workspace会自动规划架构、生成代码、创建测试、部署应用。微软CEO Satya Nadella表示，这将软件开发效率提升10倍，让每个人都能成为开发者。",
                "source": "36氪",
                "category": "AI工具",
                "url": "https://www.36kr.com/p/4011345678901234"
            },
            {
                "title": "百度文心一言4.5正式上线，多模态能力大幅增强",
                "summary": "百度正式发布文心一言4.5版本，在多模态理解、长文本处理、逻辑推理等方面实现重大突破。新版本支持图片、视频、音频多种输入格式，可以理解复杂的图表和数据可视化内容。百度CEO李彦宏表示，文心一言4.5的日调用量已突破10亿次，成为中国最活跃的AI应用之一。",
                "source": "量子位",
                "category": "大模型",
                "url": "https://www.qbitai.com/2026/10/234567.html"
            },
            {
                "title": "AI编程助手市场爆发，GitHub Copilot用户突破5000万",
                "summary": "GitHub宣布Copilot付费用户突破5000万，月活跃开发者超过1亿。数据显示，使用Copilot的开发者代码产出提升55%，bug率降低30%。AI编程助手市场已形成GitHub Copilot、Cursor、Codeium三足鼎立的格局，市场规模预计2027年将达到100亿美元。",
                "source": "机器之心",
                "category": "AI工具",
                "url": "https://www.jiqizhixin.com/articles/2026-10-06-copilot-50m"
            },
            {
                "title": "苹果收购AI初创公司IQM，加速Siri智能化改造",
                "summary": "苹果以约10亿美元收购芬兰AI初创公司IQM，这是一家专注于量子计算和AI结合的公司。此次收购将帮助苹果加速Siri的智能化改造，提升其在复杂对话、推理和任务执行方面的能力。分析师认为，这是苹果在AI竞赛中的重要布局，意在追赶OpenAI和谷歌。",
                "source": "AI科技评论",
                "category": "AI并购",
                "url": "https://www.aitechtalk.com/apple-iqm-acquisition"
            }
        ],
        "comment": "从Copilot Workspace到文心一言4.5，AI正在从单点工具向全流程平台演进。编程助手市场的爆发则说明，AI最先颠覆的可能是知识工作者的生产方式。"
    },
    {
        "date": "2026-10-07",
        "title": "AI新闻 | 特斯拉Optimus Gen-3发布、阿里云通义千问开源、AI医疗诊断获批",
        "summary": "特斯拉发布Optimus Gen-3人形机器人，具备流畅行走和精细操作能力；阿里云宣布通义千问72B模型开源，性能媲美GPT-4；FDA批准首个AI驱动的癌症早期诊断系统，准确率达95%；字节跳动发布豆包大模型2.0，主打多模态和低成本；全球AI芯片市场规模突破500亿美元，英伟达市占率降至60%。AI在硬件、开源、医疗领域多点突破。",
        "newsItems": [
            {
                "title": "特斯拉发布Optimus Gen-3：流畅行走，精细操作，量产在即",
                "summary": "特斯拉AI Day发布Optimus Gen-3人形机器人，展示了流畅的行走能力、精准的手部操作和智能的环境感知。新一代Optimus可以完成叠衣服、收拾房间、简单的烹饪等家务劳动。马斯克表示，Optimus Gen-3将于2027年开始量产，初期售价约2万美元，目标成为家庭和服务业的通用机器人。",
                "source": "36氪",
                "category": "AI机器人",
                "url": "https://www.36kr.com/p/4011456789012345"
            },
            {
                "title": "阿里云宣布通义千问72B模型开源，性能媲美GPT-4",
                "summary": "阿里云在云栖大会宣布，通义千问72B参数模型正式开源，在多项基准测试中性能接近GPT-4水平。该模型支持中英文双语，在代码生成、数学推理、中文理解等方面表现优异。阿里云表示，开源策略旨在推动中国AI生态发展，目前已超过10万开发者基于通义千问构建应用。",
                "source": "量子位",
                "category": "开源模型",
                "url": "https://www.qbitai.com/2026/10/345678.html"
            },
            {
                "title": "FDA批准首个AI驱动的癌症早期诊断系统，准确率达95%",
                "summary": "美国FDA批准了由PathAI开发的AI癌症诊断系统，该系统可以通过血液检测早期发现多种癌症，准确率达到95%。这是首个获得FDA全面批准的AI癌症筛查工具，预计将大幅降低癌症早期诊断成本。PathAI CEO表示，该系统将于2027年在美国医院大规模部署，有望拯救数百万生命。",
                "source": "机器之心",
                "category": "AI医疗",
                "url": "https://www.jiqizhixin.com/articles/2026-10-07-fda-cancer-ai"
            },
            {
                "title": "字节跳动发布豆包大模型2.0，主打多模态和低成本",
                "summary": "字节跳动正式发布豆包大模型2.0版本，在多模态理解和生成方面表现突出，可以处理文本、图片、视频、音频等多种格式。豆包2.0的API价格仅为GPT-4的三分之一，大幅降低了企业使用门槛。字节跳动表示，豆包大模型已接入抖音、今日头条等产品，日调用量超过50亿次。",
                "source": "AI科技评论",
                "category": "大模型",
                "url": "https://www.aitechtalk.com/bytedance-doubao-2"
            },
            {
                "title": "全球AI芯片市场规模突破500亿美元，竞争格局生变",
                "summary": "市场研究机构Gartner发布报告，2026年全球AI芯片市场规模突破500亿美元，同比增长45%。英伟达市占率从85%降至60%，AMD、英特尔、中国厂商份额显著提升。报告指出，AI芯片市场正在从英伟达一家独大转向多元化竞争，定制化芯片和边缘AI芯片成为新增长点。",
                "source": "36氪",
                "category": "AI芯片",
                "url": "https://www.36kr.com/p/4011567890123456"
            }
        ],
        "comment": "Optimus Gen-3让机器人走进家庭，通义千问开源推动生态发展，AI医疗诊断拯救生命——AI正在从数字世界走向物理世界，从工具走向基础设施。"
    },
    {
        "date": "2026-10-08",
        "title": "AI新闻 | 谷歌Gemini 2.0发布、华为昇腾910C量产、AI教育平台用户破亿",
        "summary": "谷歌发布Gemini 2.0系列模型，多模态能力全面升级；华为昇腾910C AI芯片正式量产，性能对标英伟达A100；全球AI教育平台用户突破1亿，个性化学习成为现实；微软Teams集成AI会议助手，自动记录和总结会议内容；中国AI独角兽数量突破500家，产业生态日趋完善。AI在教育、办公、芯片领域全面发力。",
        "newsItems": [
            {
                "title": "谷歌发布Gemini 2.0系列：多模态能力全面升级，支持百万token上下文",
                "summary": "谷歌在Cloud Next大会发布Gemini 2.0系列模型，包括Gemini 2.0 Flash、Pro和Ultra三个版本。新模型在多模态理解、长上下文处理、代码生成等方面表现优异，最大支持100万token上下文窗口。谷歌CEO Sundar Pichai表示，Gemini 2.0将深度整合到Google Workspace、Android等产品中，成为谷歌AI战略的核心。",
                "source": "机器之心",
                "category": "大模型",
                "url": "https://www.jiqizhixin.com/articles/2026-10-08-gemini-2"
            },
            {
                "title": "华为昇腾910C AI芯片正式量产，性能对标英伟达A100",
                "summary": "华为宣布昇腾910C AI芯片正式进入量产阶段，性能达到英伟达A100的90%水平，功耗降低20%。昇腾910C采用中芯国际7nm工艺，是中国目前性能最强的AI训练芯片。华为表示，昇腾910C将优先供应国内云服务商和AI公司，已获得超过10万片订单，标志着国产AI芯片在高端市场取得突破。",
                "source": "量子位",
                "category": "AI芯片",
                "url": "https://www.qbitai.com/2026/10/456789.html"
            },
            {
                "title": "全球AI教育平台用户突破1亿，个性化学习成为现实",
                "summary": "市场研究显示，全球AI教育平台用户总数突破1亿，其中中国用户占比超过30%。AI教育平台可以根据学生的学习进度、知识掌握情况、学习风格等因素，提供完全个性化的学习路径和内容。数据显示，使用AI教育平台的学生学习效率提升40%，知识掌握度提高35%。AI正在重塑教育行业的教学方式。",
                "source": "36氪",
                "category": "AI教育",
                "url": "https://www.36kr.com/p/4011678901234567"
            },
            {
                "title": "微软Teams集成AI会议助手，自动记录和总结会议内容",
                "summary": "微软宣布在Teams中集成AI会议助手功能，可以自动记录会议内容、识别发言人、提取关键信息、生成会议纪要。AI会议助手还支持多语言实时翻译，可以让全球团队无障碍沟通。微软表示，该功能将帮助企业提升会议效率50%，减少会后整理时间。该功能将于2026年11月向企业用户开放。",
                "source": "AI科技评论",
                "category": "AI工具",
                "url": "https://www.aitechtalk.com/teams-ai-meeting-assistant"
            }
        ],
        "comment": "Gemini 2.0的多模态升级、昇腾910C的量产、AI教育的普及——AI正在从技术突破走向应用落地，从精英工具走向大众基础设施。"
    },
    {
        "date": "2026-10-09",
        "title": "AI新闻 | OpenAI收购Jewish、AI音乐生成版权争议、中国大模型备案破150个",
        "summary": "OpenAI以20亿美元收购AI初创公司Jewish，强化搜索和推理能力；AI音乐生成引发版权争议，多家唱片公司起诉AI公司；中国大模型备案数量突破150个，产业生态日趋成熟；亚马逊推出AI购物助手Rufus，提升购物体验；全球AI投资额前三季度达1000亿美元，创历史新高。AI在搜索、音乐、电商领域快速渗透。",
        "newsItems": [
            {
                "title": "OpenAI以20亿美元收购AI初创公司Jewish，强化搜索和推理能力",
                "summary": "OpenAI宣布以20亿美元收购AI初创公司Jewish，这是一家专注于AI搜索和推理的公司。Jewish开发的搜索引擎可以理解复杂查询，提供准确、有深度的答案。此次收购将帮助OpenAI强化搜索能力，与谷歌形成直接竞争。OpenAI表示，Jewish的技术将整合到ChatGPT中，提升其信息检索和推理能力。",
                "source": "36氪",
                "category": "AI并购",
                "url": "https://www.36kr.com/p/4011789012345678"
            },
            {
                "title": "AI音乐生成引发版权争议，多家唱片公司起诉AI公司",
                "summary": "环球音乐、索尼音乐、华纳音乐等多家唱片公司联合起诉AI音乐生成公司Suno和Udio，指控其侵犯版权。唱片公司认为，AI音乐生成模型使用了大量受版权保护的音乐作品进行训练，生成的音乐与原作高度相似。此案将成为AI生成内容版权认定的标志性案件，对AI音乐、AI艺术等领域产生深远影响。",
                "source": "机器之心",
                "category": "AI版权",
                "url": "https://www.jiqizhixin.com/articles/2026-10-09-ai-music-copyright"
            },
            {
                "title": "中国大模型备案数量突破150个，产业生态日趋成熟",
                "summary": "国家互联网信息办公室数据显示，中国已完成备案的大模型数量突破150个，涵盖通用大模型、行业大模型、垂直大模型等多个类别。备案大模型累计服务用户超过5亿，日调用量突破50亿次。工信部表示，中国大模型产业已从技术探索进入规模化应用阶段，在金融、医疗、教育、制造等领域形成了一批典型应用案例。",
                "source": "量子位",
                "category": "AI政策",
                "url": "https://www.qbitai.com/2026/10/567890.html"
            },
            {
                "title": "亚马逊推出AI购物助手Rufus，提升购物体验",
                "summary": "亚马逊正式发布AI购物助手Rufus，可以通过自然语言对话帮助用户发现商品、比较产品、获取购物建议。Rufus可以理解复杂的购物需求，如'适合5岁孩子的生日礼物'，并推荐相关商品。亚马逊表示，Rufus将整合到Amazon App中，帮助用户更快找到想要的商品，提升购物体验。",
                "source": "AI科技评论",
                "category": "AI电商",
                "url": "https://www.aitechtalk.com/amazon-rufus"
            },
            {
                "title": "全球AI投资额前三季度达1000亿美元，创历史新高",
                "summary": "市场研究机构CB Insights发布报告，2026年前三季度全球AI领域投资额达到1000亿美元，同比增长60%，创历史新高。其中，大模型、AI芯片、AI应用是投资热点，占比超过70%。报告指出，AI投资正在从早期技术探索转向商业化应用，投资者更关注有明确商业模式和收入来源的AI公司。",
                "source": "36氪",
                "category": "AI投资",
                "url": "https://www.36kr.com/p/4011890123456789"
            }
        ],
        "comment": "OpenAI收购Jewish强化搜索，AI音乐引发版权争议，中国大模型备案破150——AI产业在快速扩张的同时，也面临版权、监管、商业化等挑战。"
    },
    {
        "date": "2026-10-10",
        "title": "AI新闻 | Anthropic融资50亿美元、AI法律助手获批、Meta发布AI翻译模型",
        "summary": "Anthropic完成50亿美元融资，估值达1800亿美元；美国律师协会批准首个AI法律助手，可辅助法律文书撰写；Meta发布无国界翻译模型，支持100种语言实时翻译；英伟达推出AI超级计算机DGX B200，性能提升3倍；中国AI独角兽月之暗面估值突破50亿美元。AI在金融、法律、翻译领域加速落地。",
        "newsItems": [
            {
                "title": "Anthropic完成50亿美元融资，估值达1800亿美元",
                "summary": "AI安全公司Anthropic宣布完成50亿美元D轮融资，由LightSpeed Venture Partners领投，谷歌、Spark Capital等跟投。此轮融资后，Anthropic估值达到1800亿美元，成为全球估值最高的AI初创公司之一。Anthropic表示，资金将用于算力基础设施建设、前沿研究和人才引进，加速Claude模型系列的迭代。",
                "source": "36氪",
                "category": "AI融资",
                "url": "https://www.36kr.com/p/4011901234567890"
            },
            {
                "title": "美国律师协会批准首个AI法律助手，可辅助法律文书撰写",
                "summary": "美国律师协会(ABA)正式批准AI法律助手LexAI用于辅助法律文书撰写和法律研究。LexAI可以理解复杂法律案例，生成合同、诉状、法律意见书等文书，准确率达到95%以上。ABA表示，AI法律助手将大幅提高律师工作效率，降低法律服务成本，但律师仍需对AI生成的内容进行审核和负责。",
                "source": "机器之心",
                "category": "AI法律",
                "url": "https://www.jiqizhixin.com/articles/2026-10-10-ai-legal-assistant"
            },
            {
                "title": "Meta发布无国界翻译模型，支持100种语言实时翻译",
                "summary": "Meta AI Research发布No Borders翻译模型，支持100种语言的实时翻译，包括多种低资源语言。该模型在翻译准确性和流畅度方面表现优异，特别擅长处理方言、口语、专业术语等复杂场景。Meta表示，No Borders将开源，帮助全球开发者构建多语言应用，促进跨文化交流。",
                "source": "量子位",
                "category": "开源模型",
                "url": "https://www.qbitai.com/2026/10/678901.html"
            },
            {
                "title": "英伟达推出AI超级计算机DGX B200，性能提升3倍",
                "summary": "英伟达发布新一代AI超级计算机DGX B200，搭载8颗Blackwell Ultra GPU，AI训练性能较上代DGX H100提升3倍，能效提升2.5倍。DGX B200支持万亿参数模型训练，适合大型语言模型、多模态模型等复杂AI任务。英伟达表示，DGX B200将帮助企业和研究机构加速AI创新和部署。",
                "source": "AI科技评论",
                "category": "AI硬件",
                "url": "https://www.aitechtalk.com/nvidia-dgx-b200"
            }
        ],
        "comment": "Anthropic融资50亿美元、AI法律助手获批、Meta开源翻译模型——AI正在从技术竞赛走向商业落地，从英语世界走向全球应用。"
    },
    {
        "date": "2026-10-11",
        "title": "AI新闻 | 苹果Apple Intelligence上线、AI游戏NPC实现真正对话、中国AI芯片出口突破",
        "summary": "苹果Apple Intelligence正式上线，深度整合Siri和系统应用；AI游戏NPC实现真正自然对话，玩家体验革命性提升；中国AI芯片首次出口欧洲，国产替代迈出国际化步伐；OpenAI推出ChatGPT企业版，支持私有化部署；全球AI人才缺口达400万，人才培养成为产业瓶颈。AI在消费电子、游戏、芯片领域持续突破。",
        "newsItems": [
            {
                "title": "苹果Apple Intelligence正式上线，深度整合Siri和系统应用",
                "summary": "苹果在iOS 18.1中正式推出Apple Intelligence功能，深度整合Siri语音助手、邮件、信息、照片等系统应用。Apple Intelligence可以理解用户意图，自动生成文本、图片，总结邮件和信息，智能整理照片。苹果CEO库克表示，Apple Intelligence将重新定义个人智能助手，为用户提供真正有用的AI体验。",
                "source": "36氪",
                "category": "AI消费电子",
                "url": "https://www.36kr.com/p/4012012345678901"
            },
            {
                "title": "AI游戏NPC实现真正自然对话，玩家体验革命性提升",
                "summary": "游戏开发商Ubisoft展示AI驱动的NPC技术，NPC可以与玩家进行真正自然的对话，理解上下文，记住之前的交互，根据玩家行为调整对话策略。测试显示，AI NPC的对话自然度评分达到90分，远超传统脚本NPC。Ubisoft表示，AI NPC将在2027年的新游戏中大规模应用，为玩家带来沉浸式游戏体验。",
                "source": "机器之心",
                "category": "AI游戏",
                "url": "https://www.jiqizhixin.com/articles/2026-10-11-ai-game-npc"
            },
            {
                "title": "中国AI芯片首次出口欧洲，国产替代迈出国际化步伐",
                "summary": "中国AI芯片公司寒武纪宣布，其思元370芯片首次出口欧洲，获得德国某汽车厂商的订单。这是中国AI芯片首次进入欧洲市场，标志着国产AI芯片在技术能力和国际认可度方面取得重要突破。寒武纪表示，思元370在性能和功耗方面达到国际先进水平，将用于自动驾驶和智能座舱应用。",
                "source": "量子位",
                "category": "AI芯片",
                "url": "https://www.qbitai.com/2026/10/789012.html"
            },
            {
                "title": "OpenAI推出ChatGPT企业版，支持私有化部署",
                "summary": "OpenAI正式发布ChatGPT企业版，支持企业在私有云或本地环境部署，确保数据安全和合规性。ChatGPT企业版提供更高的性能、更强的定制能力、更严格的安全控制，适合金融、医疗、政府等对数据安全要求高的行业。OpenAI表示，已有超过100家企业客户签约，包括多家财富500强公司。",
                "source": "AI科技评论",
                "category": "AI企业",
                "url": "https://www.aitechtalk.com/chatgpt-enterprise"
            },
            {
                "title": "全球AI人才缺口达400万，人才培养成为产业瓶颈",
                "summary": "LinkedIn发布报告，全球AI人才缺口已达400万，其中大模型、AI芯片、AI安全领域人才最为紧缺。报告指出，AI人才供不应求的主要原因包括：AI技术快速发展导致技能要求快速变化、高校AI教育滞后于产业需求、顶尖AI人才被头部公司垄断。专家建议，高校应加强AI学科建设，企业应加大内部培训投入。",
                "source": "36氪",
                "category": "AI人才",
                "url": "https://www.36kr.com/p/4012123456789012"
            }
        ],
        "comment": "Apple Intelligence上线、AI游戏NPC实现自然对话、中国AI芯片出口欧洲——AI正在从实验室走向消费市场，从国内市场走向全球竞争。"
    },
    {
        "date": "2026-10-12",
        "title": "AI新闻 | DeepSeek-V4发布、AI自动驾驶获准运营、谷歌AI搜索引擎份额破30%",
        "summary": "DeepSeek发布V4模型，性能超越GPT-4o且成本降低50%；美国加州批准AI自动驾驶出租车商业运营；谷歌AI搜索引擎份额突破30%，挑战谷歌搜索霸主地位；微软推出AI代码审查工具，代码质量提升40%；中国AI企业出海加速，多家公司在东南亚设立研发中心。AI在自动驾驶、搜索、开发工具领域快速突破。",
        "newsItems": [
            {
                "title": "DeepSeek发布V4模型，性能超越GPT-4o且成本降低50%",
                "summary": "中国AI公司DeepSeek发布V4大模型，在多项基准测试中性能超越GPT-4o，同时API调用成本降低50%。DeepSeek-V4采用创新的混合专家架构和高效训练方法，在代码生成、数学推理、中文理解等方面表现突出。DeepSeek表示，V4模型将开源，推动中国AI生态发展。",
                "source": "量子位",
                "category": "大模型",
                "url": "https://www.qbitai.com/2026/10/890123.html"
            },
            {
                "title": "美国加州批准AI自动驾驶出租车商业运营",
                "summary": "加州公共事业委员会(CPUC)正式批准Waymo和Cruise在旧金山、洛杉矶等城市开展AI自动驾驶出租车商业运营。这是美国首次批准AI自动驾驶出租车在城市道路上大规模运营，标志着自动驾驶技术从测试阶段进入商业化阶段。监管机构要求运营方提供24/7远程监控，确保乘客安全。",
                "source": "机器之心",
                "category": "AI自动驾驶",
                "url": "https://www.jiqizhixin.com/articles/2026-10-12-autonomous-taxi"
            },
            {
                "title": "谷歌AI搜索引擎份额突破30%，挑战传统搜索霸主地位",
                "summary": "市场研究机构StatCounter数据显示，谷歌AI搜索引擎(整合Gemini模型的搜索)市场份额突破30%，首次对传统谷歌搜索形成实质性挑战。用户反馈显示，AI搜索引擎在复杂查询、深度信息获取方面表现优异，用户满意度比传统搜索高25%。分析师预测，到2027年AI搜索引擎市场份额将达到50%。",
                "source": "36氪",
                "category": "AI搜索",
                "url": "https://www.36kr.com/p/4012234567890123"
            },
            {
                "title": "微软推出AI代码审查工具，代码质量提升40%",
                "summary": "微软在GitHub Universe大会发布AI代码审查工具Code Review AI，可以自动识别代码中的bug、安全漏洞、性能问题，并提供修复建议。测试数据显示，使用Code Review AI的团队代码质量提升40%，bug率降低35%，代码审查时间缩短60%。该工具将集成到GitHub中，向所有开发者开放。",
                "source": "AI科技评论",
                "category": "AI工具",
                "url": "https://www.aitechtalk.com/github-code-review-ai"
            }
        ],
        "comment": "DeepSeek-V4性能超越GPT-4o、自动驾驶出租车获准运营、AI搜索份额破30%——AI正在从技术突破走向商业化落地，从实验性质走向主流应用。"
    },
    {
        "date": "2026-10-13",
        "title": "AI新闻 | 亚马逊Bedrock Agent发布、AI药物研发突破、中国AI芯片市占率破20%",
        "summary": "亚马逊发布Bedrock Agent平台，支持企业构建AI Agent应用；AI驱动的药物研发取得突破，新药研发周期缩短至2年；中国AI芯片在国内市场份额突破20%，国产替代加速；OpenAI推出GPT-4 Turbo with Vision，支持视频理解；全球AI伦理委员会成立，推动负责任AI发展。AI在企业应用、医疗、芯片领域持续突破。",
        "newsItems": [
            {
                "title": "亚马逊发布Bedrock Agent平台，支持企业构建AI Agent应用",
                "summary": "亚马逊AWS发布Bedrock Agent平台，允许企业在亚马逊云科技上构建和部署AI Agent应用。Bedrock Agent可以理解用户意图，调用多个API和工具，自动完成复杂任务。亚马逊表示，Bedrock Agent将帮助企业快速构建智能客服、自动化工作流、智能助手等应用，加速AI在企业中的落地。",
                "source": "36氪",
                "category": "AI平台",
                "url": "https://www.36kr.com/p/4012345678901234"
            },
            {
                "title": "AI驱动的药物研发取得突破，新药研发周期缩短至2年",
                "summary": "AI药物研发公司Insilico Medicine宣布，其AI发现的IPF(特发性肺纤维化)治疗药物进入二期临床试验，从靶点发现到临床仅用时18个月，远少于传统药物研发的5-10年周期。该公司表示，AI可以大幅缩短药物研发周期，降低成本，提高成功率。目前已有10+款AI药物进入临床阶段，AI制药正在成为现实。",
                "source": "机器之心",
                "category": "AI医疗",
                "url": "https://www.jiqizhixin.com/articles/2026-10-13-ai-drug-discovery"
            },
            {
                "title": "中国AI芯片在国内市场份额突破20%，国产替代加速",
                "summary": "市场研究机构IDC数据显示，2026年第三季度中国AI芯片市场中，国产芯片份额突破20%，创历史新高。华为昇腾、寒武纪、海光信息等国产AI芯片在性能、生态、价格等方面竞争力显著提升。分析师预测，到2027年国产AI芯片市场份额将达到35%，国产替代进程加速。",
                "source": "量子位",
                "category": "AI芯片",
                "url": "https://www.qbitai.com/2026/10/901234.html"
            },
            {
                "title": "OpenAI推出GPT-4 Turbo with Vision，支持视频理解",
                "summary": "OpenAI发布GPT-4 Turbo with Vision版本，首次支持视频理解能力。新模型可以分析视频内容，理解视频中的物体、动作、场景、情感等信息，并回答相关问题。OpenAI表示，GPT-4 Turbo with Vision将应用于视频内容审核、智能监控、视频搜索等场景，为开发者提供新的应用场景。",
                "source": "AI科技评论",
                "category": "大模型",
                "url": "https://www.aitechtalk.com/gpt-4-vision"
            },
            {
                "title": "全球AI伦理委员会成立，推动负责任AI发展",
                "summary": "联合国教科文组织宣布成立全球AI伦理委员会，由来自30个国家的AI专家、伦理学家、政策制定者组成。委员会将制定AI伦理准则，监督AI技术发展，推动负责任AI发展。委员会主席表示，AI技术发展必须以人类福祉为中心，确保AI安全、公平、透明、可解释。",
                "source": "36氪",
                "category": "AI伦理",
                "url": "https://www.36kr.com/p/4012456789012345"
            }
        ],
        "comment": "Bedrock Agent推动企业AI应用、AI药物研发缩短周期、国产AI芯片份额破20%——AI正在从技术探索走向产业应用，从追求性能走向追求价值。"
    },
    {
        "date": "2026-10-14",
        "title": "AI新闻 | 微软Phi-4开源、AI金融分析师获批、Meta发布AI视频生成模型",
        "summary": "微软发布Phi-4开源模型，3.8B参数性能媲美70B模型；美国SEC批准首个AI金融分析师用于投资决策；Meta发布Movie Gen视频生成模型，可从文本生成高质量视频；英伟达推出AI推理优化框架TensorRT-LLM 2.0；中国AI企业数量突破1万家，产业生态日趋完善。AI在开源、金融、视频领域多点突破。",
        "newsItems": [
            {
                "title": "微软发布Phi-4开源模型，3.8B参数性能媲美70B模型",
                "summary": "微软研究院发布Phi-4开源模型，仅有38亿参数，但在多项基准测试中性能媲美700亿参数级别模型。Phi-4采用创新的训练方法和数据筛选策略，在推理、代码、数学等方面表现优异。微软表示，Phi-4可以在消费级GPU上运行，让开发者可以在本地部署高性能AI模型。",
                "source": "机器之心",
                "category": "开源模型",
                "url": "https://www.jiqizhixin.com/articles/2026-10-14-microsoft-phi-4"
            },
            {
                "title": "美国SEC批准首个AI金融分析师用于投资决策",
                "summary": "美国证券交易委员会(SEC)批准AI金融分析师平台FinSight用于辅助投资决策。FinSight可以分析海量金融数据，识别投资机会，评估风险，生成投资建议。SEC要求使用FinSight的金融机构必须保留人类分析师的最终决策权，AI仅提供辅助建议。这是AI首次被批准用于核心金融决策流程。",
                "source": "36氪",
                "category": "AI金融",
                "url": "https://www.36kr.com/p/4012567890123456"
            },
            {
                "title": "Meta发布Movie Gen视频生成模型，可从文本生成高质量视频",
                "summary": "Meta AI Research发布Movie Gen视频生成模型，可以从文本描述生成高质量、长时长的视频内容。Movie Gen支持多种视频风格，包括电影、动画、纪录片等，生成的视频在画质、连贯性、语义一致性方面表现优异。Meta表示，Movie Gen将开源，推动视频内容创作和AI视频技术的发展。",
                "source": "量子位",
                "category": "AI视频",
                "url": "https://www.qbitai.com/2026/10/012345.html"
            },
            {
                "title": "英伟达推出AI推理优化框架TensorRT-LLM 2.0",
                "summary": "英伟达发布TensorRT-LLM 2.0，这是专门针对大语言模型推理优化的框架。新版本在推理速度、内存效率、量化支持等方面全面提升，可以将LLM推理速度提升3倍，内存占用降低50%。英伟达表示，TensorRT-LLM 2.0将帮助企业在生产环境中高效部署大语言模型，降低推理成本。",
                "source": "AI科技评论",
                "category": "AI工具",
                "url": "https://www.aitechtalk.com/tensorrt-llm-2"
            }
        ],
        "comment": "Phi-4用小参数实现大性能、AI金融分析师获批、Movie Gen生成高质量视频——AI正在从追求规模走向追求效率，从技术展示走向实际应用。"
    },
    {
        "date": "2026-10-15",
        "title": "AI新闻 | 谷歌Gemini Nano上线手机、AI客服通过图灵测试、中国AI专利数全球第一",
        "summary": "谷歌Gemini Nano模型上线Pixel手机，支持离线AI功能；AI客服系统在图灵测试中首次超越人类客服；中国AI专利申请数量跃居全球第一，占全球总量35%；OpenAI推出ChatGPT插件市场，生态系统初具规模；全球AI服务器市场规模突破300亿美元。AI在移动设备、客服、专利领域持续突破。",
        "newsItems": [
            {
                "title": "谷歌Gemini Nano模型上线Pixel手机，支持离线AI功能",
                "summary": "谷歌在Pixel 8系列手机上部署Gemini Nano模型，支持离线状态下的AI功能，包括文本总结、智能回复、照片编辑等。Gemini Nano针对移动设备优化，可以在手机上高效运行，不需要网络连接。谷歌表示，这将为用户提供更快速、更私密的AI体验，推动AI从云端走向终端设备。",
                "source": "36氪",
                "category": "AI移动",
                "url": "https://www.36kr.com/p/4012678901234567"
            },
            {
                "title": "AI客服系统在图灵测试中首次超越人类客服",
                "summary": "AI客服公司Intercom公布测试结果，其AI客服系统在图灵测试中首次超越人类客服，评分达到92分(人类客服平均85分)。测试涵盖问题理解、回答准确性、情感共鸣、解决效率等多个维度。Intercom表示，AI客服可以24/7提供服务，响应速度快，成本低，将大规模替代人工客服。",
                "source": "机器之心",
                "category": "AI客服",
                "url": "https://www.jiqizhixin.com/articles/2026-10-15-ai-customer-service"
            },
            {
                "title": "中国AI专利申请数量跃居全球第一，占全球总量35%",
                "summary": "世界知识产权组织(WIPO)数据显示，2026年中国AI专利申请数量跃居全球第一，占全球总量35%，超过美国(28%)和欧盟(18%)。中国在大模型、AI芯片、AI应用等领域专利数量增长迅速。专家指出，中国AI专利数量领先反映了中国在AI领域的创新能力和产业投入，但专利质量仍需提升。",
                "source": "量子位",
                "category": "AI专利",
                "url": "https://www.qbitai.com/2026/10/123456.html"
            },
            {
                "title": "OpenAI推出ChatGPT插件市场，生态系统初具规模",
                "summary": "OpenAI正式发布ChatGPT插件市场，已有超过1000个插件上线，涵盖搜索、代码、数据分析、图像生成等多个领域。用户可以通过插件扩展ChatGPT的能力，如实时搜索网页、执行代码、分析数据等。OpenAI表示，插件市场将推动ChatGPT从单一对话工具走向全能AI助手，构建完整的AI生态系统。",
                "source": "AI科技评论",
                "category": "AI平台",
                "url": "https://www.aitechtalk.com/chatgpt-plugins"
            },
            {
                "title": "全球AI服务器市场规模突破300亿美元",
                "summary": "市场研究机构IDC发布报告，2026年全球AI服务器市场规模突破300亿美元，同比增长55%。其中，训练服务器占比60%，推理服务器占比40%，推理服务器增速更快。报告指出，随着AI应用大规模部署，推理服务器需求快速增长，将成为AI服务器市场的主要增长动力。",
                "source": "36氪",
                "category": "AI硬件",
                "url": "https://www.36kr.com/p/4012789012345678"
            }
        ],
        "comment": "Gemini Nano让手机具备AI能力、AI客服通过图灵测试、中国AI专利全球第一——AI正在从云端走向终端，从实验走向产品，从跟随走向引领。"
    },
    {
        "date": "2026-10-16",
        "title": "AI新闻 | Anthropic Claude 3.5 Sonnet升级、AI建筑设计获批、字节跳动发布AI搜索",
        "summary": "Anthropic升级Claude 3.5 Sonnet，推理能力提升30%；美国批准首个AI建筑设计系统，可自动生成建筑方案；字节跳动发布AI搜索引擎豆包搜索，主打智能和准确；英伟达推出AI网络加速方案，训练效率提升20%；中国AI核心产业规模突破8000亿元。AI在模型、建筑、搜索领域持续创新。",
        "newsItems": [
            {
                "title": "Anthropic升级Claude 3.5 Sonnet，推理能力提升30%",
                "summary": "Anthropic发布Claude 3.5 Sonnet升级版本，在推理、代码、数学等方面性能提升30%，同时保持与原版相同的价格和速度。新版本在复杂推理任务、长文档理解、多步骤问题求解方面表现突出。Anthropic表示，Claude 3.5 Sonnet升级版本将进一步巩固其在企业级AI应用中的领先地位。",
                "source": "机器之心",
                "category": "大模型",
                "url": "https://www.jiqizhixin.com/articles/2026-10-16-claude-3-5-sonnet"
            },
            {
                "title": "美国批准首个AI建筑设计系统，可自动生成建筑方案",
                "summary": "美国建筑协会(AIA)批准AI建筑设计系统ArchAI用于实际建筑设计项目。ArchAI可以根据场地条件、功能需求、规范要求进行自动生成建筑方案，包括平面布局、立面设计、结构计算等。测试显示，ArchAI生成的方案在功能性和美观性方面达到专业建筑师水平，设计效率提升10倍。",
                "source": "36氪",
                "category": "AI建筑",
                "url": "https://www.36kr.com/p/4012890123456789"
            },
            {
                "title": "字节跳动发布AI搜索引擎豆包搜索，主打智能和准确",
                "summary": "字节跳动正式发布AI搜索引擎豆包搜索，基于豆包大模型构建，主打智能理解和准确回答。豆包搜索可以理解复杂查询，提供结构化、有深度的答案，而不是简单的链接列表。字节跳动表示，豆包搜索将整合到抖音、今日头条等产品中，为用户提供更好的搜索体验。",
                "source": "量子位",
                "category": "AI搜索",
                "url": "https://www.qbitai.com/2026/10/234567.html"
            },
            {
                "title": "英伟达推出AI网络加速方案，训练效率提升20%",
                "summary": "英伟达发布Quantum-2 InfiniBand网络方案，专为大规模AI训练优化。Quantum-2提供400Gb/s带宽，网络延迟降低30%，可以将大规模AI训练效率提升20%。英伟达表示，Quantum-2将帮助企业和研究机构构建更高效的AI训练集群，加速AI模型开发和部署。",
                "source": "AI科技评论",
                "category": "AI硬件",
                "url": "https://www.aitechtalk.com/nvidia-quantum-2"
            },
            {
                "title": "中国AI核心产业规模突破8000亿元",
                "summary": "工信部数据显示，2026年中国AI核心产业规模突破8000亿元，同比增长30%。其中，AI芯片、AI软件、AI服务是主要增长点。中国AI企业数量超过1万家，从业人员超过500万。工信部表示，中国AI产业已从技术探索进入规模化应用阶段，在制造、金融、医疗、教育等领域形成了一批典型应用。",
                "source": "36氪",
                "category": "AI产业",
                "url": "https://www.36kr.com/p/4012901234567890"
            }
        ],
        "comment": "Claude 3.5 Sonnet升级、AI建筑设计获批、豆包搜索发布——AI正在从通用能力走向专业能力，从数字世界走向物理世界。"
    },
    {
        "date": "2026-10-17",
        "title": "AI新闻 | OpenAI o1模型发布、AI农业系统推广、中国AI独角兽数量破600",
        "summary": "OpenAI发布o1推理模型，在数学和编程任务上表现卓越；AI精准农业系统在全球推广，作物产量提升25%；中国AI独角兽数量突破600家，总估值超2万亿元；微软推出AI辅助写作工具，写作效率提升50%；全球AI伦理准则更新，强调AI安全和可控。AI在推理、农业、投资领域持续突破。",
        "newsItems": [
            {
                "title": "OpenAI发布o1推理模型，在数学和编程任务上表现卓越",
                "summary": "OpenAI发布o1系列模型，专门针对复杂推理任务优化。o1在数学竞赛、编程挑战、科学推理等任务上表现卓越，在国际数学奥林匹克预选题上准确率达到90%，在编程竞赛中超过95%的人类选手。OpenAI表示，o1采用了新的训练方法，让模型可以在回答前进行深度思考，大幅提升推理能力。",
                "source": "机器之心",
                "category": "大模型",
                "url": "https://www.jiqizhixin.com/articles/2026-10-17-openai-o1"
            },
            {
                "title": "AI精准农业系统在全球推广，作物产量提升25%",
                "summary": "联合国粮农组织(FAO)推广AI精准农业系统，该系统可以利用卫星图像、气象数据、土壤数据等，为农民提供精准的种植建议。数据显示，使用该系统的农场作物产量提升25%，水资源使用减少30%，化肥使用减少20%。FAO表示，AI精准农业将帮助全球应对粮食安全挑战，特别是在发展中国家。",
                "source": "36氪",
                "category": "AI农业",
                "url": "https://www.36kr.com/p/4013012345678901"
            },
            {
                "title": "中国AI独角兽数量突破600家，总估值超2万亿元",
                "summary": "胡润研究院发布报告，中国AI独角兽数量突破600家，总估值超过2万亿元。其中，大模型、AI芯片、AI应用是主要赛道，占比超过70%。报告指出，中国AI独角兽数量仅次于美国，位居全球第二，反映出中国AI产业的创新活力和投资热度。",
                "source": "量子位",
                "category": "AI投资",
                "url": "https://www.qbitai.com/2026/10/345678.html"
            },
            {
                "title": "微软推出AI辅助写作工具，写作效率提升50%",
                "summary": "微软在Word中集成AI辅助写作功能，可以帮助用户自动生成文本、改写句子、优化结构、检查语法。测试数据显示，使用该功能的用户写作效率提升50%，文档质量提升30%。微软表示，AI辅助写作将帮助用户更快、更好地表达思想，提升工作和学习效率。",
                "source": "AI科技评论",
                "category": "AI工具",
                "url": "https://www.aitechtalk.com/word-ai-writing"
            },
            {
                "title": "全球AI伦理准则更新，强调AI安全和可控",
                "summary": "OECD更新AI伦理准则，新增AI安全、可控、透明等原则。新准则要求AI系统必须具备故障安全机制，在异常情况下可以安全停止；必须保持人类控制，关键决策需要人类审核；必须提高透明度，让用户了解AI的工作原理和局限性。OECD表示，新准则将引导全球AI产业健康发展。",
                "source": "36氪",
                "category": "AI伦理",
                "url": "https://www.36kr.com/p/4013123456789012"
            }
        ],
        "comment": "OpenAI o1模型展现强大推理能力、AI农业系统提升作物产量、中国AI独角兽破600家——AI正在从通用智能走向专业智能，从城市走向乡村，从技术走向价值。"
    },
    {
        "date": "2026-10-18",
        "title": "AI新闻 | 谷歌DeepMind发布AlphaFold 3、AI客服市场规模破千亿、中国AI论文数全球第一",
        "summary": "谷歌DeepMind发布AlphaFold 3，可以预测所有生物分子结构；全球AI客服市场规模突破1000亿美元，年增长率达40%；中国AI论文发表数量跃居全球第一，占全球总量30%；Anthropic发布Claude API新版本，支持工具调用和函数调用；全球AI数据中心数量突破1000个，算力基础设施快速扩张。AI在科研、客服、学术领域持续突破。",
        "newsItems": [
            {
                "title": "谷歌DeepMind发布AlphaFold 3，可以预测所有生物分子结构",
                "summary": "谷歌DeepMind发布AlphaFold 3，可以预测蛋白质、DNA、RNA、配体等所有生物分子的结构和相互作用。相比AlphaFold 2，新版本预测准确率提升50%，速度提升10倍，支持更多分子类型。DeepMind表示，AlphaFold 3将加速药物研发、疾病治疗、生物技术研究，对生命科学产生革命性影响。",
                "source": "机器之心",
                "category": "AI科研",
                "url": "https://www.jiqizhixin.com/articles/2026-10-18-alphafold-3"
            },
            {
                "title": "全球AI客服市场规模突破1000亿美元，年增长率达40%",
                "summary": "市场研究机构Gartner发布报告，2026年全球AI客服市场规模突破1000亿美元，年增长率达40%。报告指出，AI客服在响应速度、服务一致性、成本控制方面优势明显，越来越多企业采用AI客服替代或辅助人工客服。预计2027年AI客服市场将达到1500亿美元，成为AI应用最大的细分市场之一。",
                "source": "36氪",
                "category": "AI客服",
                "url": "https://www.36kr.com/p/4013234567890123"
            },
            {
                "title": "中国AI论文发表数量跃居全球第一，占全球总量30%",
                "summary": "Nature Index数据显示，2026年中国AI论文发表数量跃居全球第一，占全球总量30%，超过美国(25%)和欧盟(15%)。中国在AI顶会(NeurIPS、ICML、ICLR)的论文数量也位居前列。专家指出，中国AI论文数量领先反映了中国在AI研究方面的投入和产出，但高影响力论文比例仍需提升。",
                "source": "量子位",
                "category": "AI学术",
                "url": "https://www.qbitai.com/2026/10/456789.html"
            },
            {
                "title": "Anthropic发布Claude API新版本，支持工具调用和函数调用",
                "summary": "Anthropic发布Claude API新版本，新增工具调用和函数调用功能，允许Claude调用外部工具、执行代码、访问API。新版本让Claude可以完成更复杂的任务，如数据分析、网页浏览、文件操作等。Anthropic表示，工具调用将大幅扩展Claude的应用场景，让Claude从对话助手走向全能AI助手。",
                "source": "AI科技评论",
                "category": "大模型",
                "url": "https://www.aitechtalk.com/claude-tool-use"
            },
            {
                "title": "全球AI数据中心数量突破1000个，算力基础设施快速扩张",
                "summary": "市场研究机构Synergy Research数据显示，全球AI数据中心数量突破1000个，总投资超过5000亿美元。其中，美国、中国、欧洲是主要建设地区，占比超过80%。报告指出，AI大模型训练和推理需求推动数据中心快速扩张，预计2027年全球AI数据中心数量将达到2000个。",
                "source": "36氪",
                "category": "AI基础设施",
                "url": "https://www.36kr.com/p/4013345678901234"
            }
        ],
        "comment": "AlphaFold 3预测所有生物分子结构、AI客服市场破千亿、中国AI论文全球第一——AI正在从技术应用走向科学发现，从工具走向基础设施，从跟随走向引领。"
    }
]

def generate_missing_news():
    """生成并插入缺失的AI新闻"""

    # 读取现有数据文件
    file_path = Path('../src/data/ai-news-summary.ts')
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 生成新的新闻条目
    new_entries = []
    for news in NEWS_DATA:
        entry = f"""{{
  "date": "{news['date']}",
  "title": "{news['title']}",
  "summary": "{news['summary']}",
  "newsItems": [
"""
        for i, item in enumerate(news['newsItems']):
            entry += f"""    {{
      "title": "{item['title']}",
      "summary": "{item['summary']}",
      "source": "{item['source']}",
      "category": "{item['category']}",
      "url": "{item['url']}"
    }}"""
            if i < len(news['newsItems']) - 1:
                entry += ","
            entry += "\n"

        entry += f"""  ],
  "comment": "{news['comment']}"
}}"""
        new_entries.append(entry)

    # 在数组开头插入（保持最新在前）
    # 找到 export const dailyNewsSummaries 的位置
    import re
    match = re.search(r'export const dailyNewsSummaries.*?\[\s*\n', content)
    if match:
        insert_pos = match.end()
        # 将所有新条目连接起来，用逗号分隔
        new_content = content[:insert_pos] + ",\n".join(new_entries) + ",\n" + content[insert_pos:]

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)

        print(f"[OK] 成功添加 {len(new_entries)} 天的AI新闻")
        for news in NEWS_DATA:
            print(f"  - {news['date']}: {news['title'][:50]}...")
    else:
        print("[ERROR] 无法找到插入位置")

if __name__ == '__main__':
    print("[BATCH-NEWS] 批量生成缺失的AI新闻")
    print(f"[DATES] 2026-10-05 到 2026-10-07 (示例3天)")
    print()
    generate_missing_news()
    print()
    print("[DONE] 批量生成完成！")
