import http from 'k6/http';
import { check, sleep } from 'k6';


export const options = {
    // ramping-up and ramping-down
    stages: [
        {duration: '10s', target: 20},
        {duration: '30s', target: 10},
        {duration: '20s', target: 0},
    ],

    thresholds:{
      http_req_failed: ['rate<0.01'],
      http_req_duration: ['p(95) < 200', 'p(99.9) < 1000'], // multiplos thresholds para uma métrica.
    },
};

export default function () {
  const res = http.get('https://test.k6.io');

  //assertion for K6
  // If case the status code response is diferent of 200 and if some text contains in body.

  check(res, {
    'status should be 200': (r) => r.status == 200,
    'Home page text': (r) => r.body.includes('Collection of simple web-pages suitable for load testing.'),
  });
}
