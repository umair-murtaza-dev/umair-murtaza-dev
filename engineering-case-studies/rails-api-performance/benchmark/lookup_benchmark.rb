require 'benchmark'
require 'json'

ORDER_COUNT = 2_000
CUSTOMER_COUNT = 200
ITERATIONS = 10
orders = Array.new(ORDER_COUNT) { |i| { id: i, customer_id: i % CUSTOMER_COUNT } }
customers = Array.new(CUSTOMER_COUNT) { |i| { id: i, name: "Customer #{i}" } }

def naive(orders, customers)
  orders.map { |o| [o[:id], customers.find { |c| c[:id] == o[:customer_id] }[:name]] }
end

def indexed(orders, customers)
  by_id = customers.to_h { |c| [c[:id], c[:name]] }
  orders.map { |o| [o[:id], by_id.fetch(o[:customer_id])] }
end

raise 'mismatched outputs' unless naive(orders, customers) == indexed(orders, customers)
2.times { naive(orders, customers); indexed(orders, customers) }
measure = ->(fn) { Array.new(ITERATIONS) { Benchmark.realtime { send(fn, orders, customers) } * 1000 } }
base = measure.call(:naive)
optimized = measure.call(:indexed)
median = ->(a) { s = a.sort; (s[(s.length - 1) / 2] + s[s.length / 2]) / 2 }
puts JSON.pretty_generate(
  kind: 'synthetic Ruby in-memory lookup benchmark (not Rails/PostgreSQL)',
  ruby: RUBY_VERSION, orders: ORDER_COUNT, customers: CUSTOMER_COUNT,
  iterations: ITERATIONS, baseline_median_ms: median.call(base).round(2),
  indexed_median_ms: median.call(optimized).round(2),
  speedup_x: (median.call(base) / median.call(optimized)).round(2),
  baseline_ms: base.map { |n| n.round(2) },
  indexed_ms: optimized.map { |n| n.round(2) }
)
