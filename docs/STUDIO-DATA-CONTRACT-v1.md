# 原力 Studio Data Contract v1

- 状态：FROZEN / Phase 0
- 分类：public-safe derived projection
- 原则：Studio 读取事实，不拥有事实。

## 1. Source Envelope

每个进入 Studio 的输入必须至少携带：

```yaml
key:
owner_system:
source_ref:
source_revision:
observed_at:
freshness:
classification: public-safe
facts: {}
```

`source_revision` 可以是 commit SHA、blob SHA、PR head SHA、Issue + updated_at 等可追踪版本；不得伪造不存在的 immutable SHA。

## 2. 字段法权

| 字段 | 最终法权 |
|---|---|
| project_id / owner / WIP / gate sequence | PMO |
| Claim / Evidence / Conflict / Gap / Human Evidence Review | Brain |
| Campaign runtime / Work / Distribution / Action receipt contract | Content Engine |
| Human Gate / Canon / Changed Rule / Task2 approval | Soul |
| Visual Gate / design SSOT | Taste |
| public route / C-end page state / producer usability test | Web |
| publish receipt / byte verification / deployment identity | Deploy |
| signal candidate / radar observation | Bao（仅 Signal，不晋级事实） |

## 3. 仲裁规则

1. Studio 可以根据字段法权选择用于展示的 authoritative value，但必须保留其他来源的冲突记录。
2. 发现两个来源对同一字段给出不同值时，不做静默平均。
3. 冲突输出必须包含：`field / authority / source values / resolution owner / state`。
4. UI 不得通过文案把 `Hypothesis` 升为 `Verified`。
5. `Published`、页面存在、CI PASS、作品存在均不能直接导出 `Validated`。

## 4. Derived Projection

Studio 输出必须明确：

```yaml
derived_projection: true
authoritative: false
source_refs: []
observed_at:
delivery_status: LIVE | STALE | CONFLICT
```

当前实现使用：

- `src/data/studio/source-snapshots.current.json`：本次 public-safe 源输入快照；
- `src/data/studio/studio-view.lkg.json`：上一次成功派生的 Last Known Good；
- `scripts/build-studio-projection.mjs`：确定性派生器；
- `src/data/studio/studio-view.generated.json`：构建期生成，不作为真源提交。

## 5. Last Known Good

- 当前输入完整且合同通过：生成新的 Current View。
- 当前输入缺失/非法：不得以空值覆盖；使用 LKG，并将 `delivery_status=STALE`。
- Source 本身处于业务阻塞不等于 STALE；例如 Content CI BLOCKED 是真实业务事实，仍可由 LIVE source 报告。
- Source 之间存在事实冲突时：`delivery_status=CONFLICT`，但仍展示字段法权裁决值和冲突详情。

## 6. 隐私

Studio 输入和输出只允许 public-safe 数据，不允许：

- 私密用户回执正文；
- 凭证、token、cookie、API key；
- 内部绝对路径；
- 直接身份信息；
- private Workbench projection。
