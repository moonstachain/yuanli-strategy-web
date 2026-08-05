export const themes = [
  {
    id: 'ai-future',
    title: 'AI 与个体未来',
    description: '看清什么正在被平权，什么正在变贵。',
    question: 'AI 时代，个人与事业的价值基础正在怎样变化？',
  },
  {
    id: 'irreplaceable',
    title: '找到不可复制',
    description: '从能力清单回到持续生成差异的源头。',
    question: '我真正不可复制的生成源是什么？',
  },
  {
    id: 'category',
    title: '创造新品类',
    description: '让时代放大原力，让市场能够认出、理解和转述。',
    question: '用户为什么现在需要我，并愿意为我开预算？',
  },
  {
    id: 'good-business',
    title: '建设好生意',
    description: '跑通前链、后链、财链，沉淀虚实出入四种控制权。',
    question: '如何持续赚钱、可复制、可放大且守得住？',
  },
  {
    id: 'founder-system',
    title: '创始人变系统',
    description: '让文脉、大脑、地图和链路继承创始人的高价值判断。',
    question: '如何让每一次经营结果都使下一轮更强？',
  },
  {
    id: 'cases',
    title: '原力案例库',
    description: '用真实行动、真实结果与反例校准三部十二模块。',
    question: '这套方法在真实事业中如何成立，又在哪里失效？',
  },
] as const;

export type ThemeId = (typeof themes)[number]['id'];
