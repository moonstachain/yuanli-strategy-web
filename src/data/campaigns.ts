export interface ContentCampaign {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  promise: string;
  question: string;
  description: string;
  articleIds: string[];
  action: {
    label: string;
    href: string;
  };
}

export const campaigns: ContentCampaign[] = [
  {
    id: 'ai-distillation',
    eyebrow: 'Golden Loop 001 · A1',
    title: 'AI正在蒸馏你',
    subtitle: '当专业知识越来越容易被AI调用，真正需要重新定价的是持续生成判断的源头。',
    promise: '从一个时代冲突开始，区分已经可以被提取的能力、仍待验证的原力母体，并完成一次真实AI清算行动。',
    question: '当过去的答案被提取之后，你还剩下什么？',
    description: '当前外部最小Evidence Pack已经形成，但Human Evidence Review、10名真实用户行动、7日Outcome和Changed Rule仍未完成。本战役把Hook、机制解释和AI清算卡连成一条可验证链，不把页面上线写成成功案例。',
    articleIds: [
      'when-experience-becomes-skill',
      'extractable-ability-vs-generative-source',
      'ai-clearance-action-guide',
    ],
    action: {
      label: '完成AI清算卡',
      href: '/tools/ai-clearance/',
    },
  },
  {
    id: 'yuanli-four-wealth',
    eyebrow: 'Yuanli Campaign',
    title: '原力创业·四种财富',
    subtitle: '时代给你杠杆，心智给你定价，空间给你复制，时间给你复利。',
    promise: '用四个正面样本和一个断链反例，看懂企业如何把时代机会加工成自己的长期财富。',
    question: '真正的财富，究竟储存在哪里？',
    description: '这不是五篇成功故事，而是一条认知行动链：先理解四种财富，再观察任天堂、爱马仕、Costco和LEGO如何完成转换，最后用柯达检验财富为何会从壁垒变成牢笼。',
    articleIds: [
      'yuanli-startup-four-wealth',
      'nintendo-wii-who-can-play',
      'hermes-slow-craft-high-margin',
      'costco-trust-membership-space',
      'lego-brick-time-wealth',
      'kodak-when-wealth-becomes-debt',
    ],
    action: {
      label: '完成四种财富诊断卡',
      href: '/tools/four-wealth-audit/',
    },
  },
];

export const getCampaign = (id: string) => campaigns.find((campaign) => campaign.id === id);
