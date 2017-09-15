const bytes = require('bytes');
const fs = require('fs');
const sourceTrace = require('source-trace');
// This threshold corresponds to 5% of the latest bundle value
const thresholdBundle = 3000;

let threshold;

describe('Bundle', () => {
  beforeAll(async () => {
    const data = sourceTrace('./packages/navigation/src');
    const stats = data.map(d => fs.statSync(d).size);
    const sum = stats.reduce((prev, curr) => prev + curr, 0);
    threshold = bytes(sum).includes('MB') ? Number(bytes(sum).replace('MB', '')) * 1000 : Number(bytes(sum).replace('kB', '').trim());
  });

  test(`should be less than the bundle threshold ${thresholdBundle} kb`,
      () => {
        expect(threshold).toBeLessThanOrEqual(thresholdBundle);
      });
});
