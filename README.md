# 原力战略 Web

> **从前沿认知到真实事业结果：看见变化，找到最值得验证的一环，完成一次行动，并让结果进入下一次。**

公开站点：`https://moonstachain.github.io/yuanli-strategy-web/`

## 产品角色

本仓不是 Soul、Brain、内容经营总账或 PMO。

它是原力战略的：

- 前沿战略媒体前台；
- 首次用户成功旅程；
- 公开文章、案例和工具入口；
- public-safe Evidence / Outcome 投影；
- 必要、匿名、最小化的用户行动界面。

一句话边界：

> **Web负责让用户看见、理解并采取行动；Soul管法，Brain管证据，Content Engine管内容经营，PMO管项目状态。**

## 首次用户旅程

```text
前沿信号
→ 真实症状
→ 3分钟原力导航
→ 优先验证坐标
→ 唯一推荐工具
→ 本地保存与继续上次进度
→ 现实行动与Outcome
```

入口：

- `/`：媒体化首页与A/B/C三类症状入口；
- `/start/`：3分钟原力导航v0.1；
- `/tools/`：按“适合谁—需要什么—得到什么—下一步”组织的工具中心；
- `/articles/`：深度用户使用的搜索与筛选中心；
- `/status/`：Done / Validated / Compounding透明建设账。

导航结果当前状态为 `navigation hypothesis`，不是人格测评、能力评级或经验证诊断。

## 内容发动机

最小产品不是单篇文章，而是一个原力认知行动包：

```text
Signal
→ Evidence
→ Judgment
→ Action
→ Outcome
```

文章Front Matter支持：

- `campaign`
- `contentRole`
- `sourceStatus`
- `outcomeQuestion`
- `evidenceLevel`
- `canonStatus`
- `nextAction`

事实、推论、假设和正典必须显式区分；Evidence未完成时保持 `NOT_RUN / needs_sources`。

## 当前首个战役

`AI正在蒸馏你`

- Hook：`when-experience-becomes-skill`
- Mechanism：`extractable-ability-vs-generative-source`
- Action：`ai-clearance-action-guide`
- Evidence：任务包已建，真实事实包仍需Brain与人工核验

## 本地连续性

默认只使用浏览器 `localStorage`：

```text
yuanli-navigation:v0.1
yuanli-journey:last
yuanli-tool:<pathname>
```

用途：

- 恢复未完成导航；
- 显示最近原力坐标；
- 恢复工具草稿；
- 在首页显示“继续上次进度”。

本地状态不自动上传，不应填写客户姓名、密钥或未经授权真账。

## 开发

```bash
npm install
npm run dev
npm run build
```

`npm run build` 会先运行设计契约：

```bash
npm run check:design
```

设计契约检查：

- paper / field / cockpit 三种主题；
- 任务型主导航；
- 3分钟导航与本地连续性；
- 首页首次成功旅程；
- 文章搜索；
- 工具本地草稿；
- 阅读进度和无障碍基础；
- 透明状态账。

## 核心文档

- `docs/FIRST-SUCCESS-JOURNEY-v1.md`
- `docs/CONTENT-PROTOCOL.md`
- `docs/INFORMATION-ARCHITECTURE.md`
- `docs/EDITORIAL-COLUMNS-MATRIX-v1.md`
- `docs/ROADMAP-90D.md`
- `docs/PORTAL-DESIGN-SYSTEM-v1.md`
- `docs/campaigns/AI-DISTILLATION-EVIDENCE-PACKET-v0.1.md`

## 跨仓依赖

- Soul接口：`moonstachain/yuanli-strategy-soul#457`
- Brain证据：`moonstachain/yuanli-brain#2`
- Content Engine战役：`moonstachain/yuanli-content-engine-os#35`
- Taste设计门：`moonstachain/yuanli-taste#1`
- PMO运行总账：`os-yuanli/yuanli-pmo#23`

## 状态纪律

页面和代码存在只证明 `Done`。

真人测试前保持：

```text
首次理解效率：NOT_RUN
入口选择正确率：NOT_RUN
导航完成率：NOT_RUN
工具完成率：NOT_RUN
回访连续性：NOT_RUN
Outcome：NOT_RUN
Changed Rule：NOT_RUN
第二任务复用：NOT_RUN
```
