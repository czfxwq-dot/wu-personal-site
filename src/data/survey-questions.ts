// 家长决策调研 — 13道情景题（中英双语）
// 每题包含：编号、情境描述、A/B选项（含利弊）

export interface Scenario {
  no: number;
  situation: { zh: string; en: string };
  optionA: { label: { zh: string; en: string }; pros: string[]; cons: string[] };
  optionB: { label: { zh: string; en: string }; pros: string[]; cons: string[] };
}

export const scenarios: Scenario[] = [
  {
    no: 1,
    situation: {
      zh: '你正在考虑，是否让孩子从现在住的二线城市搬到一线城市读书。',
      en: 'You are considering whether to move your child from a second-tier city to a first-tier city for better education.',
    },
    optionA: {
      label: { zh: '搬到一线城市', en: 'Move to a first-tier city' },
      pros: { zh: ['更好的教育资源'], en: ['Better educational resources'] },
      cons: {
        zh: ['学费约16,000元/年', '全家需适应陌生环境'],
        en: ['Tuition ~¥16,000/year', 'Whole family must adapt to a new environment'],
      },
    },
    optionB: {
      label: { zh: '留在现在的城市', en: 'Stay in the current city' },
      pros: { zh: ['学费约1,600元/年', '生活环境熟悉'], en: ['Tuition ~¥1,600/year', 'Familiar living environment'] },
      cons: { zh: ['教育资源相对普通'], en: ['Educational resources are relatively ordinary'] },
    },
  },
  {
    no: 3,
    situation: {
      zh: '孩子成绩一般，不好不坏。家庭可以承担一种额外课程。',
      en: 'Your child\'s grades are average. Your family can afford one extra course.',
    },
    optionA: {
      label: { zh: '报名学科补习班', en: 'Enroll in academic tutoring' },
      pros: { zh: ['帮助提高学习成绩'], en: ['Helps improve academic performance'] },
      cons: { zh: ['休息和发展兴趣的时间减少'], en: ['Less time for rest and hobbies'] },
    },
    optionB: {
      label: { zh: '报名兴趣班', en: 'Enroll in a hobby class' },
      pros: { zh: ['帮助发展个人特长'], en: ['Helps develop personal strengths'] },
      cons: { zh: ['可能占用学习时间，影响学业'], en: ['May take up study time, affecting academics'] },
    },
  },
  {
    no: 5,
    situation: {
      zh: '孩子有机会进入学习要求更高的尖子班，也可以继续留在目前表现不错的普通班。',
      en: 'Your child has the opportunity to enter a more demanding honors class, or stay in the current regular class where they\'re doing well.',
    },
    optionA: {
      label: { zh: '进入尖子班', en: 'Enter the honors class' },
      pros: { zh: ['更有挑战性的学习环境'], en: ['More challenging learning environment'] },
      cons: { zh: ['压力增加', '自由时间可能减少'], en: ['Increased pressure', 'Less free time'] },
    },
    optionB: {
      label: { zh: '留在普通班', en: 'Stay in the regular class' },
      pros: { zh: ['学习压力较小', '保持较好班级表现'], en: ['Less pressure', 'Maintain good class performance'] },
      cons: { zh: ['课程挑战性有限'], en: ['Limited course challenge'] },
    },
  },
  {
    no: 6,
    situation: {
      zh: '孩子最近一次考试成绩低于预期。',
      en: 'Your child\'s most recent exam score was below expectations.',
    },
    optionA: {
      label: { zh: '让孩子自己调整学习方法', en: 'Let the child adjust study methods on their own' },
      pros: { zh: ['学习压力较小'], en: ['Less study pressure'] },
      cons: { zh: ['成绩改善可能有限'], en: ['Improvement may be limited'] },
    },
    optionB: {
      label: { zh: '安排补习老师', en: 'Arrange a tutor' },
      pros: { zh: ['可能帮助改善成绩'], en: ['May help improve grades'] },
      cons: { zh: ['增加压力', '减少自由时间'], en: ['Increases pressure', 'Reduces free time'] },
    },
  },
  {
    no: 8,
    situation: {
      zh: '临近考试，你正在考虑是否暂停孩子原本参加的兴趣活动。',
      en: 'Exams are approaching. You\'re considering whether to pause your child\'s extracurricular activities.',
    },
    optionA: {
      label: { zh: '暂停兴趣活动', en: 'Pause extracurricular activities' },
      pros: { zh: ['更多时间复习'], en: ['More time for exam prep'] },
      cons: { zh: ['可能增加压力并影响情绪'], en: ['May increase stress and affect mood'] },
    },
    optionB: {
      label: { zh: '保留兴趣活动', en: 'Keep extracurricular activities' },
      pros: { zh: ['继续获得放松和快乐'], en: ['Continue to relax and enjoy'] },
      cons: { zh: ['复习时间减少'], en: ['Less time for exam prep'] },
    },
  },
  {
    no: 9,
    situation: {
      zh: '学校组织了一次户外自然探索活动。孩子会在老师带领下进行户外活动，家长无法陪同。',
      en: 'The school organized an outdoor nature exploration trip. Children will be led by teachers, and parents cannot accompany them.',
    },
    optionA: {
      label: { zh: '让孩子参加', en: 'Let the child participate' },
      pros: { zh: ['接触自然并体验新活动'], en: ['Experience nature and new activities'] },
      cons: { zh: ['户外活动存在一定受伤风险'], en: ['Some risk of injury in outdoor activities'] },
    },
    optionB: {
      label: { zh: '不让孩子参加', en: 'Don\'t let the child participate' },
      pros: { zh: ['减少安全担忧'], en: ['Reduce safety concerns'] },
      cons: { zh: ['错过户外学习和探索机会'], en: ['Miss outdoor learning and exploration opportunities'] },
    },
  },
  {
    no: 13,
    situation: {
      zh: '孩子在考试中看到同学作弊，回家后告诉了你。',
      en: 'Your child saw a classmate cheating on an exam and told you after coming home.',
    },
    optionA: {
      label: { zh: '建议孩子向老师如实说明', en: 'Advise the child to report to the teacher' },
      pros: { zh: ['坚持规则'], en: ['Uphold rules'] },
      cons: { zh: ['可能影响孩子与同学的关系'], en: ['May affect relationship with classmates'] },
    },
    optionB: {
      label: { zh: '建议孩子暂时不报告', en: 'Advise the child not to report for now' },
      pros: { zh: ['避免卷入同学矛盾'], en: ['Avoid getting involved in peer conflicts'] },
      cons: { zh: ['作弊行为可能得不到处理'], en: ['Cheating may go unaddressed'] },
    },
  },
  {
    no: 14,
    situation: {
      zh: '孩子课外更喜欢阅读漫画，但经典读物可能对写作和语文学习更有帮助。假设孩子目前只能优先选择其中一种。',
      en: 'Your child prefers reading comics, but classic literature may better help with writing and language arts. Suppose the child can only prioritize one.',
    },
    optionA: {
      label: { zh: '允许主要阅读漫画', en: 'Allow mainly reading comics' },
      pros: { zh: ['保持阅读兴趣'], en: ['Maintain reading interest'] },
      cons: { zh: ['对语文学习直接帮助较少'], en: ['Less direct help for language arts'] },
    },
    optionB: {
      label: { zh: '要求主要阅读经典读物', en: 'Require mainly reading classics' },
      pros: { zh: ['可能提高阅读和写作能力'], en: ['May improve reading and writing skills'] },
      cons: { zh: ['阅读兴趣可能降低'], en: ['Reading interest may decline'] },
    },
  },
  {
    no: 16,
    situation: {
      zh: '你身边有一些家庭选择让孩子出国读书。你正在考虑是否让孩子在小学阶段出国。',
      en: 'Some families around you are sending their children abroad. You\'re considering whether to send your child abroad during elementary school.',
    },
    optionA: {
      label: { zh: '让孩子出国读书', en: 'Send the child abroad' },
      pros: { zh: ['接触不同教育和文化环境'], en: ['Exposure to different education and culture'] },
      cons: { zh: ['费用较高', '需面对适应、安全和分离问题'], en: ['Higher cost', 'Adaptation, safety, and separation issues'] },
    },
    optionB: {
      label: { zh: '让孩子在国内读书', en: 'Keep the child in domestic school' },
      pros: { zh: ['费用较低', '环境熟悉，方便陪伴'], en: ['Lower cost', 'Familiar environment, easier to accompany'] },
      cons: { zh: ['国际化教育机会较少'], en: ['Fewer international education opportunities'] },
    },
  },
  {
    no: 17,
    situation: {
      zh: '孩子告诉你，自己最近在学校受到同学排挤和孤立。',
      en: 'Your child tells you they\'ve been excluded and isolated by classmates at school.',
    },
    optionA: {
      label: { zh: '主动联系老师处理', en: 'Contact the teacher proactively' },
      pros: { zh: ['借助专业力量解决问题'], en: ['Leverage professional help'] },
      cons: { zh: ['孩子可能觉得家长过度介入'], en: ['Child may feel parent is overstepping'] },
    },
    optionB: {
      label: { zh: '鼓励孩子自己处理', en: 'Encourage the child to handle it themselves' },
      pros: { zh: ['锻炼解决人际问题的能力'], en: ['Build interpersonal problem-solving skills'] },
      cons: { zh: ['问题可能持续或加重'], en: ['Problem may persist or worsen'] },
    },
  },
  {
    no: 18,
    situation: {
      zh: '孩子没有生病，但今天精神状态不佳，希望请假一天不去学校。',
      en: 'Your child isn\'t sick but is in a poor mental state today and wants to take a day off from school.',
    },
    optionA: {
      label: { zh: '允许请假一天', en: 'Allow a day off' },
      pros: { zh: ['让孩子调整状态'], en: ['Let the child recover'] },
      cons: { zh: ['会错过当天课程'], en: ['Will miss that day\'s classes'] },
    },
    optionB: {
      label: { zh: '不允许请假', en: 'Don\'t allow a day off' },
      pros: { zh: ['避免影响课程进度'], en: ['Avoid falling behind'] },
      cons: { zh: ['孩子可能无法得到需要的休息'], en: ['Child may not get needed rest'] },
    },
  },
  {
    no: 21,
    situation: {
      zh: '孩子在比赛失败后情绪低落，并表示不想再参加类似比赛。',
      en: 'Your child is feeling down after losing a competition and says they don\'t want to participate in similar events again.',
    },
    optionA: {
      label: { zh: '鼓励孩子继续尝试', en: 'Encourage the child to keep trying' },
      pros: { zh: ['帮助学习面对失败'], en: ['Help learn to face failure'] },
      cons: { zh: ['可能增加当前压力'], en: ['May increase current stress'] },
    },
    optionB: {
      label: { zh: '尊重孩子暂时退出', en: 'Respect the child\'s wish to withdraw temporarily' },
      pros: { zh: ['让孩子获得调整时间'], en: ['Give the child time to recover'] },
      cons: { zh: ['可能减少锻炼坚持能力的机会'], en: ['May reduce chances to build perseverance'] },
    },
  },
  {
    no: 22,
    situation: {
      zh: '孩子希望拥有更多个人空间，例如在自己的房间里学习或休息时把门关上。',
      en: 'Your child wants more personal space, such as closing the door when studying or resting in their room.',
    },
    optionA: {
      label: { zh: '允许关门，约定规则', en: 'Allow closing the door with agreed rules' },
      pros: { zh: ['尊重孩子的隐私'], en: ['Respect the child\'s privacy'] },
      cons: { zh: ['家长不能随时了解孩子情况'], en: ['Parent can\'t monitor at all times'] },
    },
    optionB: {
      label: { zh: '要求保持房门打开', en: 'Require the door to stay open' },
      pros: { zh: ['便于监督和了解情况'], en: ['Easier to monitor and stay informed'] },
      cons: { zh: ['减少孩子的隐私和自主空间'], en: ['Reduces child\'s privacy and autonomy'] },
    },
  },
];
