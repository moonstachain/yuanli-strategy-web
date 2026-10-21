import { test } from "node:test";
import assert from "node:assert/strict";
import { readingPath } from "../lib/problem-paths.ts";

test("growth, customer choice and founder continuity lead to different first readings", () => {
  assert.equal(readingPath("direction").href, "/work/growth-choices");
  assert.equal(readingPath("value").href, "/work/customer-choice");
  assert.equal(readingPath("continuity").href, "/work/founder-judgment");
});

test("an undecided visitor can start from a concrete handoff decision or an empty problem card", () => {
  assert.equal(readingPath("unsure", "handoff").href, "/work/founder-judgment");
  assert.equal(readingPath("unsure", "choose").href, "/work/growth-choices");
  assert.equal(readingPath("unsure", "validate").href, "/work/growth-choices");
  assert.equal(readingPath("unsure", "unsure").href, "/practice");
  assert.equal(readingPath("value", "handoff").href, "/work/customer-choice");
});
