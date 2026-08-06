# 内容生产与治理协议 v0.2｜Signal to Outcome

- 状态：`accepted / execution-baseline`
- 日期：2026-08-06
- 上位法：`moonstachain/yuanli-strategy-soul`

## 1. 内容的第一性目标

文章不是为了填满网站，也不是为了证明原力战略概念很多。

每个内容产品必须尽可能推动这条链：

```text
现实变化或用户症状
→ 事实与证据边界
→ 认知冲突
→ 原力裁决
→ 最小行动
→ Outcome Question
→ 回访与Changed Rule候选
```

最低验收：读者形成一个判断、完成一个动作，或留下一个可见资产。

更高验收：行动产生可观察结果，结果改变下一次内容、工具或任务。

## 2. 五类文章继续有效

| 类型 | 任务 | 主要证据 |
|---|---|---|
| insight | 从外部事件进入时代机制 | 可核验外部来源＋明确推论 |
| canon | 讲透稳定概念和边界 | Soul正典引用 |
| case | 展示真实对象如何发生 | Baseline、Action、Outcome、反例 |
| tool | 帮用户完成一个动作 | 输入、步骤、输出、验收 |
| library | 将经典学科翻译为原力视角 | 原始/权威来源＋边界声明 |

文章类型回答“这篇内容承担什么任务”，不是栏目名。

## 3. 战役角色

一个完整认知行动包可包含五种角色：

| 角色 | 任务 | 允许的最低证据状态 |
|---|---|---|
| hook | 建立与用户有关的时代冲突 | hypothesis，但必须显式标记 |
| evidence | 核验关键事实与争议 | verified或明确的source pack |
| mechanism | 给出原力战略解释 | derived或canon |
| action | 推动最小现实行动 | canon-aligned工具合同 |
| reflection | 记录Outcome、失败与规则变化 | verified的人类判定 |

新增可选Front Matter字段：

- `campaign`：所属媒体战役；
- `contentRole`：hook / evidence / mechanism / action / reflection；
- `sourceStatus`：not_required / source_pack_ready / needs_sources / verified_sources；
- `outcomeQuestion`：怎样知道这篇内容在现实中有用。

既有字段继续必填：

- `trilogy` / `module`；
- `theme`；
- `articleType`；
- `userSymptoms`；
- `expensiveJob`；
- `coreConcepts`；
- `evidenceLevel`；
- `canonStatus`；
- `nextAction`。

## 4. 标准文章结构

1. 标题承诺；
2. 30秒原力裁决；
3. 发生了什么；
4. 旧有解释为什么不够；
5. 第一性机制与原力坐标；
6. 对目标用户意味着什么；
7. 案例、反例与边界；
8. 24小时或7天最小行动；
9. Outcome Question。

对于纯canon或tool文章，“发生了什么”可以由稳定问题或使用场景替代，但必须说明为什么无需外部来源。

## 5. 证据纪律

- `canon`：由Soul正典明确支持；
- `verified`：存在可核验事实、真实行动或有权人类确认；
- `derived`：基于证据或正典的分析与推论，必须标明推论；
- `hypothesis`：待检验假设，不得写成既成事实。

来源状态与证据等级不得混用：

```text
sourceStatus说明外部来源包是否存在。
evidenceLevel说明文章中的结论当前达到什么强度。
```

例如，机制文章可以无需外部来源并标为canon；趋势Hook若尚无事实包，必须同时标记 `hypothesis + needs_sources`。

Output不等于Outcome。页面上线、工具存在、用户点赞、阅读量和AI生成回执均不能单独证明业务结果。

## 6. 标题纪律

标题优先使用：

```text
熟悉对象
＋ 反常识变化
＋ 与读者有关的后果
```

标题可以有张力，但必须满足：

1. 承诺与正文一致；
2. 不把可能性写成已发生事实；
3. 不用夸张替代证据；
4. 正典术语不得为了传播而改变含义；
5. 正文必须给出反例、边界或尚未知部分。

## 7. B4最新口径

壁垒只使用四种控制权：

- 虚：心智控制权；
- 实：交付控制权；
- 入：入口控制权；
- 出：留存控制权。

飞轮是四权相互强化的动态结果，母体是生成源，不作为第五、第六壁垒并列。

## 8. 隐私与公开边界

禁止进入本仓：

- Founder完整私密身份与敏感经历；
- 客户可识别隐私、原始对话和未授权材料；
- 凭证、密钥、内部经营真账；
- 未经确认的敏感推断；
- Brain、PMO或Runtime的第二份事实账。

案例必须脱敏、授权并标注证据成熟度。

## 9. 发布门

文章从draft进入published前必须满足：

1. 标题承诺与正文一致；
2. 正典术语无漂移；
3. 事实、分析、假设可区分；
4. 至少一个反例、限制或尚未知部分；
5. 有清晰下一步行动；
6. 有Outcome Question，或明确说明不适用；
7. 外部事实主张具备来源状态；
8. 内链与外链可访问；
9. 不越过Web法权边界。

## 10. 回写门

内容产生Changed Rule候选时，至少记录：

```yaml
trigger:
article_or_tool:
user_action:
observed_outcome:
old_rule:
proposed_changed_rule:
evidence:
limitations:
human_decision:
next_task_to_load:
```

规则获批不等于Compounding。只有在第二次真实任务开始前被明确加载，并产生可观察的判断或行动变化，才允许标记为 `reused`。
