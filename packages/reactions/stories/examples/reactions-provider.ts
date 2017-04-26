import { Promise } from 'es6-promise';
import { EmojiId } from '@atlaskit/emoji';

import { equalEmojiId, findIndex } from '../../src/internal/helpers';
import { default as AbstractReactionsProvider } from '../../src/reactions-resource';
import { Reactions, ReactionSummary } from '../../src/reactions-resource';
import { defaultReactionsByShortName } from '../../src/internal/selector';

export default class MockReactionsProvider extends AbstractReactionsProvider {

  protected cachedReactions = {
    'ari:cloud:demo:123:123': [
      {
        ari: 'ari:cloud:demo:123:123',
        emojiId: (defaultReactionsByShortName.get(':grinning:') as EmojiId).id!,
        count: 1,
        reacted: true
      },
      {
        ari: 'ari:cloud:demo:123:123',
        emojiId: (defaultReactionsByShortName.get(':thumbsup:') as EmojiId).id!,
        count: 5,
        reacted: false
      },
      {
        ari: 'ari:cloud:demo:123:123',
        emojiId: (defaultReactionsByShortName.get(':heart:') as EmojiId).id!,
        count: 100,
        reacted: false
      }
    ]
  };

  getReactions(aris: string[]): Promise<Reactions> {
    return new Promise<Reactions>((resolve, reject) => {
      resolve(this.cachedReactions);
    });
  }

  toggleReaction(ari: string, emojiId: string) {
    if (!this.cachedReactions[ari]) {
      this.cachedReactions[ari] = [];
    }

    const hasReaction = this.cachedReactions[ari] && this.cachedReactions[ari].filter(r => equalEmojiId(r.emojiId, emojiId));
    const hasReacted = hasReaction && hasReaction.length !== 0 && hasReaction[0].reacted;

    if (hasReacted) {
      this.deleteReaction(ari, emojiId)
        .then(state => {
          this.notifyUpdated(ari, state);
        });
    } else {
      this.addReaction(ari, emojiId)
        .then(state => {
          this.notifyUpdated(ari, state);
        });
    }
  }

  addReaction(ari: string, emojiId: string): Promise<ReactionSummary[]> {
    return new Promise<ReactionSummary[]>((resolve, reject) => {
      const index = findIndex(this.cachedReactions[ari], reaction => equalEmojiId(reaction.emojiId, emojiId));

      if (index !== -1) {
        const reaction = this.cachedReactions[ari][index];
        reaction.reacted = true;
        reaction.count++;
      } else {
        this.cachedReactions[ari].push({
          ari: ari,
          emojiId: emojiId,
          count: 1,
          reacted: true
        });
      }

      resolve(this.cachedReactions[ari]);
    });
  }

  deleteReaction(ari: string, emojiId: string): Promise<ReactionSummary[]> {
    return new Promise<ReactionSummary[]>((resolve, reject) => {
      const index = findIndex(this.cachedReactions[ari], reaction => equalEmojiId(reaction.emojiId, emojiId));
      const reaction = this.cachedReactions[ari][index];

      reaction.reacted = false;
      reaction.count--;

      if (reaction.count < 1) {
        this.cachedReactions[ari].splice(index, 1);
      }

      resolve(this.cachedReactions[ari]);
    });
  }

}

export const reactionsProvider = new MockReactionsProvider() as any; // This need to be any in order for the overview story to work.
export const reactionsProviderPromise = Promise.resolve(reactionsProvider) as any;
