# Contributing

Disclose your product affiliation. Open one focused pull request with the source URL, date, exact claim being corrected and redacted reproducible evidence. Distinguish vendor documentation from hands-on results. Never publish API keys, auth cookies, private source or customer records.

To contribute benchmark data, run all five tests for each named product on the same brief and environment. Each test must have `status`, an evidence URL and a note; measured output needs a date and protocol revision. Unknown tests stay `unmeasured`. Do not report universal latency or hardware-independent frame rates.

Run `npm test` and `node scripts/validate-results.mjs` before submitting. Do not change the validator to conceal missing evidence. Maintainers may reject unsupported comparisons or unrelated promotion. A listing is not an endorsement.
