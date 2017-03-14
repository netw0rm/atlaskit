import * as chai from 'chai';
import * as fetchMock from 'fetch-mock';
import * as sinon from 'sinon';

import { ReactionsResource } from '../src';

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

const populateCache = (reactionsProvider: ReactionsResource) => {
  (reactionsProvider as any).cachedReactions = fetchGetReactions();
};

describe('@atlaskit/reactions/reactions-provider', () => {

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

    const reactionsProvider = new ReactionsResource({baseUrl});
    it('should return reaction data', () => {
      return reactionsProvider.getReactions([ari])
        .then(reactions => {
          expect(reactions).to.deep.equal(fetchGetReactions());
        });
    });

    it('should set cached reactions', () => {
      return reactionsProvider.getReactions([ari])
        .then(reactions => {
          expect((reactionsProvider as any).cachedReactions).to.deep.equal(reactions);
        });
    });

    it('should not overwrite cache for excluded aris', () => {
      populateCache(reactionsProvider);
      const anotherAri = 'another:ari:123';
      const anotherAriData = [
        {
          ari: anotherAri,
          emojiId: 'grinning',
          count: 1,
          reacted: false
        }
      ];

      (reactionsProvider as any).cachedReactions[anotherAri] = anotherAriData;

      return reactionsProvider.getReactions([ari])
        .then(reactions => {
          expect((reactionsProvider as any).cachedReactions).not.to.deep.equal(reactions);
          expect((reactionsProvider as any).cachedReactions[ari]).to.deep.equal(reactions[ari]);
          expect((reactionsProvider as any).cachedReactions[anotherAri]).to.deep.equal(anotherAriData);
        });
    });
  });

  describe('addReaction', () => {
    const reactionsProvider = new ReactionsResource({baseUrl});
    populateCache(reactionsProvider);

    it('should optimistically add reaction', () => {
      fetchMock.mock({
        options: {
          method: 'POST'
        },
        matcher: 'end:reactions',
        response: fetchAddReaction()
      });
      const spy = sinon.spy(reactionsProvider, 'notifyUpdated');

      return reactionsProvider.addReaction(ari, 'smiley')
        .then(state => {
          expect(spy.called).to.equal(true);
          expect((reactionsProvider as any).cachedReactions[ari]).to.deep.equal(state);
          expect(state.length).to.equal(fetchGetReactions()[ari].length + 1);
        });
    });
  });

  describe('deleteReaction', () => {
    const reactionsProvider = new ReactionsResource({baseUrl});
    populateCache(reactionsProvider);

    it('should optimistically delete reaction', () => {
      fetchMock.mock({
        options: {
          method: 'DELETE'
        },
        matcher: `begin:${baseUrl}/reactions?ari=${ari}`,
        response: fetchDeleteReaction()
      });
      const spy = sinon.spy(reactionsProvider, 'notifyUpdated');

      return reactionsProvider.deleteReaction(ari, 'grinning')
        .then(state => {
          expect(spy.called).to.equal(true);
          expect((reactionsProvider as any).cachedReactions[ari]).to.deep.equal(state);
          expect(state.length).to.equal(fetchGetReactions()[ari].length - 1);
        });
    });
  });

  describe('toggleReaction', () => {
    it('should optimistically add reaction if not in cache or if user have not reacted and call service', () => {
      const reactionsProvider = new ReactionsResource({baseUrl});
      populateCache(reactionsProvider);

      const optimisticSpy = sinon.spy(reactionsProvider, 'optimisticAddReaction');
      const addSpy = sinon.spy(reactionsProvider, 'addReaction');

      reactionsProvider.toggleReaction(ari, 'smiley');
      expect(optimisticSpy.called).to.equal(true);
      expect(addSpy.called).to.equal(true);
    });

    it('should optimistically delete reaction if in cache and call service', () => {
      const reactionsProvider = new ReactionsResource({baseUrl});
      populateCache(reactionsProvider);

      const optimisticSpy = sinon.spy(reactionsProvider, 'optimisticDeleteReaction');
      const deleteSpy = sinon.spy(reactionsProvider, 'deleteReaction');

      reactionsProvider.toggleReaction(ari, 'grinning');
      expect(optimisticSpy.called).to.equal(true);
      expect(deleteSpy.called).to.equal(true);
    });

    it('should optimistically increase counter on reaction if user have not already reacted', () => {
      const reactionsProvider = new ReactionsResource({baseUrl});
      populateCache(reactionsProvider);

      const addSpy = sinon.spy(reactionsProvider, 'addReaction');
      reactionsProvider.toggleReaction(ari, 'thumbsup');
      expect(addSpy.called).to.equal(true);

      const reaction = (reactionsProvider as any).cachedReactions[ari].filter(r => r.emojiId === 'thumbsup')[0];
      expect(reaction.count).to.equal(6);
      expect(reaction.reacted).to.equal(true);
    });

    it('should optimistically decrease counter on reaction if user have already reacted', () => {
      const reactionsProvider = new ReactionsResource({baseUrl});
      populateCache(reactionsProvider);

      const deleteSpy = sinon.spy(reactionsProvider, 'deleteReaction');
      reactionsProvider.toggleReaction(ari, 'laughing');
      expect(deleteSpy.called).to.equal(true);

      const reaction = (reactionsProvider as any).cachedReactions[ari].filter(r => r.emojiId === 'laughing')[0];
      expect(reaction.count).to.equal(1);
      expect(reaction.reacted).to.equal(false);
    });

    it('should delete reaction if count is less than 1', () => {
      const reactionsProvider = new ReactionsResource({baseUrl});
      populateCache(reactionsProvider);

      const deleteSpy = sinon.spy(reactionsProvider, 'deleteReaction');
      reactionsProvider.toggleReaction(ari, 'grinning');
      expect(deleteSpy.called).to.equal(true);

      expect((reactionsProvider as any).cachedReactions[ari].filter(r => r.emojiId === 'grinning').length).to.equal(0);
      expect((reactionsProvider as any).cachedReactions[ari].length).to.equal(fetchGetReactions()[ari].length - 1);
    });
  });

});

