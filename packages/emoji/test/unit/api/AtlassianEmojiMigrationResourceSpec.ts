import * as fetchMock from 'fetch-mock/src/client';
import { expect } from 'chai';
import { ServiceConfig } from '@atlaskit/util-service-support';

import AtlassianEmojiMigrationResource from '../../../src/api/AtlassianEmojiMigrationResource';
import { EmojiServiceResponse } from '../../../src/types';
import { customType, customCategory } from '../../../src/constants';
import { EmojiResourceConfig } from '../../../src/api/EmojiResource';
import { atlassianEmojis, atlassianServiceEmojis, standardServiceEmojis } from '../../../src/support/test-data';

const p1Url = 'https://p1/';
const p2Url = 'https://p2/';
const p3Url = 'https://p3/';

const standardServiceData: EmojiServiceResponse = standardServiceEmojis;
const atlassianServiceData: EmojiServiceResponse = atlassianServiceEmojis;
const siteServiceData: EmojiServiceResponse = {
  emojis:  JSON.parse(JSON.stringify(atlassianServiceData.emojis)).map(emoji => {
                                                                        emoji.type = customType;
                                                                        emoji.category = customCategory;
                                                                        return emoji;
                                                                      })
};

const provider1: ServiceConfig = {
  url: p1Url,
};

const provider2: ServiceConfig = {
  url: p2Url,
};

const provider3: ServiceConfig = {
  url: p3Url,
};

describe('AtlassianEmojiMigrationResource', () => {
  beforeEach(() => {
    fetchMock.mock({
      matcher: `begin:${provider1.url}`,
      response: standardServiceData,
    }).mock({
      matcher: `begin:${provider2.url}`,
      response: atlassianServiceData,
    });
  });

  afterEach(() => {
    fetchMock.restore();
  });

  describe('#initEmojiRepository', () => {
    it('does not remove atlassian emojis if there is no corresponding site emoji version', () => {
      const config: EmojiResourceConfig = {
        providers: [provider1, provider2]
      };

      const resource = new AtlassianEmojiMigrationResource(config);
      const atlassianServiceEmojis = resource.findInCategory('ATLASSIAN');
      return atlassianServiceEmojis.then(emojis => expect(emojis.length).to.equal(atlassianEmojis.length));
    });

    it('does not contain atlassian emojis if there are site duplicates for each', () => {
      fetchMock.mock({
        matcher: `begin:${provider3.url}`,
        response: siteServiceData,
      });
      const config: EmojiResourceConfig = {
        providers: [provider1, provider2, provider3]
      };

      const resource = new AtlassianEmojiMigrationResource(config);
      const atlassianServiceEmojis = resource.findInCategory('ATLASSIAN');
      return atlassianServiceEmojis.then(emojis => expect(emojis.length).to.equal(0));
    });

    it('only removes the atlassian emojis with duplicates if there is only partial migration', () => {
      const partialSiteServiceData: EmojiServiceResponse = {
        emojis: siteServiceData.emojis.slice(0, 5)
      };
      fetchMock.mock({
        matcher: `begin:${provider3.url}`,
        response: partialSiteServiceData
      });

      const config: EmojiResourceConfig = {
        providers: [provider1, provider2, provider3]
      };

      const resource = new AtlassianEmojiMigrationResource(config);
      const atlassianServiceEmojis = resource.findInCategory('ATLASSIAN');
      return atlassianServiceEmojis.then(emojis => expect(emojis.length).to.equal(5));
    });
  });

});
