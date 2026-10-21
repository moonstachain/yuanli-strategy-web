import { test } from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { readFileSync, readdirSync } from "node:fs";
import { handleContact, handleInbox, handleInquiryChange } from "../lib/contact-service.ts";

function setup() {
  const sql = new DatabaseSync(":memory:");
  const migrationFolder = new URL("../drizzle/", import.meta.url);
  for (const name of readdirSync(migrationFolder).filter(name => name.endsWith(".sql")).sort()) sql.exec(readFileSync(new URL(name, migrationFolder), "utf8"));
  const db = { prepare(query: string) { let values: any[] = []; const stmt = { bind(...args: any[]) { values = args; return stmt; }, async first() { return sql.prepare(query).get(...values) ?? null; }, async all() { return { results: sql.prepare(query).all(...values) }; }, async run() { sql.prepare(query).run(...values); return { success: true }; } }; return stmt; } };
  return { db: db as any, ownerEmail: "owner@example.test" };
}
const payload = { name: "测试访客", business: "经营一间专业服务工作室", question: "客户越来越多，如何减少交付对创始人的依赖？", contactType: "email", contactValue: "visitor@example.test", consent: true, website: "", requestKey: "00000000-0000-4000-a000-000000000001" };
function post(value: unknown = payload) { return new Request("https://site.test/api/contact", {method:"POST",headers:{"content-type":"application/json","origin":"https://site.test"},body:JSON.stringify(value)}); }
function inbox(email = "owner@example.test") { return new Request("https://site.test/api/inquiries", {headers:{"oai-authenticated-user-id":"operator-test","oai-authenticated-user-email":email}}); }
function change(value: unknown, method = "PATCH") {
  return new Request("https://site.test/api/inquiries", { method, headers: { "content-type": "application/json", origin: "https://site.test", "oai-authenticated-user-id": "operator-test", "oai-authenticated-user-email": "owner@example.test" }, body: JSON.stringify(value) });
}

test("the owner can record a next action and read it back without changing the visitor's submission", async () => {
  const environment = setup();
  const receipt = await (await handleContact(post(), environment)).json() as { reference: string };
  const result = await handleInquiryChange(change({ id: receipt.reference, status: "in_progress", nextAction: "核对问题范围后联系", followUpAt: "2026-10-25", expectedUpdatedAt: "" }), environment);
  assert.equal(result.status, 200);
  const rows = await (await handleInbox(inbox(), environment)).json() as { inquiries: { status: string; nextAction: string; followUpAt: string; updatedAt: string; question: string }[] };
  assert.equal(rows.inquiries[0].status, "in_progress");
  assert.equal(rows.inquiries[0].nextAction, "核对问题范围后联系");
  assert.equal(rows.inquiries[0].followUpAt, "2026-10-25");
  assert.ok(rows.inquiries[0].updatedAt);
  assert.equal(rows.inquiries[0].question, payload.question);
});

test("deletion requires explicit confirmation and removes only the selected contact record", async () => {
  const environment = setup();
  const first = await (await handleContact(post(), environment)).json() as { reference: string };
  const second = await (await handleContact(post({ ...payload, requestKey: crypto.randomUUID(), question: "第二条独立测试请求" }), environment)).json() as { reference: string };
  assert.equal((await handleInquiryChange(change({ id: first.reference, expectedUpdatedAt: "" }, "DELETE"), environment)).status, 400);
  const result = await handleInquiryChange(change({ id: first.reference, expectedUpdatedAt: "", confirm: true }, "DELETE"), environment);
  assert.equal(result.status, 200);
  const rows = await (await handleInbox(inbox(), environment)).json() as { inquiries: { id: string }[] };
  assert.deepEqual(rows.inquiries.map(row => row.id), [second.reference]);
});

test("inquiry changes reject unauthorized, cross-origin and invalid requests without changing the record", async () => {
  const environment = setup();
  const receipt = await (await handleContact(post(), environment)).json() as { reference: string };
  const value = { id: receipt.reference, expectedUpdatedAt: "", status: "in_progress", nextAction: "核对问题", followUpAt: "", confirm: true };
  for (const method of ["PATCH", "DELETE"]) {
    const anonymous = change(value, method); anonymous.headers.delete("oai-authenticated-user-id");
    assert.equal((await handleInquiryChange(anonymous, environment)).status, 401);
    const other = change(value, method); other.headers.set("oai-authenticated-user-email", "other@example.test");
    assert.equal((await handleInquiryChange(other, environment)).status, 403);
    assert.equal((await handleInquiryChange(change(value, method), { db: environment.db })).status, 403);
    const crossOrigin = change(value, method); crossOrigin.headers.set("origin", "https://other.test");
    assert.equal((await handleInquiryChange(crossOrigin, environment)).status, 403);
    const noOrigin = change(value, method); noOrigin.headers.delete("origin");
    assert.equal((await handleInquiryChange(noOrigin, environment)).status, 403);
  }
  for (const invalid of [{ status: "booked" }, { nextAction: " " }, { nextAction: "x".repeat(601) }, { followUpAt: "2026-02-30" }, { expectedUpdatedAt: "bad-date" }]) assert.equal((await handleInquiryChange(change({ ...value, ...invalid }), environment)).status, 400);
  const row = (await (await handleInbox(inbox(), environment)).json() as { inquiries: { status: string }[] }).inquiries[0];
  assert.equal(row.status, "new");
});

test("stale updates and deletions cannot overwrite a newer human handoff", async () => {
  const environment = setup();
  const receipt = await (await handleContact(post(), environment)).json() as { reference: string };
  const value = { id: receipt.reference, expectedUpdatedAt: "", status: "in_progress", nextAction: "第一位负责人已接续", followUpAt: "" };
  const saved = await (await handleInquiryChange(change(value), environment)).json() as { inquiry: { updatedAt: string } };
  assert.equal((await handleInquiryChange(change({ ...value, status: "closed" }), environment)).status, 409);
  assert.equal((await handleInquiryChange(change({ ...value, confirm: true }, "DELETE"), environment)).status, 409);
  const latest = await handleInquiryChange(change({ ...value, status: "closed", expectedUpdatedAt: saved.inquiry.updatedAt }), environment);
  assert.equal(latest.status, 200);
  assert.equal((await latest.json() as { inquiry: { status: string } }).inquiry.status, "closed");
});

test("storage failures for owner changes never claim saving or deleting succeeded", async () => {
  const environment = { ownerEmail: "owner@example.test", db: { prepare() { throw new Error("unavailable"); } } };
  const value = { id: "YL-00000000-0000-4000-a000-000000000001", expectedUpdatedAt: "", status: "closed", nextAction: "", followUpAt: "", confirm: true };
  for (const method of ["PATCH", "DELETE"]) {
    const response = await handleInquiryChange(change(value, method), environment);
    assert.equal(response.status, 503);
    const result = await response.json() as { saved?: boolean; deleted?: boolean };
    assert.equal(result.saved, undefined); assert.equal(result.deleted, undefined);
  }
});

test("a valid inquiry is durably saved before receipt and appears in the authorized inbox", async () => {
  const environment = setup();
  const receipt = await handleContact(post(), environment);
  assert.equal(receipt.status, 201);
  const body = await receipt.json() as any;
  assert.match(body.reference, /^YL-/);
  const list = await handleInbox(inbox(), environment);
  assert.equal(list.status, 200);
  const data = await list.json() as any;
  assert.equal(data.inquiries.length, 1);
  assert.equal(data.inquiries[0].id, body.reference);
  assert.equal(data.inquiries[0].question, payload.question);
});


test("retrying the same request returns the original receipt without a duplicate", async () => {
  const environment = setup();
  const first = await (await handleContact(post(), environment)).json() as any;
  const second = await handleContact(post(), environment);
  assert.equal(second.status, 200);
  assert.equal((await second.json() as any).reference, first.reference);
  assert.equal((await (await handleInbox(inbox(), environment)).json() as any).inquiries.length, 1);
  const changed = await handleContact(post({ ...payload, question: "Changed question" }), environment);
  assert.equal(changed.status, 409);
});

test("invalid input, missing consent and cross-origin submissions do not save a request", async () => {
  const environment = setup();
  assert.equal((await handleContact(post({ ...payload, consent: false }), environment)).status, 400);
  assert.equal((await handleContact(post({ ...payload, contactValue: "bad-email" }), environment)).status, 400);
  const crossOrigin = post(); crossOrigin.headers.set("origin", "https://other.test");
  assert.equal((await handleContact(crossOrigin, environment)).status, 403);
  assert.equal((await (await handleInbox(inbox(), environment)).json() as any).inquiries.length, 0);
});

test("a storage failure never returns a successful receipt", async () => {
  const db = { prepare() { throw new Error("storage unavailable"); } };
  const result = await handleContact(post(), { db });
  assert.equal(result.status, 503);
  assert.equal((await result.json() as any).saved, undefined);
});

test("the inbox fails closed for an anonymous user, another account, or an unset owner", async () => {
  const environment = setup();
  await handleContact(post(), environment);
  assert.equal((await handleInbox(new Request("https://site.test/api/inquiries"), environment)).status, 401);
  assert.equal((await handleInbox(inbox("someone-else@example.test"), environment)).status, 403);
  assert.equal((await handleInbox(inbox(), { db: environment.db })).status, 403);
});

test("a sixth distinct submission for one contact within an hour is rejected", async () => {
  const environment = setup();
  for (let i = 0; i < 5; i++) {
    const response = await handleContact(post({ ...payload, requestKey: crypto.randomUUID() }), environment);
    assert.equal(response.status, 201);
  }
  assert.equal((await handleContact(post({ ...payload, requestKey: crypto.randomUUID() }), environment)).status, 429);
});


test("concurrent submissions cannot exceed the per-contact hourly allowance", async () => {
  const environment = setup();
  for (let i = 0; i < 4; i++) await handleContact(post({ ...payload, requestKey: crypto.randomUUID() }), environment);
  const results = await Promise.all(Array.from({ length: 3 }, () => handleContact(post({ ...payload, requestKey: crypto.randomUUID() }), environment)));
  assert.deepEqual(results.map(r => r.status).sort(), [201, 429, 429]);
});


test("concurrent retries at the allowance boundary return the one persisted receipt", async () => {
  const environment = setup();
  for (let i = 0; i < 4; i++) await handleContact(post({ ...payload, requestKey: crypto.randomUUID() }), environment);
  const results = await Promise.all([handleContact(post(), environment), handleContact(post(), environment)]);
  const receipts = await Promise.all(results.map(response => response.json() as Promise<any>));
  assert.equal(receipts[0].reference, receipts[1].reference);
  assert.equal((await (await handleInbox(inbox(), environment)).json() as any).inquiries.length, 5);
});
