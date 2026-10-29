# Synthetic tenant-isolation unit test run — 2026-10-29

Executed a local Node.js v22.16.0 reproduction of the four test scenarios in [tenant-isolation.test.mjs](../tenant-isolation.test.mjs).

| Measurement | Result |
| --- | ---: |
| Unit tests | 4 |
| Passed | 4 |
| Failed | 0 |
| Test runner total elapsed time | ~83.84 ms |

The unit tests cover same-tenant read, foreign-workspace rejection, cross-tenant object lookup, and unknown-user denial.

**Limits:** no HTTP API, production authentication, persistent database, background jobs, cache, files, concurrency or adversarial penetration test. Passing these tests is **not** a security certification and does not prove real-world tenant isolation.

To reproduce: `node --test tenant-isolation.test.mjs` from the parent directory.
