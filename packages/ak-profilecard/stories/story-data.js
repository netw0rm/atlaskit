import Promise from 'babel-runtime/core-js/promise';
import profiles from './profile-data';
import { modifyResponse } from '../src/api/profile-client';
import { random, getWeekday, getTimeString } from './util';

if (!window.Promise) {
  window.Promise = Promise;
}

const requestService = (fail) => {
  const timeout = random(500) + 500;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) {
        return reject(new Error('mock request failed'));
      }

      const id = random(10);
      const weekday = getWeekday();

      const data = Object.assign({}, profiles[id]);

      data.remoteTimeString = getTimeString();
      data.remoteWeekdayIndex = weekday.index;
      data.remoteWeekdayString = weekday.string;

      return resolve(modifyResponse(data));
    }, timeout);
  });
};

class MockProfileClient {
  constructor(config) {
    this.config = config;
  }

  fetch(options) {
    let fail = !(options.userId && options.cloudId);
    if (options.userId === '404') {
      fail = true;
    }
    return requestService(fail, this.config);
  }
}

export default new MockProfileClient({});
