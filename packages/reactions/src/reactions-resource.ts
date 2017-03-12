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

class FabricRealTimeSiteClient {
  private channels = new Map<string, Object>();
  private clientPromise: Promise<any>;

  constructor(private config: { cloudId: string, synchronyBaseUrl: string, realTimeServiceBaseUrl: string, sessionToken?: string }) {
    this.clientPromise = this.getToken().then(jwt => {
      const client = new Faye.Client(config.synchronyBaseUrl);
      client.addExtension(new JwtExtension(jwt));
      return {
        client: client
      };
    }).catch((error) => {
      console.log(error)
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
    return this.clientPromise.then(data => {
      const channelBase = `/pf-reactions-service/${this.config.cloudId}`;
      const channel = data.client.subscribe(`${channelBase}/${containerAri.replace(/\:/g, '-')}`, (data) => callback(data));
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
    return requestService<string>(config.realTimeServiceBaseUrl, `reactions/realtime/token?cloudId=${this.config.cloudId}`, {
      'method': 'POST',
      'headers': this.getHeaders(),
      'body': JSON.stringify({}),
      'credentials': 'include'
    }).then((data: any) => data.token);
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

export interface RealTimeClient {
  on(eventType: string, callback): void;
  off(eventType: string, callback): void;
}

interface EventHandler {
  (data: any): void
}

export class FabricRealTimeClient implements RealTimeClient {
  private clients = new Map<string, FabricRealTimeSiteClient>();
  private mapping = new Map<string, EventHandler[]>();

  constructor(private config: { synchronyBaseUrl: string, realTimeServiceBaseUrl: string, sessionToken?: string }) {
  }

  public on(eventType: string, callback) {
    let handlers = this.mapping.get(eventType);
    if (handlers === undefined) {
      handlers = [];
      this.mapping.set(eventType, handlers);
    }

    handlers.push(callback);
  }

  public off(eventType: string, callback) {
    let handlers = this.mapping.get(eventType);
    if (handlers !== undefined) {
      for (let i = 0; i < handlers.length; i++) {
        if (handlers[i] === callback) {
          handlers.splice(i, 1);
          return;
        }
      }
    }
  }

  private dispatchEvent(event: any) {
    if (event && event.eventType) {
      const handlers = this.mapping.get(event.eventType);
      if (handlers) {
        for (let handler of handlers) {
          try {
            handler(event.data);
          } catch (error) {
            // TODO: log error
          }
        }
      }
    }
  }

  public subscribe(containerAri) {
    const siteId = this.getSiteId(containerAri);
    let siteClient = this.clients.get(siteId);
    if (siteClient === undefined) {
      siteClient = new FabricRealTimeSiteClient({ ...this.config, cloudId: siteId });
      this.clients.set(siteId, siteClient);
    }
    
    return siteClient.subscribe(containerAri, (data) => this.dispatchEvent(data));
  }

  public subscribeAll(containerAri: string[], callback: (data: any) => void) {
    return Promise.all(containerAri.map(containerAri => this.subscribe(containerAri)));
  }

  public unsubscribe(containerAri) {
    const siteId = this.getSiteId(containerAri);
    let siteClient = this.clients.get(siteId);
    if (siteClient) {
      this.clients.delete(siteId);
      return siteClient.unsubscribe(containerAri);
    }
  }

  private getSiteId(containerAri: string) {
    return containerAri.split(':')[3];
  }
}

export class RealTimeReactionsResource extends ReactionsResource implements ReactionsProvider {
  constructor(config: ReactionsProviderConfig, private realTimeClient: FabricRealTimeClient) {
    super(config);

    this.realTimeClient.on("reactions_update", (data) => this.updateReactions(data));
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
