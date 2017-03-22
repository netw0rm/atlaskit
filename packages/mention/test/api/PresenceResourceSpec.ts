import 'es6-promise/auto'; // 'whatwg-fetch' needs a Promise polyfill
import 'whatwg-fetch';
import * as fetchMock from 'fetch-mock';
import { expect } from 'chai';
import * as sinon from 'sinon';

import PresenceResource, { DefaultPresenceCache, DefaultPresenceParser, PresenceMap } from '../../src/api/PresenceResource';
import { validPresenceData, invalidPresenceData } from '../_presence-data';

const baseUrl = 'https://bogus/presence';
const dummyId = 'DUMMY-a5a01d21-1cc3-4f29-9565-f2bb8cd969f5';

const apiConfig = {
  url: baseUrl,
  cloudId: dummyId,
};

const testIds = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

describe('PresenceParser', () => {
  it('should parse valid responses to presence updates', (done) => {
    const parser = new DefaultPresenceParser();
    const update = parser.parse(validPresenceData);
    let count = 0;
    validPresenceData['data'].PresenceBulk.forEach((response) => {
      if (response.state) {
        expect(update[response.userId].status).to.equal(parser.mapState(response.state));
        count++;
      }
    });
    if (count === 6) {
      done();
    }
  });

  it('should generate update despite invalid presence data', (done) => {
    const parser = new DefaultPresenceParser();
    const update = parser.parse(invalidPresenceData);
    let count = 0;
    invalidPresenceData['data'].PresenceBulk.forEach((response) => {
      if (response.userId && response.state) {
        expect(update[response.userId].status).to.equal(parser.mapState(response.state));
        count++;
      }
    });
    if (count === 2) {
      done();
    }
  });
});

describe('PresenceCache', () => {
  let cache: DefaultPresenceCache;
  let parser: DefaultPresenceParser;
  let testPresenceMap: PresenceMap;

  before(() => {
    const beforeParser = new DefaultPresenceParser();
    testPresenceMap = beforeParser.parse(validPresenceData);
  });

  beforeEach(() => {
    // Setup presence resource and cache
    cache = new DefaultPresenceCache();
    parser = new DefaultPresenceParser();
  });

  it('should know whether it contains a user by ID', () => {
    cache.update(testPresenceMap);
    const userId = Object.keys(testPresenceMap)[2];
    expect(cache.contains(userId)).to.be.true;
    expect(cache.contains('DEFINITELY-N0T-A-TEST-US3R-1D'), 'Claimed to contain a user ID it shouldn\'t have').to.be.false;
  });

  it('should retrieve a user given their ID', () => {
    cache.update(testPresenceMap);
    const userId = Object.keys(testPresenceMap)[0];
    const expectedPresence = testPresenceMap[userId];
    expect(cache.get(userId)).to.deep.equal(expectedPresence);
  });

  it('should retrieve a set of users given an array of their IDs', () => {
    cache.update(testPresenceMap);
    const userIds = Object.keys(testPresenceMap);
    const actual = cache.getBulk(userIds);
    expect(actual).to.deep.equal(testPresenceMap);
  });

  it('should update its entries when given a PresenceMap', () => {
    const extraPresences: PresenceMap = {
      '13-thirteen-13': {'status': 'available'},
      'Roger-rolo-the-steam-roller-Lo': {'status': 'busy'}
    };
    cache.update(testPresenceMap);
    cache.update(extraPresences);
    const combinedPresences = {
      ...testPresenceMap,
      ...extraPresences
    };
    expect(cache.getBulk(Object.keys(combinedPresences))).to.deep.equal(combinedPresences);
  });

  it('should retrieve a set of missing users given an array of their IDs', () => {
    const extraIds: string[] = ['13-thirteen-13', 'Roger-rolo-the-steam-roller-Lo'];
    const extraPresences: PresenceMap = {
      '13-thirteen-13': {'status': 'available'},
      'Roger-rolo-the-steam-roller-Lo': {'status': 'busy'}
    };
    expect(cache.getMissingUserIds(extraIds)).to.deep.equal(extraIds);
    cache.update(extraPresences);
    expect(cache.getMissingUserIds(extraIds)).to.empty;
  });

  it('should insert and store user ids on demand', (done) => {
    // Check cache only adds entries when hit by presence service
    expect(cache.contains(testIds[0])).to.equal(false);
    cache.update(testPresenceMap);
    let cacheHits = 0;
    testIds.forEach((id) => {
      if (cache.contains(id) === true) {
        cacheHits++;
      }
    });
    if (cacheHits === 6) {
      done();
    }
  });

  it('should store correctly parsed responses from presence service', (done) => {
    cache.update(testPresenceMap);
    // Check cache stores correct mapping
    expect(cache.contains(testIds[6])).to.equal(false);
    const cacheHits = cache.getBulk(testIds);
    expect(cacheHits[testIds[0]].status).to.equal('offline');
    expect(cacheHits[testIds[1]].status).to.equal('online');
    expect(cacheHits[testIds[3]].status).to.equal('busy');
    done();
  });
});

describe('PresenceResource', () => {
  beforeEach(() => {
    fetchMock
      .mock(/\/bogus\/presence/, {
        body: validPresenceData
      });
  });

  afterEach(() => {
    fetchMock.restore();
  });

  describe('#refreshPresence', () => {
    it.skip('should result in fewer listener callbacks and service requests with cache', (done) => {
      const resource = new PresenceResource(apiConfig);
      const spy = sinon.spy(resource, 'notifyListeners');
      try {
        // notifyListeners called twice as no cache hits so must call again after service query
        resource.refreshPresence(testIds);
        setTimeout(() => {
          expect(spy.callCount).to.equal(2);
        }, 0);
        // Refreshed ids should be present in cache
        setTimeout(() => {
          resource.refreshPresence(testIds.slice(0, 6));
        }, 0);
        // One additional call since only needs to query through cache
        setTimeout(() => {
          expect(spy.callCount).to.equal(3);
          done();
        }, 0);
      } catch (err) {
        done(err);
      }
    });

    it('should result in one callback after injecting a cache and only hitting existing ids', (done) => {
      try {
        // Setup parser and cache with data
        const parser = new DefaultPresenceParser();
        const populatedCache = new DefaultPresenceCache();
        const update = parser.parse(validPresenceData);
        populatedCache.update(update);

        // Initialise resource with cache
        const resource = new PresenceResource({...apiConfig, cache: populatedCache});
        const spy = sinon.spy(resource, 'notifyListeners');
        resource.refreshPresence(testIds.slice(0, 6));
        // One call since only needs to render info from cache
        setTimeout(() => {
          expect(spy.callCount).to.equal(1);
          done();
        }, 0);
      } catch (err) {
        done(err);
      }
    });
  });
});
