# RAY｜原力战略

面向成熟企业家与专家型创业者的战略判断与事业系统设计。首版把经营问题、完整判断演示、合作方式与真实联系接收连成一条可使用的路径。

## 项目入口

- [主规格 #38](https://github.com/moonstachain/yuanli-strategy-web/issues/38)
- [六个实施任务](https://github.com/moonstachain/yuanli-strategy-web/issues/38#issuecomment-6309246835)
- [方法正典](https://github.com/moonstachain/yuanli-strategy-soul/blob/main/CONSTITUTION.md)
- [公开安全人物文脉](https://github.com/moonstachain/yuanli-strategy-soul/blob/main/wenmai/projections/mingge-public-safe-v2.md)

代码归属 `moonstachain/yuanli-strategy-web/business-site/`。这是独立依赖、独立发布的商业应用；Sites 源仓保存它的部署镜像。开发任务标识为 `WEB-RAY-20261021`。当前阶段使用负责人可访问的私密预览，公开发布另行记证。

## 当前功能

| 路径 | 内容或功能 |
| --- | --- |
| `/` | 定位、问题入口、判断样板与合作入口 |
| `/start` | 八扇问题门、三问阅读导航 |
| `/method` | 原力资产、原力创业、原力 OS 及十二模块 |
| `/work` | 方法演示目录与两篇完整判断短文 |
| `/work/growth-choices` | 增长取舍演示、四份可读工作样张 |
| `/work-with-ray` | 战略对焦、战略共创、落地共建 |
| `/ray` | RAY 的工作角色、方式与边界 |
| `/contact` | 四项必要资料、可编辑主题、实际保存后回执 |
| `/privacy` | 信息用途、访问与更正/删除入口说明 |
| `/inbox` | 负责人授权后读取最近 100 条请求 |

`POST /api/contact` 只在数据库持久化后返回回执。同一提交键重试保持同一记录，变更内容冲突返回 409；短期限流通过原子 SQL 实施。`GET /api/inquiries` 校验平台身份及服务器端负责人配置，不向普通访客返回联系资料。收到回执不代表人工已读、已预约或已同意合作。

## 本地开发

Node.js 24 是本轮验证环境。安装依赖后在本目录运行：

```sh
npm run install:ci
npm run dev
npm run typecheck
npm test
npm run build
```

使用 Sites 插件时优先遵循其安装、预览、构建和发布流程，避免重复启动开发服务。平台说明保留在 [docs/PLATFORM.md](docs/PLATFORM.md)。

数据库迁移位于 `drizzle/`。本地构建生成 `dist/server/wrangler.json` 后，只应用尚未应用的迁移：

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_graceful_madelyne_pryor.sql
```

托管环境通过 Sites 配置 `INBOX_OWNER_EMAIL` secret；实际值不得进入源码、客户端、日志、issue 或 PR。它只作为明确的负责人准入条件，持久用户键仍使用平台注入的 user ID。没有配置时收件入口默认拒绝访问。`.env.example` 只有变量名。

## 内容与交接

领域术语见 [GLOSSARY.md](GLOSSARY.md)，架构决定见 `docs/adr/`。联系处理、内容维护与公开前条件见 [docs/OPERATIONS.md](docs/OPERATIONS.md)。工程行为证据及部署状态以对应 PR / issue 为准；真人理解度、人工承接和经营成果需要独立验收。

公开内容只使用获准发布的材料。增长拆解是明确标记的模拟情境；合作周期是服务设计建议，不是历史业绩或收益保证。
