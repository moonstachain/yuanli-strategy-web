const paths = {
  unsure: {
    title: "先把最近一次卡住的事情写清楚", href: "/practice", label: "开始写自己的问题卡", practice: "/practice",
    method: "从真实问题开始 / 先观察，再判断",
    read: "先写一件最近发生的事，区分看见的事实与自己的解释。问题变具体以后，再选择一篇对应的阅读。",
    material: "最近一次卡住的具体情境、你采取过的行动，以及仍不知道的事情。",
  },
  direction: {
    title: "先把增长选择放在一起比较", href: "/work/growth-choices", label: "阅读增长取舍的完整拆解", practice: "/practice?topic=direction",
    method: "原力创业 / 原力借势、品类独创",
    read: "比较触达、客户与品类、交付承接三种解释。看清每条路径成立的证据，再决定先检验哪一个约束。",
    material: "近期成交与未成交记录、现有资源，以及本次能够承担的投入。",
  },
  value: {
    title: "从被认可，走向被选择", href: "/work/customer-choice", label: "阅读客户选择的判断短文", practice: "/practice?topic=value",
    method: "原力创业 / 品类独创",
    read: "从一句“很专业”继续追问：客户要完成什么、还有哪些替代选择，以及合作范围是否清楚。",
    material: "一次真实沟通、客户最终选择或暂缓的原因，以及你能够交付的具体产物。",
  },
  continuity: {
    title: "找到真正需要创始人的环节", href: "/work/founder-judgment", label: "阅读创始人判断与工作接续", practice: "/practice?topic=continuity",
    method: "原力 OS / 一纸文脉、一张地图、一条链路",
    read: "回到一项反复找你审核的任务。分清资料、标准、授权和重大取舍，先做一次范围明确的交接。",
    material: "一条真实业务流程、最近一次修改记录、责任人，以及最终被接受的产物。",
  },
  assets: {
    title: "从做成的事，辨认独特能力", href: "/method#assets", label: "从原力资产四个问题读起", practice: "/practice?topic=assets",
    method: "原力资产 / 发现母体、显化原力",
    read: "回到你亲自参与的具体事情，观察哪些判断跨情境反复出现。先形成有证据的能力线索，再用现实任务检验。",
    material: "三件亲自做成的事、你的具体贡献，以及能够核对的产物和反馈。",
  },
} as const;

export type ReadingGoal = keyof typeof paths;
export type NextDecision = "unsure" | "choose" | "validate" | "handoff";

export function readingPath(goal: ReadingGoal, decision: NextDecision = "unsure") {
  if (goal === "unsure" && decision === "handoff") return paths.continuity;
  if (goal === "unsure" && (decision === "choose" || decision === "validate")) return paths.direction;
  return paths[goal];
}
