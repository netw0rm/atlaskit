import Promise from 'babel-runtime/core-js/promise';
import profiles from './profile-data';
import { modifyResponse } from '../src/api/profile-client';

if (!window.Promise) {
  window.Promise = Promise;
}

const random = int => Math.floor(Math.random() * (int + 1));

const getWeekday = () => {
  const array = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const index = random(6);

  return {
    index,
    string: array[index],
  };
};

const getTimeString = () => {
  const minFormat = new Intl.NumberFormat('us-EN', { minimumIntegerDigits: 2 });
  const hours = random(23);
  const minutes = random(59);
  const meridiem = ['am', 'pm'][Math.floor(hours / 12)];

  return `${hours === 0 ? 12 : hours % 12}:${minFormat.format(minutes)}${meridiem}`;
};

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

      const result = {
        data: {
          User: data,
        },
      };

      return resolve(modifyResponse(result.data.User));
    }, timeout);
  });
};

class MockProfileCardResource {
  constructor(config) {
    this._config = config;
  }

  _get(options) {
    let fail = false;
    if (options.userId === '404') {
      fail = true;
    }
    return requestService(fail, this._config);
  }
}

export default new MockProfileCardResource({});
