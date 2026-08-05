export const modules = [
  { id: 'A1', title: '发现母体', question: 'AI 清算之后，我身上还剩什么会持续生成差异？' },
  { id: 'A2', title: '回到母体', question: '哪些事要保留，哪些事要停止？' },
  { id: 'A3', title: '获得原力', question: '母体如何变成可调用的能力？' },
  { id: 'A4', title: '显化原力', question: '这个原力是否真的被世界需要？' },
  { id: 'B1', title: '原力借势', question: '这个时代为什么现在需要我？' },
  { id: 'B2', title: '品类独创', question: '市场如何认得我？' },
  { id: 'B3', title: '模式升维', question: '如何持续赚钱、可复制？' },
  { id: 'B4', title: '壁垒锁定', question: '如何守住、不被拿走？' },
  { id: 'C1', title: '一纸文脉', question: 'AI 如何真正懂我并守住边界？' },
  { id: 'C2', title: '一个大脑', question: '系统应该记住什么？' },
  { id: 'C3', title: '一张地图', question: '什么更重要、先做什么？' },
  { id: 'C4', title: '一条链路', question: '如何把判断变成可复用行动？' },
] as const;

export const moduleNames = Object.fromEntries(modules.map((item) => [item.id, item.title]));
