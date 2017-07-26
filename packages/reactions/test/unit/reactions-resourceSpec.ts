import * as fetchMock from 'fetch-mock/src/client';

import { ReactionsResource } from '../../src';
import { equalEmojiId } from '../../src/internal/helpers';
import { grinId, grinningId, laughingId, smileyId, thumbsupId } from './_test-data';

const baseUrl = 'https://reactions';
const ari = 'ari:cloud:owner:demo-cloud-id:item/1';
const containerAri = 'ari:cloud:owner:demo-cloud-id:container/1';

const detailedReaction = {
  ari: ari,
  containerAri: containerAri,
  emojiId: grinningId.id!,
  count: 1,
  reacted: true,
  users: [
    {
      id: 'oscar',
      displayName: 'Oscar Wallhult'
    }
  ]
};

const reaction = {
  ari: ari,
  containerAri: containerAri,
  emojiId: grinningId.id!,
  count: 1,
  reacted: true
};

const fetchDetailedReaction = () => {
  return detailedReaction;
};

const fetchGetReactions = () => {
  return {
    [ari]: [
      {
        ari: ari,
        containerAri: containerAri,
        emojiId: grinningId.id!,
        count: 1,
        reacted: true
      },
      {
        ari: ari,
        containerAri: containerAri,
        emojiId: laughingId.id!,
        count: 2,
        reacted: true
      },
      {
        ari: ari,
        containerAri: containerAri,
        emojiId: thumbsupId.id!,
        count: 5,
        reacted: false
      },
      {
        ari: ari,
        containerAri: containerAri,
        emojiId: grinId.id!,
        count: 100,
        reacted: false
      }
    ]
  };
};

const fetchAddReaction = () => {
  return {
    ari: ari,
    containerAri: containerAri,
    reactions: [...fetchGetReactions()[ari], {
      ari: ari,
      containerAri: containerAri,
      emojiId: smileyId.id,
      count: 1,
      reacted: true
    }]
  };
};

const fetchDeleteReaction = () => {
  return {
    ari: ari,
    containerAri: containerAri,
    reactions: fetchGetReactions()[ari].filter(r => !equalEmojiId(r.emojiId, grinningId.id!))
  };
};

const populateCache = (reactionsProvider: ReactionsResource) => {
  const cachedReactions = {};
  const response = fetchGetReactions();
  Object.keys(response).forEach(ari => {
    const key = `${response[ari][0].containerAri}|${response[ari][0].ari}`;
    cachedReactions[key] = response[ari];
  });
  (reactionsProvider as any).cachedReactions = cachedReactions;
};

describe('@atlaskit/reactions/reactions-provider', () => {

  afterEach(() => {
    fetchMock.restore();
  });

  describe('test data defined', () => {
    expect(grinningId).not.toEqual(undefined);
    expect(laughingId).not.toEqual(undefined);
    expect(thumbsupId).not.toEqual(undefined);
    expect(grinId).not.toEqual(undefined);
    expect(smileyId).not.toEqual(undefined);
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
      return reactionsProvider.getReactions([{ari, containerAri}])
        .then(reactions => {
          expect(reactions).toEqual(fetchGetReactions());
        });
    });

    it('should set cached reactions', () => {
      return reactionsProvider.getReactions([{ari, containerAri}])
        .then(reactions => {
          expect(Object.keys((reactionsProvider as any).cachedReactions).length).toBe(1);
        });
    });

    it('should not overwrite cache for excluded aris', () => {
      populateCache(reactionsProvider);
      const anotherAri = 'another:ari:123';
      const anotherAriData = [
        {
          ari: anotherAri,
          containerAri: containerAri,
          emojiId: 'grinning',
          count: 1,
          reacted: false
        }
      ];

      const anotherCacheKey = reactionsProvider.objectReactionKey(containerAri, anotherAri);
      (reactionsProvider as any).cachedReactions[anotherCacheKey] = anotherAriData;

      return reactionsProvider.getReactions([{ari, containerAri}])
        .then(reactions => {
          expect((reactionsProvider as any).cachedReactions).not.toEqual(reactions);
          expect((reactionsProvider as any).cachedReactions[reactionsProvider.objectReactionKey(containerAri, ari)]).toEqual(reactions[ari]);
          expect((reactionsProvider as any).cachedReactions[anotherCacheKey]).toEqual(anotherAriData);
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
      const spy = jest.spyOn(reactionsProvider, 'notifyUpdated');

      return reactionsProvider.addReaction(containerAri, ari, smileyId.id!)
        .then(state => {
          expect(spy).toHaveBeenCalled();
          expect((reactionsProvider as any).cachedReactions[reactionsProvider.objectReactionKey(containerAri, ari)]).toEqual(state);
          expect(state.length).toBe(fetchGetReactions()[ari].length + 1);
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
      const spy = jest.spyOn(reactionsProvider, 'notifyUpdated');

      return reactionsProvider.deleteReaction(containerAri, ari, grinningId.id!)
        .then(state => {
          expect(spy).toHaveBeenCalled();
          expect((reactionsProvider as any).cachedReactions[reactionsProvider.objectReactionKey(containerAri, ari)]).toEqual(state);
          expect(state.length).toBe(fetchGetReactions()[ari].length - 1);
        });
    });
  });

  describe('toggleReaction', () => {
    it('should optimistically add reaction if not in cache or if user have not reacted and call service', () => {
      const reactionsProvider = new ReactionsResource({baseUrl});
      populateCache(reactionsProvider);

      // cast to <any> because Jest doesn't see the protected optmisticAddReaction method
      const optimisticSpy = jest.spyOn(<any>reactionsProvider, 'optimisticAddReaction');
      const addSpy = jest.spyOn(reactionsProvider, 'addReaction');

      reactionsProvider.toggleReaction(containerAri, ari, smileyId.id!);
      expect(optimisticSpy).toHaveBeenCalled();
      expect(addSpy).toHaveBeenCalled();
    });

    it('should optimistically delete reaction if in cache and call service', () => {
      const reactionsProvider = new ReactionsResource({baseUrl});
      populateCache(reactionsProvider);

      // cast to <any> because Jest doesn't see the protected optmisticDeleteReaction method
      const optimisticSpy = jest.spyOn(<any>reactionsProvider, 'optimisticDeleteReaction');
      const deleteSpy = jest.spyOn(reactionsProvider, 'deleteReaction');

      reactionsProvider.toggleReaction(containerAri, ari, grinningId.id!);
      expect(optimisticSpy).toHaveBeenCalled();
      expect(deleteSpy).toHaveBeenCalled();
    });

    it('should optimistically increase counter on reaction if user have not already reacted', () => {
      const reactionsProvider = new ReactionsResource({baseUrl});
      populateCache(reactionsProvider);

      const addSpy = jest.spyOn(reactionsProvider, 'addReaction');
      reactionsProvider.toggleReaction(containerAri, ari, thumbsupId.id!);
      expect(addSpy).toHaveBeenCalled();

      const reaction = (reactionsProvider as any).cachedReactions[reactionsProvider.objectReactionKey(containerAri, ari)].filter(r => equalEmojiId(r.emojiId, thumbsupId.id!))[0];
      expect(reaction.count).toBe(6);
      expect(reaction.reacted).toBe(true);
    });

    it('should optimistically decrease counter on reaction if user have already reacted', () => {
      const reactionsProvider = new ReactionsResource({baseUrl});
      populateCache(reactionsProvider);

      const deleteSpy = jest.spyOn(reactionsProvider, 'deleteReaction');
      reactionsProvider.toggleReaction(containerAri, ari, laughingId.id!);
      expect(deleteSpy).toHaveBeenCalled();

      const reaction = (reactionsProvider as any).cachedReactions[reactionsProvider.objectReactionKey(containerAri, ari)].filter(r => equalEmojiId(r.emojiId, laughingId.id!))[0];
      expect(reaction.count).toBe(1);
      expect(reaction.reacted).toBe(false);
    });

    it('should delete reaction if count is less than 1', () => {
      const reactionsProvider = new ReactionsResource({baseUrl});
      populateCache(reactionsProvider);

      const deleteSpy = jest.spyOn(reactionsProvider, 'deleteReaction');
      reactionsProvider.toggleReaction(containerAri, ari, grinningId.id!);
      expect(deleteSpy).toHaveBeenCalled();

      const objectReactionKey = reactionsProvider.objectReactionKey(containerAri, ari);
      expect((reactionsProvider as any).cachedReactions[objectReactionKey].filter(r => equalEmojiId(r.emojiId, grinningId.id!)).length).toBe(0);
      expect((reactionsProvider as any).cachedReactions[objectReactionKey].length).toBe(fetchGetReactions()[ari].length - 1);
    });
  });

  describe('getDetailedReaction', () => {
    const reactionId = `${containerAri}|${ari}|${grinningId!.id}`;
    const reactionsProvider = new ReactionsResource({baseUrl});

    beforeEach(() => {
      fetchMock.mock({
        options: {
          method: 'GET'
        },
        matcher: `end:reactions?reactionId=${encodeURIComponent(reactionId)}`,
        response: fetchDetailedReaction()
      });
    });

    it('should fetch details for reaction', () => {
      return reactionsProvider.getDetailedReaction(reaction)
        .then(detail => {
          expect(detail).toEqual(detailedReaction);
        });
    });
  });

  describe('fetchReactionDetails', () => {
    const reactionId = `${containerAri}|${ari}|${grinningId!.id}`;
    const reactionsProvider = new ReactionsResource({baseUrl});

    beforeEach(() => {
      fetchMock.mock({
        options: {
          method: 'GET'
        },
        matcher: `end:reactions?reactionId=${encodeURIComponent(reactionId)}`,
        response: fetchDetailedReaction()
      });
    });

    it('should fetch reaction details for reaction', () => {
      const spy = jest.spyOn(reactionsProvider, 'getDetailedReaction');
      reactionsProvider.fetchReactionDetails(reaction);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(reaction);
      spy.mockRestore();
    });

    it('should call notifyUpdated if cached', () => {
      const key = `${reaction.containerAri}|${reaction.ari}`;
      (reactionsProvider as any).cachedReactions = {
        [key]: [reaction]
      };
      const spy = jest.spyOn(reactionsProvider, 'notifyUpdated');
      return reactionsProvider.fetchReactionDetails(reaction)
          .then(() => {
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(reaction.containerAri, reaction.ari, [detailedReaction]);
            spy.mockRestore();
          });
    });

    it('should not query if request already in flight', () => {
      const firstCall = reactionsProvider.fetchReactionDetails(reaction);

      const spy = jest.spyOn(reactionsProvider, 'getDetailedReaction');
      const secondCall = reactionsProvider.fetchReactionDetails(reaction);
      expect(spy).not.toHaveBeenCalled();
      expect(secondCall).toBe(firstCall);
      spy.mockRestore();
    });

  });
});

