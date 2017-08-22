import * as fetchMock from 'fetch-mock/src/client';
import ActivityResource from '../../src/api/ActivityResource';
import { ActivityResponse } from '../../src/types';

const activityUrl = 'http://activity';

describe('ActivityResource', () => {
  beforeEach(() => {
    fetchMock.mock({
      matcher: `begin:${activityUrl}/api/client/recent`,
      response: getRecent(),
      name: 'recent'
    });

    fetchMock.mock({
      matcher: `begin:${activityUrl}/api/frequent`,
      response: getFrequent(),
      name: 'frequent'
    });
  });

  afterEach(fetchMock.restore);

  it('should resolve frequent items', () => {
    const provider = new ActivityResource(activityUrl, '123');
    return provider.getFrequentItems().then((items) => {
      expect(items[0].objectId).toEqual('frequent1');
    });
  });

  it('should resolve recent items', () => {
    const provider = new ActivityResource(activityUrl, '123');
    return provider.getRecentItems().then((items) => {
      expect(items[0].objectId).toEqual('recent1');
    });
  });

  describe('search recent', () => {
    it('should return empty array with empty search term', () => {
      const provider = new ActivityResource(activityUrl, '123');
      return provider.searchRecent('').then((items) => {
        expect(items).toHaveLength(0);
      });
    });

    it('should return empty array with search term that matches nothing', () => {
      const provider = new ActivityResource(activityUrl, '123');
      return provider.searchRecent('klasjfklajsf').then((items) => {
        expect(items).toHaveLength(0);
      });
    });

    it('should perform case-insensitive prefix search on name property', () => {
      const provider = new ActivityResource(activityUrl, '123');
      return provider.searchRecent('recent').then((items) => {
        expect(items).toHaveLength(2);
        expect(items[0].name).toEqual('recent item 1');
        expect(items[1].name).toEqual('recent item 2');
      });
    });
  });
});

function getFrequent() {
  const response: ActivityResponse = {
    data: [{
      objectId: 'frequent1',
      name: 'frequent item 1',
      container: 'container 1',
      iconUrl: 'iconUrl 1',
      url: 'url 1'
    }, {
      objectId: 'frequent2',
      name: 'frequent item 2',
      container: 'container 2',
      iconUrl: 'iconUrl 2',
      url: 'url 2'
    }]
  };

  return response;
}

function getRecent() {
  const response: ActivityResponse = {
    data: [{
      objectId: 'recent1',
      name: 'recent item 1',
      container: 'container 1',
      iconUrl: 'iconUrl 1',
      url: 'url 1'
    }, {
      objectId: 'recent2',
      name: 'recent item 2',
      container: 'container 2',
      iconUrl: 'iconUrl 2',
      url: 'url 2'
    }]
  };

  return response;
}
