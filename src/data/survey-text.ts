export const scenarios = [
  {
    no: 1,
    situation: {
      zh: '你正在考虑，是否让孩子从现在住的二线城市搬到一线城市读书。',
      en: 'You are considering whether to move your child from a second-tier city to a first-tier city for better education.',
    },
    a: {
      label: { zh: '搬到一线城市', en: 'Move to a first-tier city' },
      pros: { zh: ['更好的教育资源'], en: ['Better educational resources'] },
      cons: { zh: ['学费约 16,000 元/年，全家需适应陌生环境'], en: ['Tuition ~¥16,000/year; family must adapt to new environment'] },
    },
    b: {
      label: { zh: '留在现在的城市', en: 'Stay in the current city' },
      pros: { zh: ['学费约 1,600 元/年，生活环境熟悉'], en: ['Tuition ~¥1,600/year; familiar environment'] },
      cons: { zh: ['教育资源相对普通'], en: ['Educational resources are relatively ordinary'] },
    },
  },
  {
    no: 3,
    situation: {
      zh: '孩子成绩一般，不好不坏。家庭可以承担一种额外课程。',
      en: 'Your child\'s grades are average. Your family can afford one extra course.',
    },
    a: {
      label: { zh: '报名学科补习班', en: 'Academic tutoring class' },
      pros: { zh: ['帮助提高学习成绩'], en: ['Helps improve academic performance'] },
      cons: { zh: ['休息和发展兴趣的时间减少'], en: ['Less time for rest and hobbies'] },
    },
    b: {
      label: { zh: '报名兴趣班', en: 'Hobby/interest class' },
      pros: { zh: ['帮助发展个人特长'], en: ['Helps develop personal strengths'] },
      cons: { zh: ['可能占用学习时间，影响学业'], en: ['May take up study time, affecting academics'] },
    },
  },
  {
    no: 5,
    situation: {
      zh: '孩子有机会进入学习要求更高的尖子班，也可以继续留在目前表现不错的普通班。',
      en: 'Your child can enter a more demanding honors class, or stay in the regular class where they\'re doing well.',
    },
    a: {
      label: { zh: '进入尖子班', en: 'Enter honors class' },
      pros: { zh: ['更有挑战性的学习环境'], en: ['More challenging learning environment'] },
      cons: { zh: ['压力增加，自由时间可能减少'], en: ['More pressure, possibly less free time'] },
    },
    b: {
      label: { zh: '留在普通班', en: 'Stay in regular class' },
      pros: { zh: ['学习压力较小，保持较好表现'], en: ['Less pressure, maintain good performance'] },
      cons: { zh: ['课程挑战性有限'], en: ['Limited course challenge'] },
    },
  },
  {
    no: 6,
    situation: {
      zh: '孩子最近一次考试成绩低于预期。',
      en: 'Your child\'s most recent exam score was below expectations.',
    },
    a: {
      label: { zh: '让孩子自己调整学习方法', en: 'Let child adjust study methods independently' },
      pros: { zh: ['学习压力较小'], en: ['Less study pressure'] },
      cons: { zh: ['成绩改善可能有限'], en: ['Improvement may be limited'] },
    },
    b: {
      label: { zh: '安排补习老师', en: 'Arrange a tutor' },
      pros: { zh: ['可能帮助改善成绩'], en: ['May help improve grades'] },
      cons: { zh: ['增加压力，减少自由时间'], en: ['Increases pressure, reduces free time'] },
    },
  },
  {
    no: 8,
    situation: {
      zh: '临近考试，你正在考虑是否暂停孩子原本参加的兴趣活动。',
      en: 'Exams are approaching. You\'re considering whether to pause your child\'s extracurricular activities.',
    },
    a: {
      label: { zh: '暂停兴趣活动', en: 'Pause extracurricular activities' },
      pros: { zh: ['更多时间复习'], en: ['More time for exam prep'] },
      cons: { zh: ['可能增加压力并影响情绪'], en: ['May increase stress and affect mood'] },
    },
    b: {
      label: { zh: '保留兴趣活动', en: 'Keep extracurricular activities' },
      pros: { zh: ['继续获得放松和快乐'], en: ['Continue to relax and enjoy'] },
      cons: { zh: ['复习时间减少'], en: ['Less time for exam prep'] },
    },
  },
  {
    no: 9,
    situation: {
      zh: '学校组织了一次户外自然探索活动。孩子会在老师带领下进行户外活动，家长无法陪同。',
      en: 'The school organized an outdoor nature exploration. Children will be led by teachers; parents cannot accompany.',
    },
    a: {
      label: { zh: '让孩子参加', en: 'Let child participate' },
      pros: { zh: ['接触自然并体验新活动'], en: ['Experience nature and new activities'] },
      cons: { zh: ['户外活动存在一定受伤风险'], en: ['Some risk of injury in outdoor activities'] },
    },
    b: {
      label: { zh: '不让孩子参加', en: 'Don\'t let child participate' },
      pros: { zh: ['减少安全担忧'], en: ['Reduce safety concerns'] },
      cons: { zh: ['错过户外学习和探索机会'], en: ['Miss outdoor learning opportunities'] },
    },
  },
  {
    no: 13,
    situation: {
      zh: '孩子在考试中看到同学作弊，回家后告诉了你。',
      en: 'Your child saw a classmate cheating on an exam and told you after coming home.',
    },
    a: {
      label: { zh: '建议孩子向老师如实说明', en: 'Advise child to report to teacher' },
      pros: { zh: ['坚持规则'], en: ['Uphold rules'] },
      cons: { zh: ['可能影响孩子与同学的关系'], en: ['May affect relationship with classmates'] },
    },
    b: {
      label: { zh: '建议孩子暂时不报告', en: 'Advise child not to report for now' },
      pros: { zh: ['避免卷入同学矛盾'], en: ['Avoid getting involved in peer conflicts'] },
      cons: { zh: ['作弊行为可能得不到处理'], en: ['Cheating may go unaddressed'] },
    },
  },
  {
    no: 14,
    situation: {
      zh: '孩子课外更喜欢阅读漫画，但经典读物可能对写作和语文学习更有帮助。假设孩子目前只能优先选择其中一种。',
      en: 'Your child prefers reading comics, but classics may better help with writing and language. Suppose the child can only prioritize one.',
    },
    a: {
      label: { zh: '允许主要阅读漫画', en: 'Allow mainly reading comics' },
      pros: { zh: ['保持阅读兴趣'], en: ['Maintain reading interest'] },
      cons: { zh: ['对语文学习直接帮助较少'], en: ['Less direct help for language studies'] },
    },
    b: {
      label: { zh: '要求主要阅读经典读物', en: 'Require mainly reading classics' },
      pros: { zh: ['可能提高阅读和写作能力'], en: ['May improve reading and writing skills'] },
      cons: { zh: ['阅读兴趣可能降低'], en: ['Reading interest may decline'] },
    },
  },
  {
    no: 16,
    situation: {
      zh: '你身边有一些家庭选择让孩子出国读书。你正在考虑是否让孩子在小学阶段出国。',
      en: 'Some families around you send children abroad. You\'re considering whether to send your child abroad during elementary school.',
    },
    a: {
      label: { zh: '让孩子出国读书', en: 'Send child abroad' },
      pros: { zh: ['接触不同教育和文化环境'], en: ['Exposure to different education and culture'] },
      cons: { zh: ['费用较高，需面对适应、安全和分离问题'], en: ['Higher cost; adaptation, safety, separation issues'] },
    },
    b: {
      label: { zh: '让孩子在国内读书', en: 'Keep child in domestic school' },
      pros: { zh: ['费用较低，环境熟悉，方便陪伴'], en: ['Lower cost, familiar, easier to accompany'] },
      cons: { zh: ['国际化教育机会较少'], en: ['Fewer international education opportunities'] },
    },
  },
  {
    no: 17,
    situation: {
      zh: '孩子告诉你，自己最近在学校受到同学排挤和孤立。',
      en: 'Your child tells you they\'ve been excluded and isolated by classmates at school.',
    },
    a: {
      label: { zh: '主动联系老师处理', en: 'Contact the teacher proactively' },
      pros: { zh: ['借助专业力量解决问题'], en: ['Leverage professional help'] },
      cons: { zh: ['孩子可能觉得家长过度介入'], en: ['Child may feel parent is overstepping'] },
    },
    b: {
      label: { zh: '鼓励孩子自己处理', en: 'Encourage child to handle it themselves' },
      pros: { zh: ['锻炼解决人际问题的能力'], en: ['Build interpersonal problem-solving skills'] },
      cons: { zh: ['问题可能持续或加重'], en: ['Problem may persist or worsen'] },
    },
  },
  {
    no: 18,
    situation: {
      zh: '孩子没有生病，但今天精神状态不佳，希望请假一天不去学校。',
      en: 'Your child isn\'t sick but feels mentally off today and wants a day off from school.',
    },
    a: {
      label: { zh: '允许请假一天', en: 'Allow a day off' },
      pros: { zh: ['让孩子调整状态'], en: ['Let child recover'] },
      cons: { zh: ['会错过当天课程'], en: ['Will miss that day\'s classes'] },
    },
    b: {
      label: { zh: '不允许请假', en: 'Don\'t allow a day off' },
      pros: { zh: ['避免影响课程进度'], en: ['Avoid falling behind'] },
      cons: { zh: ['孩子可能无法得到需要的休息'], en: ['Child may not get needed rest'] },
    },
  },
  {
    no: 21,
    situation: {
      zh: '孩子在比赛失败后情绪低落，并表示不想再参加类似比赛。',
      en: 'Your child is feeling down after losing a competition and says they don\'t want to participate again.',
    },
    a: {
      label: { zh: '鼓励孩子继续尝试', en: 'Encourage child to keep trying' },
      pros: { zh: ['帮助学习面对失败'], en: ['Help learn to face failure'] },
      cons: { zh: ['可能增加当前压力'], en: ['May increase current stress'] },
    },
    b: {
      label: { zh: '尊重孩子暂时退出', en: 'Respect child\'s wish to withdraw temporarily' },
      pros: { zh: ['让孩子获得调整时间'], en: ['Give child time to recover'] },
      cons: { zh: ['可能减少锻炼坚持能力的机会'], en: ['May reduce chances to build perseverance'] },
    },
  },
  {
    no: 22,
    situation: {
      zh: '孩子希望拥有更多个人空间，例如在自己的房间里学习或休息时把门关上。',
      en: 'Your child wants more personal space, such as closing their door when studying or resting.',
    },
    a: {
      label: { zh: '允许关门，同时约定必要的规则和查看时间', en: 'Allow closing door with agreed rules and check-in times' },
      pros: { zh: ['尊重孩子的隐私'], en: ['Respect child\'s privacy'] },
      cons: { zh: ['家长不能随时了解孩子情况'], en: ['Parent can\'t monitor at all times'] },
    },
    b: {
      label: { zh: '要求孩子在学习时保持房门打开', en: 'Require door to stay open during study time' },
      pros: { zh: ['便于监督和了解情况'], en: ['Easier to monitor and stay informed'] },
      cons: { zh: ['减少孩子的隐私和自主空间'], en: ['Reduces child\'s privacy and autonomy'] },
    },
  },
];

export const panasItems = [
  'interested', 'enthusiastic', 'proud', 'inspired', 'determined',
  'distressed', 'nervous', 'afraid', 'guilty', 'hostile',
];

export const panasLabels = {
  interested: { zh: '感兴趣的', en: 'Interested' },
  enthusiastic: { zh: '热情的', en: 'Enthusiastic' },
  proud: { zh: '自豪的', en: 'Proud' },
  inspired: { zh: '备受鼓舞的', en: 'Inspired' },
  determined: { zh: '意志坚决的', en: 'Determined' },
  distressed: { zh: '心烦的', en: 'Distressed' },
  nervous: { zh: '紧张的', en: 'Nervous' },
  afraid: { zh: '害怕的', en: 'Afraid' },
  guilty: { zh: '内疚的', en: 'Guilty' },
  hostile: { zh: '敌意的', en: 'Hostile' },
};

export const panasScale = {
  zh: ['几乎没有', '比较少', '中等', '比较多', '极其强烈'],
  en: ['Not at all', 'A little', 'Moderately', 'Quite a bit', 'Extremely'],
};

export const demographics = {
  gender: {
    zh: '您的性别', en: 'Your gender',
    options: {
      zh: ['男', '女', '其他/不愿透露'],
      en: ['Male', 'Female', 'Other / Prefer not to say'],
    },
  },
  age: {
    zh: '您的年龄', en: 'Your age',
    options: {
      zh: ['25岁以下', '25-30岁', '31-35岁', '36-40岁', '41-45岁', '46岁以上'],
      en: ['Under 25', '25-30', '31-35', '36-40', '41-45', '46+'],
    },
  },
  education: {
    zh: '您的最高学历', en: 'Your highest education',
    options: {
      zh: ['高中及以下', '大专', '本科', '硕士', '博士及以上'],
      en: ['High school or below', 'Associate', 'Bachelor', 'Master', 'PhD or above'],
    },
  },
  hasChild: {
    zh: '您是否有孩子', en: 'Do you have children',
    options: {
      zh: ['是', '否（请根据想象作答）'],
      en: ['Yes', 'No (please answer based on imagination)'],
    },
  },
};

export const surveyText = {
  zh: {
    title: '模拟情境下的家长决策与心理感受调查',
    intro1: '本研究关注家长在不同模拟情境中如何为孩子作出判断，以及作答过程中的感受和想法。',
    intro2: '问卷没有标准答案，请根据您的第一反应和真实感受作答。您的回答仅用于研究分析，并将以匿名方式记录。',
    intro3: '整个调查约需 15-20 分钟，请按页面提示依次完成。',
    agree: '我已阅读并同意参与本研究',
    start: '开始调查',
    progress: '第 {current} 页 / 共 {total} 页',
    prev: '上一页',
    next: '下一页',
    submit: '提交',
    thanks: '感谢您的参与！',
    thanksMsg: '您的回答已成功提交，对我们的研究非常有帮助。',
    panasTitle: '请根据您此刻的实际感受，选择每一种感受与您当前状态相符的程度。',
    scenarioTitle: '以下每个情境中，您都是一位家长，面临一个关于孩子的决策。每个选项都列出了可能的利弊，没有对错之分。',
    confidence: '你对自己刚才的选择有多少信心？',
    happiness: '你觉得这样做，孩子会更开心还是更不开心？',
    openQuestion: '在所有这些选择中，你最看重什么？请回忆一个你实际经历过的类似情境——当时你怎么选的？为什么？',
    openPlaceholder: '请分享你的想法（选填）...',
    mathQuestion: '请计算：37 + 46 = ?',
    mathPlaceholder: '请输入答案',
    scaleLabels: {
      confidence: ['完全没有信心', '', '', '一般', '', '', '非常有信心'],
      happiness: ['明显降低', '', '', '没有明显影响', '', '', '明显提高'],
    },
    required: '请完成所有必答题后再继续',
    error: '提交失败，请稍后重试',
    submitting: '提交中...',
  },
  en: {
    title: 'Parental Decision-Making & Psychological Responses Survey',
    intro1: 'This study examines how parents make judgments for their children in various simulated scenarios, and their feelings during the process.',
    intro2: 'There are no right or wrong answers. Please respond based on your first instinct and genuine feelings. Your responses are anonymous and used for research only.',
    intro3: 'The survey takes approximately 15-20 minutes. Please complete each section in order.',
    agree: 'I have read and agree to participate',
    start: 'Start Survey',
    progress: 'Page {current} of {total}',
    prev: 'Previous',
    next: 'Next',
    submit: 'Submit',
    thanks: 'Thank you for your participation!',
    thanksMsg: 'Your response has been submitted successfully and is very helpful for our research.',
    panasTitle: 'Please indicate how much you feel each emotion right now.',
    scenarioTitle: 'In each scenario below, you are a parent facing a decision about your child. Each option lists pros and cons. There are no right or wrong answers.',
    confidence: 'How confident are you in your choice?',
    happiness: 'How do you think this choice would affect your child\'s happiness?',
    openQuestion: 'What do you value most in these decisions? Please recall a similar real-life experience — what did you choose and why?',
    openPlaceholder: 'Share your thoughts (optional)...',
    mathQuestion: 'Please calculate: 37 + 46 = ?',
    mathPlaceholder: 'Enter your answer',
    scaleLabels: {
      confidence: ['Not at all confident', '', '', 'Moderate', '', '', 'Very confident'],
      happiness: ['Significantly decrease', '', '', 'No noticeable effect', '', '', 'Significantly increase'],
    },
    required: 'Please complete all required questions before continuing',
    error: 'Submission failed. Please try again.',
    submitting: 'Submitting...',
  },
};
