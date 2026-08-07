# Studio Snapshot Producer v1

- 状态：IMPLEMENTED / Phase 1.5
- 分类：public-safe intake governance
- 目标：让 `source-snapshots.current.json` 的产生、校验、回执与过期检测成为受治理生产过程，同时不给 Web CI 跨仓超级凭证。

## 1. 安全架构

```text
Owner Systems
PMO / Brain / Content / Soul / Taste / Web
        ↓
Governed Connector Intake
        ↓
committed public-safe Source Envelopes
        ↓
Studio Snapshot Producer
        ↓
normalized generated snapshot + SHA256 receipt
        ↓
Derived Projection / Conflict / LKG
        ↓
Studio
```

Web Actions 的安全边界固定为：

```text
cross_repo_credential = NONE
direct_private_repo_fetch = false
```

Content Engine 等私有 Owner System 不因为 Studio 方便而向 Web 仓配置超级 PAT。

## 2. Manifest

`src/data/studio/source-manifest.json` 冻结：

- 哪些 Source 被当前 Studio 消费；
- 每个 Source 的 Owner System；
- intake mode；
- direct CI fetch 是否允许；
- 最大快照年龄 24h；
- 每 6h 只读健康检查。

Bao / Deploy 当前保持 `registered_only`，不伪装成 Golden Loop 001 的运行事实输入。

## 3. Producer

`scripts/produce-studio-snapshot.mjs` 做四类检查：

1. **Envelope**：schema / classification / authoritative boundary；
2. **Provenance**：sourceRef / sourceRevision / observedAt / businessState；
3. **Privacy**：禁止 token / secret / password / cookie / authorization / API key / email / phone 等敏感字段进入 public-safe snapshot；
4. **Local Web truth**：当前 Campaign 必须真实存在于 Web registry，且 `/campaigns/<slug>/` 的路由合同与 Web Source Envelope 一致。

通过后生成：

- `source-snapshot.normalized.generated.json`
- `source-snapshot-receipt.generated.json`

Receipt 至少包含：

```yaml
status: PASS | BLOCKED
producer:
input_observed_at:
input_sha256:
source_count:
local_web_route_verified:
direct_cross_repo_credential_used: false
intake_mode: governed_connector
```

## 4. Fail-safe

Producer 发现坏输入时：

```text
不生成 normalized input
→ 写 BLOCKED receipt
→ Projection Builder 无法消费 current
→ 自动回退 Last Known Good
→ Studio 显示 STALE
```

因此“采集失败”不会被转换成空数组或伪最新事实。

## 5. Freshness Health

`.github/workflows/studio-source-health.yml` 每 6 小时运行一次，只做：

```text
Validate committed intake
→ Check observedAt <= 24h
→ PASS / FAIL
```

它不拉取私有仓、不自动改 observedAt、不自动 commit，也不把时间流逝本身当成新的事实观察。

## 6. Current pilot truth

2026-08-07 15:32 +08 Intake 仍保持：

- Brain Human Review：`UNASSIGNED_HUMAN / NOT_RUN`
- Content PR #36：OPEN，仍被 #37 阻塞
- Producer Test：`0/3-5 · NOT_RUN`
- Real Action：`0/10 · NOT_RUN`
- Day7 Outcome：`NOT_RUN`
- Changed Rule：`NOT_READY`
- Task2：`WAITING_CHANGED_RULE`

Content 的 `MISSING_ROUTE` 与 Web 的 `ROUTE_PRESENT` 仍形成真实 projection drift；刷新 Snapshot 不等于替上游静默修正。
