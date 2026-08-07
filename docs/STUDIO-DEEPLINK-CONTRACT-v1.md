# 原力 Studio Deep Link Contract v1

- 状态：FROZEN / Phase 0
- 目标：从“任务”直接钻进正确作业台或真源，不让生产者自己寻找仓库路径。

## 1. Link Envelope

每个关键 Studio 对象至少支持：

```yaml
target_kind:
owner_system:
object_id:
label:
href:
fallback_href:
verified_route: true | false
```

`verified_route=false` 时只允许链接到已验证的系统入口，不猜测深层 hash route。

## 2. 路由边界

| Studio 对象 | 优先目标 |
|---|---|
| Portfolio / Owner / WIP | PMO 项目对象 |
| Claim / Evidence | Brain Evidence Pack / Review Gate |
| Campaign runtime | Content Engine Campaign 真源；专业控制面可去 Workbench 已验证入口 |
| Work | Content Work / Web public work pointer |
| Human Gate / Changed Rule | Soul live pilot / Gate |
| Visual Review | Taste |
| Public Page / Tool | Web |
| Signal 作业 | Bao |
| Deploy truth | publish/deploy receipt |

## 3. 已验证入口

Phase 0—1 只冻结已核验入口：

- Bao：`https://os-zk.84000.art/bao.html`
- Content Workbench：`https://os-zk.84000.art/content-engine-workbench/index.html#orchestration/overview`

当前 Workbench main 仍以既有 Campaign 数据合同为默认，不为 `MG-D2-ai-distillation-v1` 猜测不存在的 Campaign deep route；在 Workbench 支持该对象前，Studio 使用 Content PR / run-state 真源 + Workbench overview 双入口。

## 4. Deep Link 行为

Studio 默认按钮语言：

- `继续推进 →`：去负责下一动作的 Owner System。
- `查看证据 →`：去 Evidence Owner。
- `查看工程真相 →`：去 Workbench 或对应 receipt/source。
- `查看公开体验 →`：去 Web。

不得使用“去后台看看”这类无对象指向的链接。

## 5. 写入边界

v2 Deep Link 只做 Read + Route。

未来任何写操作都必须：

```text
Studio Proposal
→ Owner System
→ Authority Check
→ Governed Writer / Transaction
→ Receipt
→ Studio Readback
```

禁止 `Studio button → 直接改 Canon / 直接 push 共享部署仓`。
