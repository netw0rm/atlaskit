import { Promise } from 'es6-promise';
import { EmojiId } from '@atlaskit/emoji';

import { equalEmojiId, findIndex } from './internal/helpers';
import {default as AbstractReactionsProvider, ObjectReactionKey} from './reactions-resource';
import { Reactions, ReactionSummary } from './reactions-resource';
import { defaultReactionsByShortName } from './internal/selector';

export default class MockReactionsProvider extends AbstractReactionsProvider {

  protected cachedReactions = {
    'ari:cloud:owner:demo-cloud-id:container/1|ari:cloud:owner:demo-cloud-id:item/1': [
      {
        ari: 'ari:cloud:owner:demo-cloud-id:item/1',
        containerAri: 'ari:cloud:owner:demo-cloud-id:container/1',
        emojiId: (defaultReactionsByShortName.get(':grinning:') as EmojiId).id!,
        count: 1,
        reacted: true
      },
      {
        ari: 'ari:cloud:owner:demo-cloud-id:item/1',
        containerAri: 'ari:cloud:owner:demo-cloud-id:container/1',
        emojiId: (defaultReactionsByShortName.get(':thumbsup:') as EmojiId).id!,
        count: 5,
        reacted: false
      },
      {
        ari: 'ari:cloud:owner:demo-cloud-id:item/1',
        containerAri: 'ari:cloud:owner:demo-cloud-id:container/1',
        emojiId: (defaultReactionsByShortName.get(':heart:') as EmojiId).id!,
        count: 100,
        reacted: false
      }
    ]
  };

  getReactions(keys: ObjectReactionKey[]): Promise<Reactions> {
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
    const { containerAri, ari, emojiId } = reaction;
    return new Promise<ReactionSummary>((resolve, reject) => {
      this
        .getDetailedReaction(reaction)
        .then(reactionDetails => {
          if (!this.cachedReactions[ari]) {
            this.cachedReactions[ari] = [];
          }

          const key = this.objectReactionKey(containerAri, ari);
          const index = findIndex(this.cachedReactions[key], r => r.emojiId === emojiId);

          setTimeout(() => {
            if (index !== -1) {
              this.cachedReactions[key][index] = reactionDetails;
            } else {
              this.cachedReactions[key].push(reactionDetails);
            }
            this.notifyUpdated(containerAri, ari, this.cachedReactions[key]);
            resolve(reactionDetails);
          }, 1000);
        });
    });
  }

  toggleReaction(containerAri: string, ari: string, emojiId: string) {
    const key = this.objectReactionKey(containerAri, ari);
    if (!this.cachedReactions[key]) {
      this.cachedReactions[key] = [];
    }

    const hasReaction = this.cachedReactions[key] && this.cachedReactions[key].filter(r => equalEmojiId(r.emojiId, emojiId));
    const hasReacted = hasReaction && hasReaction.length !== 0 && hasReaction[0].reacted;

    if (hasReacted) {
      this.deleteReaction(containerAri, ari, emojiId)
        .then(state => {
          this.notifyUpdated(containerAri, ari, state);
        });
    } else {
      this.addReaction(containerAri, ari, emojiId)
        .then(state => {
          this.notifyUpdated(containerAri, ari, state);
        });
    }
  }

  addReaction(containerAri: string, ari: string, emojiId: string): Promise<ReactionSummary[]> {
    return new Promise<ReactionSummary[]>((resolve, reject) => {
      const key = this.objectReactionKey(containerAri, ari);
      const index = findIndex(this.cachedReactions[key], reaction => equalEmojiId(reaction.emojiId, emojiId));

      if (index !== -1) {
        const reaction = this.cachedReactions[key][index];
        reaction.reacted = true;
        reaction.count++;
      } else {
        this.cachedReactions[key].push({
          ari: ari,
          emojiId: emojiId,
          count: 1,
          reacted: true
        });
      }

      resolve(this.cachedReactions[key]);
    });
  }

  deleteReaction(containerAri: string, ari: string, emojiId: string): Promise<ReactionSummary[]> {
    return new Promise<ReactionSummary[]>((resolve, reject) => {
      const key = this.objectReactionKey(containerAri, ari);
      const index = findIndex(this.cachedReactions[key], reaction => equalEmojiId(reaction.emojiId, emojiId));
      const reaction = this.cachedReactions[key][index];

      reaction.reacted = false;
      reaction.count--;

      if (reaction.count < 1) {
        this.cachedReactions[key].splice(index, 1);
      }

      resolve(this.cachedReactions[key]);
    });
  }

}

export const reactionsProvider = new MockReactionsProvider();
export const reactionsProviderPromise = Promise.resolve(reactionsProvider);
