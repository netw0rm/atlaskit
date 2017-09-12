const bytes = require('bytes');
const fs = require('fs');
const cmd = require('node-cmd');
// This threshold corresponds to 5% of the latest bundle value
const thresholdBundle = 2000;

let threshold;

function cmdGet(name) {
  return new Promise((resolve, reject) => {
    cmd.get(name, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

describe('Bundle', () => {
  beforeAll(async () => {
    // This has been added to avoid any async timeout issue
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
    const data = await cmdGet('yar');
    const deps = data.split(/\r?\n/).filter(Boolean);
    const stats = deps.map(d => fs.statSync(d).size);
    const sum = stats.reduce((prev, curr) => prev + curr, 0);
    threshold = bytes(sum).includes('MB') ? Number(bytes(sum).replace('MB', '')) * 1000 : Number(bytes(sum).replace('kB', '').trim());
  });

  test(`should be less than the bundle threshold ${thresholdBundle} kb`,
      () => {
        expect(threshold).toBeLessThanOrEqual(thresholdBundle);
      });
});
