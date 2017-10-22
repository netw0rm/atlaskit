const bytes = require('bytes');
const fs = require('fs');
const path = require('path');
const sourceTrace = require('source-trace');
// This threshold corresponds to 5% of the latest bundle value
// const thresholdBundle = 3000;
// WARNING: We are using a new threshold while we migrate to styled-components
// While this process is occurring, bundle size will be incorrectly calculated
// through lack of hoisting. If this is still here after 2017-10-22, something
// has gone wrong - Ben C
const thresholdBundle = 20000;

let threshold;

describe('Bundle', () => {
  beforeAll(async () => {
    const data = sourceTrace(path.resolve(__dirname, '..', '..', '..', 'src'));
    const stats = data.map(d => fs.statSync(d).size);
    const sum = stats.reduce((prev, curr) => prev + curr, 0);
    threshold = bytes(sum).includes('MB') ? Number(bytes(sum).replace('MB', '')) * 1000 : Number(bytes(sum).replace('kB', '').trim());
  });

  test(`should be less than the bundle threshold ${thresholdBundle} kb`,
      () => {
        expect(threshold).toBeLessThanOrEqual(thresholdBundle);
      });
});
