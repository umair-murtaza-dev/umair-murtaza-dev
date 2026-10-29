# Recorded synthetic Ruby benchmark — 2026-10-29

**Scope:** in-memory Ruby lookup experiment, **not** a Rails API, SQL, PostgreSQL, Secureframe production workload, or actual client performance impact.

- Runtime: Ruby 3.3.8, Linux x86_64 (ephemeral evaluation environment)
- Synthetic records: 2,000 orders, 200 customers
- Iterations: 10 per algorithm, after two warm-up iterations
- Baseline: repeated linear customer lookup (`Array#find`)
- Candidate: build a hash map once, then perform indexed lookups
- Correctness: implementations were checked for equal output before measurements
- Baseline median: **18.68 ms**
- Indexed median: **0.31 ms**
- Observed median ratio: **59.33×** in this controlled run

These times are **specific to the synthetic workload and this execution environment**. Do not generalize to actual HTTP endpoint throughput, p95 latency, database query optimization, production latency, or cross-machine speedups.

Reproduce with:

```bash
ruby benchmark/lookup_benchmark.rb
```

The benchmark script path is relative to the parent `rails-api-performance` folder. [Raw measurements](synthetic-ruby-lookup-2026-10-29.json) are preserved; repeated runs may vary.

Next: build and measure a real Rails/PostgreSQL endpoint, record query counts and p50/p95/p99 under controlled concurrency before making API performance claims.
