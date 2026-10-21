import { test } from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { handleContact, handleInbox } from "../lib/contact-service.ts";

function setup() {
  const sql = new DatabaseSync(":memory:");
  sql.exec(`CREATE TABLE inquiries (id TEXT PRIMARY KEY, request_key TEXT UNIQUE NOT NULL, payload_hash TEXT NOT NULL, name TEXT NOT NULL, business TEXT NOT NULL, question TEXT NOT NULL, contact_type TEXT NOT NULL, contact_value TEXT NOT NULL, created_at TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'new', submitted_by TEXT);`);
  const db = { prepare(query: string) { let values: any[] = []; const stmt = { bind(...args: any[]) { values = args; return stmt; }, async first() { return sql.prepare(query).get(...values) ?? null; }, async all() { return { results: sql.prepare(query).all(...values) }; }, async run() { sql.prepare(query).run(...values); return { success: true }; } }; return stmt; } };
  return { db: db as any, ownerEmail: "owner@example.test" };
}
const payload = { name: "测试访客", business: "经营一间专业服务工作室", question: "客户越来越多，如何减少交付对创始人的依赖？", contactType: "email", contactValue: "visitor@example.test", consent: true, website: "", requestKey: "00000000-0000-4000-a000-000000000001" };
function post(value: unknown = payload) { return new Request("https://site.test/api/contact", {method:"POST",headers:{"content-type":"application/json","origin":"https://site.test"},body:JSON.stringify(value)}); }
function inbox(email = "owner@example.test") { return new Request("https://site.test/api/inquiries", {headers:{"oai-authenticated-user-id":"operator-test","oai-authenticated-user-email":email}}); }

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
