import http from 'k6/http';
import { Trend, Rate, Counter, Gauge } from 'k6/metrics';
import { sleep } from 'k6';

// O nome da métrica é o parâmetro para cada tipo de métrica.
export const TrendRTT = new Trend('RTT SLO'); 
export const RateContentOK = new Rate('Content OK SLO');
export const GaugeContentSize = new Gauge('ContentSize SLO');
export const CounterErrors = new Counter('Errors SLO');

export const options = {
  thresholds: {
    // Count: Incorrect content cannot be returned more than 99 times.
    'Errors SLO': ['count<100'],
    // Gauge: returned content must be smaller than 4000 bytes
    'ContentSize SLO': ['value<4000'],
    // Rate: content must be OK more than 95 times
    'Content OK SLO': ['rate>0.95'],
    // Trend: Percentiles, averages, medians, and minimums
    // must be within specified milliseconds.
    'RTT SLO': ['p(99)<300', 'p(70)<250', 'avg<200', 'med<150', 'min<100'],
  },
};

export default function () {
  const res = http.get('https://test-api.k6.io/public/crocodiles/1/');
  const contentOK = res.json('name') === 'Bert';

  TrendRTT.add(res.timings.duration);
  RateContentOK.add(contentOK);
  GaugeContentSize.add(res.body.length);
  CounterErrors.add(!contentOK);

  sleep(1);
}
