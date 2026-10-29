# Engineering case studies

These are **independent, reproducible demonstrations**, not copies of client systems. They support the technical subjects mentioned on [my GitHub profile](../README.md).

| Case study | What's demonstrated | Status |
|---|---|---|
| [Rails API performance](rails-api-performance/README.md) | SQL access patterns, N+1 investigation, controlled benchmarking | Reproduction guide; no published measurements |
| [Alibaba Cloud ACK & Kubernetes](alibaba-ack-kubernetes/README.md) | Kubernetes workloads, probes, scaling, resource controls, ingress considerations | Reference architecture, not a deployed claim |
| [Multi-tenant SaaS authorization](multi-tenant-saas/README.md) | Data isolation and tenant authorization tests | Runnable sample test script |
| [Load testing and reliability](load-testing/README.md) | Concurrent sessions, thresholds and interpretable latency data | Runnable k6 workload; no published measurements |

## Evidence policy

- Any numbers reported as *results* must come from reproducible runs, with raw output, environment, workload and date.
- Example thresholds are **acceptance targets**, not achieved outcomes.
- No production secrets, client data, proprietary code, or confidential infrastructure details.
- A reference design does not imply an identical system was deployed in production.
- Where a case study was inspired by commercial work, its sample implementation is independently authored and uses synthetic data.

## How to use

Start with each case study's README. Run the included examples in your own test environment and record evidence under a `results/` directory before making impact claims.
