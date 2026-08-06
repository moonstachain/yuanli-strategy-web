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
