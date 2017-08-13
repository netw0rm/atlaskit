import ActivityResource from '../api/ActivityResource';

import * as frequentData from './mock-frequent-data.json';
import * as recentData from './mock-recent-data.json';

function timeout(ms = 1) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default class MockActivityResource extends ActivityResource {
  constructor() {
    super('', '');
  }

  public async getFrequentItems() {
    await timeout(500); // simulate rest delay
    return Promise.resolve(frequentData.data);
  }

  public async getRecentItems() {
    return Promise.resolve(recentData.data);
  }
}
