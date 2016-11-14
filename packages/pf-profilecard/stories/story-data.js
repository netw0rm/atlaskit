import profiles from './profile-data';

const requestService = (fail) => {
  const timeout = Math.floor(Math.random() * 500) + 500;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) {
        reject(new Error('Not Found'));
        return;
      }

      const id = Math.floor(Math.random() * 10);
      const data = Object.assign({}, profiles[id], {
        accountId: '00665c7e-ec7e-466f-9165-ef05e9970be7',
        cloudId: '749a3acb-3eb9-4957-9c36-784af09aed0b',
      });
      const result = {
        debugMeta: {
          count: 1,
          scannedCount: 634,
          requestTimeMS: 34,
        },
        values: [data],
      };
      resolve(result.values[0]);
    }, timeout);
  });
};

class MockProfileCardResource {
  constructor(config) {
    // eslint-disable-next-line no-underscore-dangle
    this._config = config;
  }
  // eslint-disable-next-line class-methods-use-this
  _get(options) {
    let fail = false;
    if (options.accountId === '404') {
      fail = true;
    }
    return requestService(fail);
  }
}

// eslint-disable-next-line import/prefer-default-export
export const resourceProvider = new MockProfileCardResource({});
