import type { StudioSourceKey } from './contracts';

export const studioSourceRegistry: Record<StudioSourceKey, {
  name: string;
  role: string;
  authoritativeFor: string[];
  operatorEntry: string;
  phase1Consumed: boolean;
}> = {
  pmo: {
    name: 'PMO',
    role: 'Portfolio、Owner、WIP、Gate sequence',
    authoritativeFor: ['project_id', 'owner', 'WIP', 'gate sequence'],
    operatorEntry: 'https://github.com/os-yuanli/yuanli-pmo/issues/23',
    phase1Consumed: true,
  },
  brain: {
    name: 'Brain',
    role: 'Claim、Evidence、Conflict、Gap、Human Evidence Review',
    authoritativeFor: ['claim', 'evidence', 'conflict', 'gap', 'human evidence review'],
    operatorEntry: 'https://github.com/moonstachain/yuanli-brain/issues/4',
    phase1Consumed: true,
  },
  content: {
    name: 'Content Engine',
    role: 'Campaign runtime、Work、Distribution、Action contract',
    authoritativeFor: ['campaign runtime', 'work', 'distribution', 'action receipt contract'],
    operatorEntry: 'https://os-zk.84000.art/content-engine-workbench/index.html#orchestration/overview',
    phase1Consumed: true,
  },
  soul: {
    name: 'Soul',
    role: 'Human Gate、Canon、Changed Rule、Task2 approval',
    authoritativeFor: ['human gate', 'canon', 'changed rule', 'task2 approval'],
    operatorEntry: 'https://github.com/moonstachain/yuanli-strategy-soul/pull/462',
    phase1Consumed: true,
  },
  taste: {
    name: 'Taste',
    role: 'Visual SSOT 与发布前设计质检',
    authoritativeFor: ['visual gate', 'design ssot'],
    operatorEntry: 'https://github.com/moonstachain/yuanli-taste/issues/1',
    phase1Consumed: true,
  },
  web: {
    name: 'Web',
    role: 'C端公开路由、工具、生产者首次成功验证',
    authoritativeFor: ['public route', 'public page state', 'producer usability test'],
    operatorEntry: 'https://github.com/moonstachain/yuanli-strategy-web/issues/31',
    phase1Consumed: true,
  },
  bao: {
    name: 'Bao',
    role: 'Signal / Radar 专业作业台；候选信号不自动晋级事实',
    authoritativeFor: ['signal candidate only'],
    operatorEntry: 'https://os-zk.84000.art/bao.html',
    phase1Consumed: false,
  },
  deploy: {
    name: 'Deploy',
    role: 'Single Writer、publish receipt、byte verification',
    authoritativeFor: ['deployment identity', 'publish receipt', 'byte verification'],
    operatorEntry: 'https://github.com/moonstachain/yiru-cockpit-deploy/blob/master/ops/README.md',
    phase1Consumed: false,
  },
};

export const studioFieldAuthority = {
  'campaign.owner': 'pmo',
  'campaign.gates': 'pmo',
  'campaign.claims': 'brain',
  'campaign.evidence': 'brain',
  'campaign.runtime': 'content',
  'campaign.works': 'content',
  'campaign.humanGate': 'soul',
  'campaign.changedRule': 'soul',
  'campaign.visualGate': 'taste',
  'campaign.publicPageStatus': 'web',
  'signal.candidate': 'bao',
  'deployment.receipt': 'deploy',
} as const;
