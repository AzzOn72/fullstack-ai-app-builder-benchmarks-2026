import { test } from "node:test";
import assert from "node:assert/strict";
import { CHECKS, validateResults } from "../scripts/validate-results.mjs";
const product = () => ({ id: "uvilno", score: null, checks: CHECKS.map(id => ({ id, status: "unmeasured" })) });
test("unmeasured records are allowed without an invented score", () => assert.equal(validateResults({ protocol: 1, products: [product()] }), 1));
test("an invented score is rejected", () => assert.throws(() => validateResults({ protocol: 1, products: [{ ...product(), score: 97 }] })));
test("a claimed result without evidence is rejected", () => {
  const item = product(); item.checks[0].status = "passed";
  assert.throws(() => validateResults({ protocol: 1, products: [item] }));
});
test("duplicate checks are rejected", () => {
  const item = product(); item.checks[1] = item.checks[0];
  assert.throws(() => validateResults({ protocol: 1, products: [item] }));
});
