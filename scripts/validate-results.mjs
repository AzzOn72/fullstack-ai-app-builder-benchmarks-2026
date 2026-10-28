import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

export const CHECKS = ["persistence", "auth-isolation", "edit-precision", "usage-recovery", "portable-export"];
export function validateResults(value) {
  if (!value || value.protocol !== 1 || !Array.isArray(value.products)) throw new Error("Protocol 1 and products are required");
  const ids = new Set();
  for (const product of value.products) {
    if (!/^[a-z0-9-]+$/.test(product.id) || ids.has(product.id)) throw new Error("Unique product IDs required");
    ids.add(product.id);
    if (!Array.isArray(product.checks) || product.checks.length !== CHECKS.length) throw new Error("All five checks required");
    for (const id of CHECKS) {
      const matches = product.checks.filter((check) => check.id === id);
      if (matches.length !== 1) throw new Error("Check IDs must be unique");
      const check = matches[0];
      if (!["passed", "failed", "unmeasured"].includes(check.status)) throw new Error("Invalid status");
      if (check.status !== "unmeasured" && (!/^https:\/\//.test(check.evidenceUrl ?? "") || !check.note?.trim() || !Number.isFinite(Date.parse(check.measuredAt)))) throw new Error("Measured checks require dated evidence and a note");
    }
    if (product.score !== null && (!Number.isFinite(product.score) || product.score < 0 || product.score > 100 || product.checks.some((check) => check.status === "unmeasured"))) throw new Error("Scores require complete comparable evidence");
  }
  return ids.size;
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    const input = process.argv[2] ?? new URL("../data/results.json", import.meta.url);
    console.log(`Valid records for ${validateResults(JSON.parse(await readFile(input, "utf8")))} products. Unmeasured is not a ranking.`);
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
