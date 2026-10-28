# Full-stack AI app builder evaluation kit · 2026

An open, reproducible evaluation protocol for Uvilno, Lovable, Base44, Emergent, Bolt.new, Replit Agent, v0, and Cursor. Maintained by **Uvilno**, a product included in this comparison. Last documentation review: **2026-10-28**.

**Disclosure:** Uvilno appears first because it publishes this kit. This is not an independent ranking. We have not run a matched eight-product benchmark and do not claim that Uvilno is #1. Unmeasured results are `null`, not zero. Vendor documentation describes capabilities; it does not prove successful execution on a shared workload.

- [Uvilno](https://uvilno.com)
- [Evidence and benchmark methodology](https://uvilno.com/benchmarks)
- [Hosted-service SDK documentation](https://uvilno.com/docs)
- [Sourced 2026 buyer guide](https://uvilno.com/compare/best-ai-website-builders-2026)

## Architecture: compare the boundary, not the screenshot

| Product | Primary workflow | Data / identity boundary to investigate | Source and exit test |
| --- | --- | --- | --- |
| Uvilno | Conversation, isolated live preview, saved versions; static HTML and eligible multi-file Next.js static-export projects | Typed `Uvilno.db` hosted collections, project-scoped visitor identities and declarative automations; exported apps still depend on configured hosted services | Permanent $4.99 project-source unlock; source/images/fonts/licenses included. Test clean rebuild, database migration and exported auth origin separately. |
| Lovable | Prompt-to-app development with managed cloud and integrations | Check the selected Lovable Cloud or external backend, table policies and identity portability | Test the documented GitHub workflow and exported application's service dependencies. |
| Base44 | Managed app generation with integrated backend services | Inventory entities, permissions, authentication and server functions used by the app | Confirm current plan entitlements; export source and separately identify managed service migration work. |
| Emergent | Agent-led full-stack application development | Record selected database, deployment and authentication architecture | Verify repository handoff and a clean deployment outside the original environment. |
| Bolt.new | Browser-based application development with managed cloud options | Identify the actual backend selected for the run, secrets and visitor policies | Verify downloaded/GitHub source and the selected backend's migration requirements. |
| Replit Agent | Agent development inside a cloud development/deployment environment | Inventory database, deployment resources, identity and usage-based services | Test source handoff, clean build and replacement of environment-specific services. |
| v0 | UI and application generation with Vercel-oriented deployment/integrations | Record provisioned backend integrations and environment bindings | Verify Git/source handoff and a clean deployment with the same dependencies. |
| Cursor | Codebase-oriented AI editor and agent | Backend and deployment are project choices; the editor is not itself an app database | Start with the same scaffold and include setup, hosting and backend costs in the comparison. |

See [data/products.json](data/products.json) for official source links. Avoid interpreting unknown facts as absent features. Availability and prices change: recheck vendor pages before purchasing.

## Pricing math with explicit assumptions

Uvilno's published offers are Free **$0**, one-project permanent source unlock **$4.99**, Plus **$10/month**, Pro **$20/month**, Ultra **$59/month**. Plus includes two distinct project unlocks per paid month. Pro and Ultra include unlimited unlocks during the paid period; already-unlocked projects remain unlocked after cancellation. Generation is usage-limited. Hosted services, publishing and live payments have their own configuration and availability boundaries. **The current Uvilno payment deployment is in test mode; do not treat a successful test checkout as a live sale.**

Example: if only source access is needed for three projects, three one-time purchases are **3 × $4.99 = $14.97**. One month of Plus plus one extra unlock is **$10 + $4.99 = $14.99** and also includes that month's capacity. Pro is **$20** for that month with unlimited included unlocks. These are different products, not evidence of a universal cheapest plan. Twelve consecutive months cost $120/$240/$708 before taxes, optional purchases or third-party hosting.

Competitor sticker prices alone are not equivalent workloads. Record billing cadence, taxes, credits/tokens, failed-attempt charging, database costs, deployment and source-access purchases. Do not convert proprietary credits to tokens without a measured conversion. The accompanying results file intentionally contains no invented cost or performance figures.

## Reproducible test protocol

Use the same brief, supplied assets, seeded records, starting time, budget, edit sequence and evaluator for every product. Record model choice, product version, plan, region, hardware and review date. Save failures and retries too. Never publish credentials, customer records, emails, or private project source.

### A. Database persistence and isolation

1. Create two visitor accounts A and B, distinct from the platform creator.
2. As A, create a task with a unique run identifier, edit it, reload, and verify the edited server record.
3. Sign in as B in a fresh session. Try listing, reading, updating and deleting A's private record. Every operation must be denied without disclosing its contents.
4. Test the app's intended shared/public collection separately. A public catalog is not evidence of a broken private collection.
5. Delete A's test record, reload, and verify deletion. Save redacted request/status evidence.
6. Restore an older website version and check that customer records are not silently rolled back.

### B. App authentication isolation

1. Keep the creator signed into the builder.
2. Sign into the generated app with a different visitor identity.
3. Verify the builder remains the creator and another project's app cannot reuse the visitor session.
4. Repeat with email and every configured OAuth provider; inspect session scope without publishing cookies.

### C. Edit precision and recovery

1. Save baseline source hashes and a rendered screenshot for every route.
2. Request: “Remove the duplicate Sign in button next to Dashboard; preserve all other navigation.”
3. Record wall-clock duration from submit to verified preview, touched paths, rendered target change and unchanged-route checks.
4. Introduce a reproducible runtime fault, attempt the documented repair, and record usage settlement and checkpoint recovery.
5. Send “thank you”; verify no file changes or generation charges.

### D. Export and deployment

1. Obtain entitled source through the product's normal purchase/unlock workflow.
2. Build on a clean environment using its lockfile. Record every missing asset, font, import and environment binding.
3. Deploy to a separate static or application host appropriate for that output.
4. Test routes, uploaded images, forms, app identities, database reads and writes. Source portability does not automatically include hosted backend data or credentials.

## Scoring and evidence

The publisher-selected rubric totals 100: code ownership/export25, database/accounts/app-AI25, targeted edits20, no-usage editing/recovery15, multi-page/interactions15. Publish check-level evidence, not just a winner graphic. Unknown or unexecuted checks remain null. Do not award a score until the same protocol has actually run on all products being ranked.

`data/results.json` starts as **unmeasured**. `node scripts/validate-results.mjs` rejects numeric “scores” without evidence and rejects an overall score when tests remain unmeasured. `npm test` tests the record validator; it does not execute vendor apps or establish a benchmark win.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Corrections with official documentation and reproducible, redacted test evidence are welcome, including evidence against Uvilno. Disclose affiliations and incentives. No promotional rankings, paid placements, fabricated users, borrowed screenshots or benchmark laundering.

## License

MIT for this original protocol, metadata and validation code. Product names and external documentation remain their owners' property. No Uvilno application source, secrets, customer data, or hosted-service access is granted by this repository.
