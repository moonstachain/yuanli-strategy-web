# 原力 Studio Reality Contract v1

- 状态：FROZEN / Phase 0
- 目标：让 Studio 永远区分“生产完成”和“现实成立”。

## 1. 现实成熟度

固定阶梯：

```text
Draft → Output → Used → Validated → Compounding
```

禁止映射：

- 页面存在 ≠ Used
- 发布成功 ≠ Validated
- 阅读 / 点赞 ≠ Outcome
- 时间经过 ≠ Observation
- Changed Rule 文件存在 ≠ Compounding

## 2. Waiting Reality

任何依赖外部世界的事项必须进入 Waiting Reality，而不是伪装成工程待办：

- 3—5 位真实生产者测试；
- 10 位真实目标用户完成 AI 清算；
- 24h / 72h / 7d / 30d 回访窗口；
- 真实业务行为与结果；
- Task2 第二次复用。

无人、无回执、无观察时保持 `NOT_RUN`。

## 3. Outcome

Outcome 至少需要：

```yaml
action_receipt:
observed_at:
what_changed:
result:
source_ref:
privacy_state:
```

Studio 不保存私密原始回执，只投影匿名 public-safe 状态和指针。

## 4. Learning

学习不能只回答“数据涨没涨”，必须区分：

```text
Signal / Claim / Audience / Work / Channel / CTA / Tool / Delivery / Insufficient Evidence
```

## 5. 三复利轮

每个完成真实观察的 Campaign 复盘：

- Asset Compounding：新增了什么可复用 Evidence / Work / Tool / Case / Pattern？
- Process Compounding：哪条生产或治理流程需要改变？
- Prior Compounding：哪一个先验、阈值、排序或概率被真实结果更新？

## 6. Changed Rule Gate

只有以下条件均成立才允许显示 `Changed Rule Candidate READY`：

```text
real_action_observed = true
real_outcome_observed = true
learning_supported = true
```

否则保持 `NOT_READY`。

Changed Rule 的批准权在 Soul Human Gate；Studio 和 AI 均不得自动批准。

## 7. Task2

Task2 事前加载可以预登记目标，但只有经 Human Gate 批准的 Changed Rule 才能进入下一任务的执行上下文。

当前试点 Task2：`判断力成为新阶层`；在真实规则产生前保持 `WAITING_CHANGED_RULE`。
