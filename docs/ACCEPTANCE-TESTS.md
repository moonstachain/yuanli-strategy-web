# 验收测试 v0.1

## AT-WEB-001 · 工程可构建

```bash
npm ci
npm run build
```

通过条件：命令退出码为 0，`dist/` 生成。

## AT-WEB-002 · 内容 Schema

通过条件：任何 published 文章缺少模块、主题、贵任务、证据等级、正典状态或下一步行动时，构建失败。

## AT-WEB-003 · 路由完整

通过条件：首页、文章列表、3 篇种子文章、6 个主题页、关于页和 404 均在静态构建中生成。

## AT-WEB-004 · 法权边界

通过条件：README 与 About 明确 Soul 为正典真源；Web 不宣称拥有正典修改权。

## AT-WEB-005 · B4 漂移门

通过条件：公开内容不出现“飞轮壁垒、母体壁垒”作为并列第五、第六壁垒；只使用虚、实、入、出四种控制权。

## AT-WEB-006 · 文章最小行动

通过条件：所有 published 文章具有 `nextAction`；文章详情页展示读后行动区。

## AT-WEB-007 · 隐私门

通过条件：仓库中不存在真实密钥、客户可识别原始资料、未经授权逐字稿或私密经营真账。

## AT-WEB-008 · Phase 3 复利验收

通过条件：Task1 产生的 Changed Rule 经 Human Gate 后，在 Task2 开始前被明确读取，并保留复用回执。否则最多标为 Done / Validated，不得标为 Compounding。
