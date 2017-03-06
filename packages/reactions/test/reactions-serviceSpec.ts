import * as chai from 'chai';
import * as fetchMock from 'fetch-mock';
import * as sinon from 'sinon';

import { ReactionsService } from '../src';

const { expect } = chai;

const baseUrl = 'https://reactions';
const ari = 'ari:cloud:demo:123:123';

const fetchGetReactions = () => {
  return {
    [ari]: [
      {
        ari: ari,
        emojiId: 'grinning',
        count: 1,
        reacted: true
      },
      {
        ari: ari,
        emojiId: 'laughing',
        count: 2,
        reacted: true
      },
      {
        ari: ari,
        emojiId: 'thumbsup',
        count: 5,
        reacted: false
      },
      {
        ari: ari,
        emojiId: 'grin',
        count: 100,
        reacted: false
      }
    ]
  };
};

const fetchAddReaction = () => {
  return {
    ari: ari,
    reactions: [...fetchGetReactions()[ari], {
      ari: ari,
      emojiId: 'smiley',
      count: 1,
      reacted: true
    }]
  };
};

const fetchDeleteReaction = () => {
  return {
    ari: ari,
    reactions: fetchGetReactions()[ari].filter(r => r.emojiId !== 'grinning')
  };
};

const populateCache = (reactionsService: ReactionsService) => {
  (reactionsService as any).cachedReactions = fetchGetReactions();
};

describe('@atlaskit/reactions/reactions-service', () => {

  afterEach(() => {
    fetchMock.restore();
  });

  describe('getReactions', () => {
    beforeEach(() => {
      fetchMock.mock({
        options: {
          method: 'POST'
        },
        matcher: 'end:reactions/view',
        response: fetchGetReactions()
      });
    });

    const reactionsService = new ReactionsService({baseUrl});
    it('should return reaction data', () => {
      return reactionsService.getReactions([ari])
        .then(reactions => {
          expect(reactions).to.deep.equal(fetchGetReactions());
        });
    });

    it('should set cached reactions', () => {
      return reactionsService.getReactions([ari])
        .then(reactions => {
          expect((reactionsService as any).cachedReactions).to.deep.equal(reactions);
        });
    });

    it('should not overwrite cache for excluded aris', () => {
      populateCache(reactionsService);
      const anotherAri = 'another:ari:123';
      const anotherAriData = [
        {
          ari: anotherAri,
          emojiId: 'grinning',
          count: 1,
          reacted: false
        }
      ];

      (reactionsService as any).cachedReactions[anotherAri] = anotherAriData;

      return reactionsService.getReactions([ari])
        .then(reactions => {
          expect((reactionsService as any).cachedReactions).not.to.deep.equal(reactions);
          expect((reactionsService as any).cachedReactions[ari]).to.deep.equal(reactions[ari]);
          expect((reactionsService as any).cachedReactions[anotherAri]).to.deep.equal(anotherAriData);
        });
    });
  });

  describe('addReaction', () => {
    const reactionsService = new ReactionsService({baseUrl});
    populateCache(reactionsService);

    it('should optimistically add reaction', () => {
      fetchMock.mock({
        options: {
          method: 'POST'
        },
        matcher: 'end:reactions',
        response: fetchAddReaction()
      });
      const spy = sinon.spy(reactionsService, 'notifyUpdated');

      return reactionsService.addReaction(ari, 'smiley')
        .then(state => {
          expect(spy.called).to.equal(true);
          expect((reactionsService as any).cachedReactions[ari]).to.deep.equal(state);
          expect(state.length).to.equal(fetchGetReactions()[ari].length + 1);
        });
    });
  });

  describe('deleteReaction', () => {
    const reactionsService = new ReactionsService({baseUrl});
    populateCache(reactionsService);

    it('should optimistically delete reaction', () => {
      fetchMock.mock({
        options: {
          method: 'DELETE'
        },
        matcher: `begin:${baseUrl}/reactions?ari=${ari}`,
        response: fetchDeleteReaction()
      });
      const spy = sinon.spy(reactionsService, 'notifyUpdated');

      return reactionsService.deleteReaction(ari, 'grinning')
        .then(state => {
          expect(spy.called).to.equal(true);
          expect((reactionsService as any).cachedReactions[ari]).to.deep.equal(state);
          expect(state.length).to.equal(fetchGetReactions()[ari].length - 1);
        });
    });
  });

  describe('toggleReaction', () => {
    it('should optimistically add reaction if not in cache or if user have not reacted and call service', () => {
      const reactionsService = new ReactionsService({baseUrl});
      populateCache(reactionsService);

      const optimisticSpy = sinon.spy(reactionsService, 'optimisticAddReaction');
      const addSpy = sinon.spy(reactionsService, 'addReaction');

      reactionsService.toggleReaction(ari, 'smiley');
      expect(optimisticSpy.called).to.equal(true);
      expect(addSpy.called).to.equal(true);
    });

    it('should optimistically delete reaction if in cache and call service', () => {
      const reactionsService = new ReactionsService({baseUrl});
      populateCache(reactionsService);

      const optimisticSpy = sinon.spy(reactionsService, 'optimisticDeleteReaction');
      const deleteSpy = sinon.spy(reactionsService, 'deleteReaction');

      reactionsService.toggleReaction(ari, 'grinning');
      expect(optimisticSpy.called).to.equal(true);
      expect(deleteSpy.called).to.equal(true);
    });

    it('should optimistically increase counter on reaction if user have not already reacted', () => {
      const reactionsService = new ReactionsService({baseUrl});
      populateCache(reactionsService);

      const addSpy = sinon.spy(reactionsService, 'addReaction');
      reactionsService.toggleReaction(ari, 'thumbsup');
      expect(addSpy.called).to.equal(true);

      const reaction = (reactionsService as any).cachedReactions[ari].filter(r => r.emojiId === 'thumbsup')[0];
      expect(reaction.count).to.equal(6);
      expect(reaction.reacted).to.equal(true);
    });

    it('should optimistically decrease counter on reaction if user have already reacted', () => {
      const reactionsService = new ReactionsService({baseUrl});
      populateCache(reactionsService);

      const deleteSpy = sinon.spy(reactionsService, 'deleteReaction');
      reactionsService.toggleReaction(ari, 'laughing');
      expect(deleteSpy.called).to.equal(true);

      const reaction = (reactionsService as any).cachedReactions[ari].filter(r => r.emojiId === 'laughing')[0];
      expect(reaction.count).to.equal(1);
      expect(reaction.reacted).to.equal(false);
    });

    it('should delete reaction if count is less than 1', () => {
      const reactionsService = new ReactionsService({baseUrl});
      populateCache(reactionsService);

      const deleteSpy = sinon.spy(reactionsService, 'deleteReaction');
      reactionsService.toggleReaction(ari, 'grinning');
      expect(deleteSpy.called).to.equal(true);

      expect((reactionsService as any).cachedReactions[ari].filter(r => r.emojiId === 'grinning').length).to.equal(0);
      expect((reactionsService as any).cachedReactions[ari].length).to.equal(fetchGetReactions()[ari].length - 1);
    });
  });

});

