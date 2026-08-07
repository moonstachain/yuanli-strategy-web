# 原力 Studio｜B端生产者门户 v1

- 状态：`SUPERSEDED BY STUDIO v2 CONSTITUTION`
- 历史用途：记录 PR #30 的只读 MVP 决策与首次成功定义。
- 当前正本：`docs/STUDIO-PRODUCT-CONSTITUTION-v2.md`
- 数据正本合同：`docs/STUDIO-DATA-CONTRACT-v1.md`
- Deep Link：`docs/STUDIO-DEEPLINK-CONTRACT-v1.md`
- Reality：`docs/STUDIO-REALITY-CONTRACT-v1.md`

## v1 保留不变的原则

Studio 不是第七个真源；它是六仓之上的生产控制面。

首个运行对象仍是：`MG-D2-ai-distillation-v1｜AI正在蒸馏你`。

生产者首次成功仍要求：15分钟内理解一个 Signal 为什么值得研究、其证据缺口在哪里、下一道门是什么，并能去正确真源继续执行。

真人生产者测试在真实执行前保持 `NOT_RUN`。

## v2 发生的升级

v1 的 `src/data/studio.ts` 曾手工维护聚合运行状态。v2 不再允许这种模式：

```text
Owner Systems
→ public-safe source snapshot
→ deterministic derived projection
→ Last Known Good / Conflict visibility
→ Studio
```

旧导航在 Phase 1 保持兼容，最终 IA 按 v2 Constitution 分阶段迁移，不为了导航完整度提前制造空页面。
