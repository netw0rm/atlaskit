import { Promise } from 'es6-promise';
import 'whatwg-fetch';
import * as Faye from 'faye';
import { findIndex } from './internal/helpers';

let debounced: number | null = null;

export interface ReactionSummary {
  id?: string;
  ari: string;
  emojiId: string;
  count: number;
  reacted: boolean;
}

export interface Reaction {
  id: string;
  ari: string;
  emojiId: string;
  count: number;
  users: User[];
}

export interface User {
  displayName: string;
  id: string;
}

export interface Listener {
  handler: Function;
}

export interface Reactions {
  [key: string]: ReactionSummary[];
}

export interface ReactionsProvider {
  getReactions(aris: string[]): Promise<Reactions>;
  toggleReaction(containerAri: string, ari: string, emojiId: string);
  addReaction(containerAri: string, ari: string, emojiId: string): Promise<ReactionSummary[]>;
  deleteReaction(containerAri: string, ari: string, emojiId: string): Promise<ReactionSummary[]>;
  notifyUpdated(ari: string, state: ReactionSummary[]): void;
  subscribe(ari: string, handler: Function): void;
  unsubscribe(ari: string, handler: Function): void;
}

export default class AbstractReactionsResource implements ReactionsProvider {

  protected excludeArisFromAutoPoll: string[] = [];
  protected cachedReactions: Reactions = {};
  protected subscribers: { [ari: string]: Listener[] } = {};
  protected lastActionForAri: { [ari: string]: number } = {};

  private batchedAris: string[] = [];

  protected autoPoll(autoPollInterval) {
    if (!autoPollInterval) {
      return;
    }

    setTimeout(() => {
      const aris = Object.keys(this.subscribers);

      if (aris.length) {
        this.getReactions(aris)
          .then(reactions => {
            Object.keys(reactions).forEach(ari => {
              this.includeAriInAutoPoll(ari);
              this.notifyUpdated(ari, reactions[ari]);
            });
            this.autoPoll(autoPollInterval);
          });
      } else {
        this.autoPoll(autoPollInterval);
      }
    }, autoPollInterval);
  }


  getReactions(aris: string[]): Promise<Reactions> {
    return new Promise<Reactions>((resolve, reject) => {
      resolve({});
    });
  }

  toggleReaction(containerAri: string, ari: string, emojiId: string) {
    if (!this.cachedReactions[ari]) {
      this.cachedReactions[ari] = [];
    }

    const hasReaction = this.cachedReactions[ari] && this.cachedReactions[ari].filter(r => r.emojiId === emojiId);
    const hasReacted = hasReaction && hasReaction.length !== 0 && hasReaction[0].reacted;

    if (hasReacted) {
      this.deleteReaction(containerAri, ari, emojiId)
        .then(state => {
          this.notifyUpdated(ari, state);
        })
        .catch(() => {
          this.optimisticAddReaction(ari, emojiId);
          this.notifyUpdated(ari, this.cachedReactions[ari]);
        });
    } else {
      this.addReaction(containerAri, ari, emojiId)
        .then(state => {
          this.notifyUpdated(ari, state);
        })
        .catch(() => {
          this.optimisticDeleteReaction(ari, emojiId);
          this.notifyUpdated(ari, this.cachedReactions[ari]);
        });
    }
  }

  addReaction(containerAri: string, ari: string, emojiId: string): Promise<ReactionSummary[]> {
    return new Promise<ReactionSummary[]>((resolve, reject) => {
      resolve([]);
    });
  }

  deleteReaction(containerAri: string, ari: string, emojiId: string): Promise<ReactionSummary[]> {
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

    // Do not fetch from server if ARI is already in cache
    if (this.cachedReactions[ari]) {
      this.notifyUpdated(ari, this.cachedReactions[ari]);
      return;
    }

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

  private excludeAriFromAutoPoll(ari): void {
    if (this.excludeArisFromAutoPoll.indexOf(ari) === -1) {
      this.excludeArisFromAutoPoll.push(ari);
    }
  }

  private includeAriInAutoPoll(ari): void {
    const index = this.excludeArisFromAutoPoll.indexOf(ari);
    if (index === -1) {
      return;
    }
    this.excludeArisFromAutoPoll.splice(index, 1);
  }

  protected optimisticAddReaction(ari: string, emojiId: string): void {
    this.excludeAriFromAutoPoll(ari);

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
    this.excludeAriFromAutoPoll(ari);

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

export interface ReactionsProviderConfig {
  sessionToken?: string;
  baseUrl: string;
  autoPoll?: number;

  synchronyBaseUrl?: string;
  cloudId?: string;
  containerAris?: string[];
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

export class ReactionsResource extends AbstractReactionsResource implements ReactionsProvider {

  constructor(protected config: ReactionsProviderConfig) {
    super();

    if (config.autoPoll) {
      this.autoPoll(config.autoPoll);
    }
  }

  protected getHeaders(): Headers {
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
        Object.keys(reactions).forEach(ari => {
          this.cachedReactions[ari] = reactions[ari];
        });
        resolve(reactions);
      });
    });
  }

  addReaction(containerAri: string, ari: string, emojiId: string): Promise<ReactionSummary[]> {
    this.optimisticAddReaction(ari, emojiId);

    const timestamp = Date.now();
    this.lastActionForAri[ari] = timestamp;

    return new Promise<ReactionSummary[]>((resolve, reject) => {
      requestService<{ ari: string, reactions: ReactionSummary[] }>(this.config.baseUrl, 'reactions', {
        'method': 'POST',
        'headers': this.getHeaders(),
        'body': JSON.stringify({ emojiId, ari, containerAri }),
        'credentials': 'include'
      }).then(reactions => {

        // Do not update cache if it was already updated by a more recent action
        if (this.lastActionForAri[ari] === timestamp) {
          this.cachedReactions[ari] = reactions.reactions;
        }

        resolve(this.cachedReactions[ari]);
      }).catch(() => reject());
    });
  }

  deleteReaction(containerAri: string, ari: string, emojiId: string): Promise<ReactionSummary[]> {
    this.optimisticDeleteReaction(ari, emojiId);

    const timestamp = Date.now();
    this.lastActionForAri[ari] = timestamp;

    return new Promise<ReactionSummary[]>((resolve, reject) => {
      requestService<{ ari: string, reactions: ReactionSummary[] }>(this.config.baseUrl, `reactions?ari=${ari}&emojiId=${emojiId}&containerAri=${containerAri}`, {
        'method': 'DELETE',
        'headers': this.getHeaders(),
        'credentials': 'include'
      }).then(reactions => {

        // Do not update cache if it was already updated by a more recent action
        if (this.lastActionForAri[ari] === timestamp) {
          this.cachedReactions[ari] = reactions.reactions;
        }

        resolve(this.cachedReactions[ari]);
      }).catch(() => reject());
    });
  }
}

export interface RealTimeReactionsProviderConfig extends ReactionsProviderConfig {
  synchronyBaseUrl: string;
  containerAris: string[];
}

class JwtExtension {
  constructor(private jwt: string) { }

  incoming(message: any, cb: Function) {
    cb(message);
  }

  outgoing(message: any, cb: Function) {
    if (message.channel === '/meta/handshake') {
      message.ext = message.ext || {};
      message.ext.jwt = this.jwt;
    }
    cb(message);
  }
}

export class FabricRealTimeClient {
  private channels = new Map<string, Object>();
  private clientPromise: Promise<any>;

  constructor(private config: { cloudId: string, synchronyBaseUrl: string, baseUrl: string, sessionToken?: string }, private cloudId: string) {
    this.clientPromise = this.getToken().then(jwt => {
      const client = new Faye.Client(config.synchronyBaseUrl);
      client.addExtension(new JwtExtension(jwt));
      return client;
    });
  }

  public subscribeAll(containerAri: string[], callback: (data: any) => void) {
    return this.clientPromise.then(client => {
      containerAri.forEach(containerAri => {
        this.subscribe(containerAri, callback);
      });
    });
  }

  public subscribe(containerAri, callback: (data: any) => void) {
    return this.clientPromise.then(client => {
      const channelBase = `/pf-reactions-service/${this.cloudId}`;
      const channel = client.subscribe(`${channelBase}/${containerAri.replace(/\:/g, '-')}`, (data) => callback(data));
      this.channels.set(containerAri, channel);
    });
  }

  public unsubscribe(containerAri) {
    const channel = this.channels.get(containerAri);
    if (channel) {
      (channel as any).cancel();
      this.channels.delete(containerAri);
    }
  }

  private getToken(): Promise<string> {
    const { config } = this;
    return requestService<string>(config.baseUrl, 'reactions/realtime/token', {
      'method': 'POST',
      'headers': this.getHeaders(),
      'body': JSON.stringify({
        cloudId: this.cloudId,

      }),
      'credentials': 'include'
    });
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
}

// export class FabricRealTimeClientManger {
//   constructor(private config: { cloudId: string, synchronyBaseUrl: string, baseUrl: string, sessionToken?: string }, private cloudId: string) {
//   }
// }

export class RealTimeReactionsResource extends ReactionsResource implements ReactionsProvider {
  // private token: string;
  private channels: Map<string, Object>;
  private client: any;

  constructor(config: RealTimeReactionsProviderConfig) {
    super(config);

    this.init(config);
  }

  init(config: RealTimeReactionsProviderConfig) {
    this.channels = new Map<string, Object>();

    const jwt = 'NO WAY!';
    this.client = new Faye.Client(config.synchronyBaseUrl);
    this.client.addExtension(new JwtExtension(jwt));

    if (this.config.containerAris) {
      this.joinContainers(this.config.containerAris);
    }

  }

  joinContainers(containerAris: string[]) {
    // let client = new FabricRealTimeClient(this.config, cloudId);
    // client.subscribeAll(containerAris, this.updateReactions);

    // client.subscribe(containerAri)

    containerAris.forEach(containerAri => this.joinContainer(containerAri));
  }

  getCloudId(containerAri: string) {
    return containerAri.split(':')[3];
  }

  joinContainer(containerAri: string) {
    const channelBase = `/pf-reactions-service/${this.getCloudId(containerAri)}`;
    // const channel = this.client.subscribe(`${channelBase}/test`, (reactions) => this.updateReactions(reactions));
    const channel = this.client.subscribe(`${channelBase}/${containerAri.replace(/\:/g, '-')}`, (reactions) => this.updateReactions(reactions));
    this.channels.set(containerAri, channel);
  }

  leaveContainer(ari: string) {
    const channel = this.channels.get(ari);
    if (channel) {
      (channel as any).cancel();
      this.channels.delete(ari);
    }
  }

  mapReactionToReactionSummary(reaction: Reaction) {
    return {
      id: reaction.id,
      emojiId: reaction.emojiId,
      ari: reaction.ari,
      reacted: false,
      count: reaction.count
    };
  }

  updateReactions(data: { ari: string; reactions: Reaction[] }) {
    if (!data) {
      return;
    }

    const { ari, reactions } = data;

    if (!this.cachedReactions[ari]) {
      this.cachedReactions[ari] = reactions.map(reaction => this.mapReactionToReactionSummary(reaction));
    } else {
      const newReactions: ReactionSummary[] = [];
      reactions.forEach(reaction => {
        const index = findIndex(this.cachedReactions[ari], r => r.emojiId === reaction.emojiId);
        if (index !== -1) {
          const oldReaction = this.cachedReactions[ari][index];
          newReactions.push({ ...oldReaction, count: reaction.count });
        } else {
          newReactions.push(this.mapReactionToReactionSummary(reaction));
        }
      });

      this.cachedReactions[ari] = newReactions;
    }

    this.notifyUpdated(ari, this.cachedReactions[ari]);
  }
}
