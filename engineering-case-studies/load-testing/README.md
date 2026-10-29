# Load testing & reliability — controlled workload

**Type:** reproducible synthetic load-test scenario. **Status:** k6 script provided; no test has been run or results verified in this repository.

## What to measure

- Throughput (requests/s), errors, request duration p50/p95/p99
- Concurrent virtual users and successful requests
- CPU, memory, database connections, queue depth, network saturation
- Recovery after a load spike

## Run a controlled experiment

Install [k6](https://grafana.com/docs/k6/latest/set-up/install-k6/), then run against **your own isolated test server**:

```bash
TARGET_URL=http://localhost:3000/orders k6 run orders.js
```

The sample uses a modest ramping workload and configurable `TARGET_URL`. It assumes an `/orders` HTTP endpoint exists; it does **not** provision the target application. Adjust scenarios to your hardware and permission scope before running.

The script has thresholds (`p(95)<1000ms`, failed requests below 1%). These are *targets*, **not achieved results**.

## Experimental method

1. Record date, system specifications, runtime versions and dataset size.
2. Define a representative request distribution and expected concurrency.
3. Warm up the service, execute a baseline and save raw output.
4. Increase one variable at a time; collect application and infrastructure telemetry.
5. Repeat tests and describe variance; don't report an isolated best run.
6. Determine bottlenecks and a safe operating range.

## Results

Not measured. Add dated raw output and charts after a real authorized run.

## Safety

Test only services you own or have explicit permission to load test. Avoid third-party, shared or production hosts without approved limits and windows.
