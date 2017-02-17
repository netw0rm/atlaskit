import { Promise } from 'es6-promise';
import 'whatwg-fetch';
import { findIndex } from './internal/helpers';

let debounced: number | null = null;

export interface ReactionSummary {
  ari: string;
  emojiId: string;
  count: number;
  reacted: boolean;
}

export interface Listener {
  handler: Function;
}

export interface Reactions {
  [key: string]: ReactionSummary[];
}

export default class AbstractReactionsService {

  protected cachedReactions: Reactions = {};
  protected subscribers: { [ari: string]: Listener[] } = {};

  private batchedAris: string[] = [];

  getReactions(aris: string[]): Promise<Reactions> {
    return new Promise<Reactions>((resolve, reject) => {
      resolve({});
    });
  }

  toggleReaction(ari: string, emojiId: string) {
    if (!this.cachedReactions[ari]) {
      this.cachedReactions[ari] = [];
    }

    const hasReaction = this.cachedReactions[ari] && this.cachedReactions[ari].filter(r => r.emojiId === emojiId);
    const hasReacted = hasReaction && hasReaction.length !== 0 && hasReaction[0].reacted;

    if (hasReacted) {
      this.deleteReaction(ari, emojiId)
        .then(state => {
          this.notifyUpdated(ari, state);
        })
        .catch(() => {
          this.optimisticAddReaction(ari, emojiId);
          this.notifyUpdated(ari, this.cachedReactions[ari]);
        });
    } else {
      this.addReaction(ari, emojiId)
        .then(state => {
          this.notifyUpdated(ari, state);
        })
        .catch(() => {
          this.optimisticDeleteReaction(ari, emojiId);
          this.notifyUpdated(ari, this.cachedReactions[ari]);
        });
    }
  }

  addReaction(ari: string, emojiId: string): Promise<ReactionSummary[]> {
    return new Promise<ReactionSummary[]>((resolve, reject) => {
      resolve([]);
    });
  }

  deleteReaction(ari: string, emojiId: string): Promise<ReactionSummary[]> {
    return new Promise<ReactionSummary[]>((resolve, reject) => {
      resolve([]);
    });
  }

  notifyUpdated(ari: string, state: ReactionSummary[]): void {
    if (!this.subscribers[ari]) {
      return;
    }

    this.subscribers[ari].forEach(listener => {
      listener.handler(state);
    });
  }

  subscribe(ari: string, handler: Function): void {
    if (!this.subscribers[ari]) {
      this.subscribers[ari] = [];
    }

    this.subscribers[ari].push({ handler });

    if (debounced) {
      clearTimeout(debounced);
    }

    this.queueAri(ari);

    debounced = setTimeout(() => {
      this.getReactions(this.batchedAris)
        .then(reactions => {
          Object.keys(reactions).forEach(ari => {
            this.dequeueAri(ari);
            this.notifyUpdated(ari, reactions[ari]);
          });
        });
    }, 1);
  }

  unsubscribe(ari: string, handler: Function): void {
    if (!this.subscribers[ari]) {
      return;
    }

    const index = findIndex(this.subscribers[ari], (listener: Listener) => listener.handler === handler);

    if (index !== -1) {
      this.subscribers[ari].splice(index, 1);
    }
  }

  private queueAri(ari: string): void {
    const index = findIndex(this.batchedAris, (i => i === ari));
    if (index === -1) {
      this.batchedAris.push(ari);
    }
  }

  private dequeueAri(ari: string): void {
    const index = findIndex(this.batchedAris, (i => i === ari));
    if (index !== -1) {
      this.batchedAris.splice(index, 1);
    }
  }

  protected optimisticAddReaction(ari: string, emojiId: string): void {
    if (!this.cachedReactions[ari]) {
      this.cachedReactions[ari] = [];
    }

    const index = findIndex(this.cachedReactions[ari], reaction => reaction.emojiId === emojiId);

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

    this.notifyUpdated(ari, this.cachedReactions[ari]);
  }

  protected optimisticDeleteReaction(ari: string, emojiId: string): void {
    if (!this.cachedReactions[ari]) {
      this.cachedReactions[ari] = [];
    }

    const index = findIndex(this.cachedReactions[ari], reaction => reaction.emojiId === emojiId);
    const reaction = this.cachedReactions[ari][index];

    reaction.reacted = false;
    reaction.count--;

    if (reaction.count < 1) {
      this.cachedReactions[ari].splice(index, 1);
    }

    this.notifyUpdated(ari, this.cachedReactions[ari]);
  }
}

export interface ReactionsServiceConfig {
  sessionToken?: string;
  baseUrl: string;
}

const requestService = <T>(baseUrl: string, path: string, opts?: {}) => {

  const url = `${baseUrl}/${path}`;
  const options = opts;

  return new Promise<T>((resolve, reject) => {
    fetch(new Request(url, options))
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          reject({
            code: response.status,
            reason: response.statusText,
          });
        }
      })
      .catch(reject);
  });
};

export class ReactionsService extends AbstractReactionsService {

  constructor(private config: ReactionsServiceConfig) {
    super();
  }

  private getHeaders(): Headers {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    if (this.config.sessionToken) {
      headers.append('Authorization', this.config.sessionToken);
    }
    return headers;
  }

  getReactions(aris: string[]): Promise<Reactions> {
    return new Promise<Reactions>((resolve, reject) => {
      requestService<Reactions>(this.config.baseUrl, 'reactions/view', {
        'method': 'POST',
        'headers': this.getHeaders(),
        'body': JSON.stringify({ aris }),
        'credentials': 'include'
      }).then(reactions => {
        this.cachedReactions = reactions;
        resolve(reactions);
      });
    });
  }

  addReaction(ari: string, emojiId: string): Promise<ReactionSummary[]> {
    this.optimisticAddReaction(ari, emojiId);

    return new Promise<ReactionSummary[]>((resolve, reject) => {
      requestService<{ ari: string, reactions: ReactionSummary[] }>(this.config.baseUrl, 'reactions', {
        'method': 'POST',
        'headers': this.getHeaders(),
        'body': JSON.stringify({ emojiId, ari }),
        'credentials': 'include'
      }).then(reactions => {
        this.cachedReactions[ari] = reactions.reactions;
        resolve(reactions.reactions);
      }).catch(() => reject());
    });
  }

  deleteReaction(ari: string, emojiId: string): Promise<ReactionSummary[]> {
    this.optimisticDeleteReaction(ari, emojiId);

    return new Promise<ReactionSummary[]>((resolve, reject) => {
      requestService<{ ari: string, reactions: ReactionSummary[] }>(this.config.baseUrl, `reactions?ari=${ari}&emojiId=${emojiId}`, {
        'method': 'DELETE',
        'headers': this.getHeaders(),
        'credentials': 'include'
      }).then(reactions => {
        this.cachedReactions[ari] = reactions.reactions;
        resolve(reactions.reactions);
      }).catch(() => reject());
    });
  }
}
