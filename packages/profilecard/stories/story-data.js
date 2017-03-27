import profiles from './profile-data';
import ProfileClient, { modifyResponse } from '../src/api/profile-client';
import { random, getWeekday, getTimeString } from './util';

if (!window.Promise) {
  window.Promise = Promise;
}

const requestService = (options) => {
  const timeout = random(1500) + 500;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const profile = profiles[options.userId];

      if (!profile) {
        reject(new Error('Not Found'));
        return;
      }

      const weekday = getWeekday();

      const data = { ...profile };

      data.remoteTimeString = getTimeString();
      data.remoteWeekdayIndex = weekday.index;
      data.remoteWeekdayString = weekday.string;

      resolve(modifyResponse(data));
    }, timeout);
  });
};

class MockProfileClient extends ProfileClient {
  // eslint-disable-next-line class-methods-use-this
  makeRequest(options) {
    return requestService(options);
  }
}

export default new MockProfileClient({
  cacheSize: 10,
  cacheMaxAge: 2500,
});
