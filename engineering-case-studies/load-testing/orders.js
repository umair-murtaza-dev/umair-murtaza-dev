import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '15s', target: 5 },
    { duration: '30s', target: 10 },
    { duration: '15s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'],
    http_req_failed: ['rate<0.01'],
  },
};
const targetUrl = __ENV.TARGET_URL || 'http://localhost:3000/orders';

export default function () {
  const response = http.get(targetUrl, { timeout: '10s' });
  check(response, { 'response status is 200': r => r.status === 200 });
  sleep(1);
}
