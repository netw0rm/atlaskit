import profiles from './profile-data';
import { random, getWeekday, getTimeString } from './util';

// tslint:disable-next-line:variable-name
export default function getMockProfileClient(BaseProfileClient: any, modifyResponse: any): any {
  return class MockProfileClient extends BaseProfileClient {
    // eslint-disable-next-line class-methods-use-this
    makeRequest(cloudId, userId) {
      const timeout = random(1500) + 500;

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (userId === '404') {
            return reject();
          }

          const profile = profiles[userId];

          if (!profile) {
            return reject(new Error('Not Found'));
          }

          const weekday = getWeekday();
          const data: any = { ...profile };

          data.remoteTimeString = getTimeString();
          data.remoteWeekdayIndex = weekday.index;
          data.remoteWeekdayString = weekday.string;

          return resolve(modifyResponse(data));
        }, timeout);
      });
    }
  };
}
