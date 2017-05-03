import { Promise } from 'es6-promise';
import { EmojiId } from '@atlaskit/emoji';

import { equalEmojiId, findIndex } from './internal/helpers';
import { default as AbstractReactionsProvider } from './reactions-resource';
import { Reactions, ReactionSummary } from './reactions-resource';
import { defaultReactionsByShortName } from './internal/selector';

export default class MockReactionsProvider extends AbstractReactionsProvider {

  protected cachedReactions = {
    'ari:cloud:owner:demo-cloud-id:item/1': [
      {
        ari: 'ari:cloud:owner:demo-cloud-id:item/1',
        emojiId: (defaultReactionsByShortName.get(':grinning:') as EmojiId).id!,
        count: 1,
        reacted: true
      },
      {
        ari: 'ari:cloud:owner:demo-cloud-id:item/1',
        emojiId: (defaultReactionsByShortName.get(':thumbsup:') as EmojiId).id!,
        count: 5,
        reacted: false
      },
      {
        ari: 'ari:cloud:owner:demo-cloud-id:item/1',
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

  getDetailedReaction(reaction: ReactionSummary): Promise<ReactionSummary> {
    return new Promise<ReactionSummary>((resolve, reject) => {
      const users = [
        {
          id: 'oscar',
          displayName: 'Oscar Wallhult'
        },
        {
          id: 'julien',
          displayName: 'Julien Michel Hoarau'
        },
        {
          id: 'craig',
          displayName: 'Craig Petchell'
        },
        {
          id: 'jerome',
          displayName: 'Jerome Touffe-Blin'
        },
      ].slice(0, Math.floor(Math.random() * 3) + 1);

      resolve({
        ...reaction,
        users
      });
    });
  }

  fetchReactionDetails(reaction: ReactionSummary): Promise<ReactionSummary> {
    const { ari, emojiId } = reaction;
    return new Promise<ReactionSummary>((resolve, reject) => {
      this
        .getDetailedReaction(reaction)
        .then(reactionDetails => {
          if (!this.cachedReactions[ari]) {
            this.cachedReactions[ari] = [];
          }

          const index = findIndex(this.cachedReactions[ari], r => r.emojiId === emojiId);

          setTimeout(() => {
            if (index !== -1) {
              this.cachedReactions[ari][index] = reactionDetails;
            } else {
              this.cachedReactions[ari].push(reactionDetails);
            }
            this.notifyUpdated(ari, this.cachedReactions[ari]);
            resolve(reactionDetails);
          }, 1000);
        });
    });
  }

  toggleReaction(containerAri: string, ari: string, emojiId: string) {
    if (!this.cachedReactions[ari]) {
      this.cachedReactions[ari] = [];
    }

    const hasReaction = this.cachedReactions[ari] && this.cachedReactions[ari].filter(r => equalEmojiId(r.emojiId, emojiId));
    const hasReacted = hasReaction && hasReaction.length !== 0 && hasReaction[0].reacted;

    if (hasReacted) {
      this.deleteReaction(containerAri, ari, emojiId)
        .then(state => {
          this.notifyUpdated(ari, state);
        });
    } else {
      this.addReaction(containerAri, ari, emojiId)
        .then(state => {
          this.notifyUpdated(ari, state);
        });
    }
  }

  addReaction(containerAri: string, ari: string, emojiId: string): Promise<ReactionSummary[]> {
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

  deleteReaction(containerAri: string, ari: string, emojiId: string): Promise<ReactionSummary[]> {
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

export const reactionsProvider = new MockReactionsProvider();
export const reactionsProviderPromise = Promise.resolve(reactionsProvider);
