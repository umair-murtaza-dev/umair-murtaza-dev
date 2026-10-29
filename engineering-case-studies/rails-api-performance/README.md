# Ruby on Rails API performance — reproducible experiment

**Type:** independently created demonstration. **Status:** experiment design; no benchmark data collected or performance improvement claimed.

## Problem

A list endpoint may trigger an N+1 SQL pattern when it renders each order's customer. Compare a naive ActiveRecord implementation with a version that eager-loads associations.

## Representative code

```ruby
# Deliberately inefficient example
class OrdersController < ApplicationController
  def index
    @orders = Order.order(created_at: :desc).limit(100)
    render json: @orders.map { |order|
      { id: order.id, customer_name: order.customer.name }
    }
  end
end
```

```ruby
# Candidate optimization: eliminates per-order customer lookups
class OrdersController < ApplicationController
  def index
    @orders = Order.includes(:customer).order(created_at: :desc).limit(100)
    render json: @orders.map { |order|
      { id: order.id, customer_name: order.customer.name }
    }
  end
end
```

## Experiment protocol

1. Create a Rails app backed by PostgreSQL, with `Order belongs_to :customer` and `Customer has_many :orders`.
2. Seed **synthetic**, deterministic data, e.g. 20,000 orders linked to 2,000 customers. Record the seed and database version.
3. Instrument SQL notifications (`sql.active_record`) and record query counts, SQL time and request time for the same endpoint.
4. Run the naive and eager-loaded versions with identical environment, dataset, concurrency, warm-up and cache policy.
5. Use [the k6 workload](../load-testing/orders.js) if exposing `/orders` in a local test environment.
6. Save raw JSON summaries and a table with p50/p95/p99, requests/s, SQL queries/request, error rate, CPU and memory.
7. Repeat runs; report dispersion and inspect query plans (e.g. `EXPLAIN (ANALYZE, BUFFERS)`) before claiming improvement.

## Measurement template

| Metric | Baseline | Candidate | Repeated runs |
|---|---|---|---|
| p95 request latency | not measured | not measured | pending |
| SQL queries / request | not measured | not measured | pending |
| Throughput | not measured | not measured | pending |
| Error rate | not measured | not measured | pending |

## Interpretation

Eager loading is a *hypothesis to test*, not a guaranteed performance win. Query count reductions do not automatically establish throughput gains. Watch for payload size, additional joins/preloads, pagination and indexes. Never attribute synthetic measurements to Secureframe or another client.

## Evidence to add

- A minimal runnable Rails repository or fixture project
- Versioned seed scripts and dependencies
- Baseline and optimized code commits
- Raw benchmark output, run configuration and hardware specs
- A summary of trade-offs and limits

## Measured companion microbenchmark (2026-10-29)

A separate [Ruby in-memory lookup experiment](results/README.md) and its [runnable benchmark](benchmark/lookup_benchmark.rb) compare repeated linear lookups against a hash index on synthetic records. Its recorded medians were **18.68 ms vs 0.31 ms** (10 iterations; 59.33× ratio). **These are not Rails, HTTP, ActiveRecord, SQL, or PostgreSQL measurements**, and should not be interpreted as results of the N+1 API experiment described above.
