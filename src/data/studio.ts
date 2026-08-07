import generatedStudioView from './studio/studio-view.generated.json';
import type { StudioView } from '../lib/studio/contracts';

export const studioView = generatedStudioView as StudioView;

/**
 * Transitional compatibility alias for existing Phase-1 pages.
 * It points to the derived projection and is not a manually maintained truth object.
 */
export const studioSnapshot = studioView;

export const producerNav = [
  { label: '今日', href: '/studio/' },
  { label: '雷达', href: '/studio/radar/' },
  { label: '研究', href: '/studio/research/' },
  { label: '生产', href: '/studio/production/' },
  { label: '发布', href: '/studio/publish/' },
  { label: '学习', href: '/studio/outcomes/' },
  { label: '系统', href: '/studio/system/' },
];
