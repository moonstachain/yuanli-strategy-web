import { test } from "node:test";
import assert from "node:assert/strict";
import { emptyProblemCard, saveProblemCard, loadProblemCard, clearProblemCard, inspectProblemCard, exportProblemCard, PROBLEM_CARD_STORAGE_KEY } from "../lib/problem-card.ts";

function memoryStorage() {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value); },
    removeItem: (key: string) => { values.delete(key); },
  };
}

test("a reader can save an unfinished personal card and restore the exact answers later", () => {
  const storage = memoryStorage();
  const card = { ...emptyProblemCard(), question: "三个新方向，先验证哪一个？", facts: "过去两周收到 4 次相同需求。\n这是观察，还不是结论。" };
  assert.equal(saveProblemCard(storage, card, "direction", "2026-10-21T09:00:00.000Z"), true);
  assert.deepEqual(loadProblemCard(storage), { status: "saved", document: { version: 1, savedAt: "2026-10-21T09:00:00.000Z", topic: "direction", card } });
});

test("export carries the reader's actual answers as literal text, labels missing fields and never executes embedded Markdown or HTML", () => {
  const card = { ...emptyProblemCard(), question: "怎样辨别需求？", facts: "# 自己的标题\n<script>alert('x')</script>\n![远程图片](https://example.test/image)\n```" };
  const exported = exportProblemCard(card, "value", "2026-10-21T09:00:00.000Z");
  assert.ok(exported.startsWith("# 我的原力问题卡\n\n方向：客户与价值\n导出时间：2026-10-21T09:00:00.000Z"));
  assert.ok(exported.includes("## 01 · 我需要做的决定\n\n    怎样辨别需求？"));
  assert.ok(exported.includes("    # 自己的标题\n    <script>alert('x')</script>\n    ![远程图片](https://example.test/image)\n    ```"));
  assert.ok(exported.includes("## 03 · 仍待确认的事\n\n    （尚未填写）"));
  assert.ok(!exported.includes("\n<script>"));
  assert.ok(exported.endsWith("这是一份个人练习，不代表自动诊断或合作申请。\n"));
});

test("a blank card or whitespace is not completed; all five personal answers are required and review dates must exist", () => {
  assert.deepEqual(inspectProblemCard(emptyProblemCard()), { complete: false, filled: 0, missing: ["question", "facts", "unknowns", "explanation", "nextEvidence"], dateValid: true });
  const card = { question: "该先做什么", facts: "已有两次复购", unknowns: "客户是否愿意推荐", explanation: "可能是选择理由未被看见", nextEvidence: "访谈三个老客户，记录他们决定购买时比较的替代方案", revisitDate: "2026-02-30" };
  assert.equal(inspectProblemCard(card).dateValid, false);
  assert.equal(inspectProblemCard(card).complete, false);
  assert.equal(inspectProblemCard({ ...card, revisitDate: "2026-10-28" }).complete, true);
  assert.equal(inspectProblemCard({ ...card, facts: " \n ", revisitDate: "" }).filled, 4);
  const storage = memoryStorage();
  assert.equal(saveProblemCard(storage, card, "value", "2026-10-21T09:00:00.000Z"), false);
  assert.equal(saveProblemCard(storage, { ...card, revisitDate: "", question: "a".repeat(501) }, "value", "2026-10-21T09:00:00.000Z"), false);
});

test("clearing removes the saved draft; unavailable storage never reports a successful save or deletion", () => {
  const storage = memoryStorage();
  saveProblemCard(storage, emptyProblemCard(), "value", "2026-10-21T09:00:00.000Z");
  assert.equal(clearProblemCard(storage), true);
  assert.deepEqual(loadProblemCard(storage), { status: "empty" });
  const blocked = { getItem() { throw new Error("denied"); }, setItem() { throw new Error("quota"); }, removeItem() { throw new Error("denied"); } };
  assert.deepEqual(loadProblemCard(blocked), { status: "unavailable" });
  assert.equal(saveProblemCard(blocked, emptyProblemCard(), "value", "2026-10-21T09:00:00.000Z"), false);
  assert.equal(clearProblemCard(blocked), false);
  assert.equal(saveProblemCard(null, emptyProblemCard(), "value", "2026-10-21T09:00:00.000Z"), false);
  assert.equal(clearProblemCard(null), false);
});

test("damaged, oversized and future-version drafts are reported without replacing their data", () => {
  const storage = memoryStorage();
  const future = JSON.stringify({ version: 2, card: { question: "保留这份新版草稿" } });
  storage.setItem(PROBLEM_CARD_STORAGE_KEY, future);
  assert.deepEqual(loadProblemCard(storage), { status: "unsupported" });
  assert.equal(storage.getItem(PROBLEM_CARD_STORAGE_KEY), future);
  for (const raw of ["broken json", "null", JSON.stringify({ version: 1, card: {} }), "a".repeat(50001), JSON.stringify({ version: 1, savedAt: "2026-10-21T09:00:00.000Z", topic: "direction", card: { ...emptyProblemCard(), question: "a".repeat(501) } })]) {
    storage.setItem(PROBLEM_CARD_STORAGE_KEY, raw);
    assert.deepEqual(loadProblemCard(storage), { status: "invalid" });
    assert.equal(storage.getItem(PROBLEM_CARD_STORAGE_KEY), raw);
  }
});
