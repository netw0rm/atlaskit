import * as URLSearchParams from 'url-search-params'; // IE, Safari, Mobile Chrome, Mobile Safari
import 'es6-promise/auto'; // 'whatwg-fetch' needs a Promise polyfill
import 'whatwg-fetch';

import { Mention, Presence } from '../types';
import debug from '../util/logger';

export interface KeyValues {
  [index: string]: any;
}

export interface SecurityOptions {
  params: KeyValues;
  headers: KeyValues;
}

/**
 * Returns the current SecurityOptions for the mentions service.
 */
export interface SecurityProvider {
  (): SecurityOptions;
}

/**
 * Returns a promise to a SecurityOptions that has just been forcibly refreshed with a
 * new token. Will be used for single retry per request if a 401 is returned.
 */
export interface RefreshSecurityProvider {
  (): Promise<SecurityOptions>;
}

export interface ResultCallback<T> {
  (result: T): void;
}

export interface ErrorCallback {
  (error: Error): void;
}

export interface InfoCallback {
  (info: string): void;
}

export interface PresenceUpdate {
  [index: string]: Presence;
}

export interface MentionsResult {
  mentions: Mention[];
}

export interface MentionResourceConfig {
  /** the base url of the mentions service */
  url: string;
  securityProvider?: SecurityProvider;
  containerId?: string;
  productId?: string;
  refreshedSecurityProvider?: RefreshSecurityProvider;
  shouldHighlightMention?: (mention: Mention) => boolean;
}

export interface ResourceProvider<Result> {
  subscribe(key: string, callback?: ResultCallback<Result>, errCallback?: ErrorCallback, infoCallback?: InfoCallback): void;
  unsubscribe(key: string): void;
}

export interface MentionProvider extends ResourceProvider<Mention[]> {
  filter(query?: string): void;
  recordMentionSelection(mention: Mention): void;
  shouldHighlightMention(mention: Mention): boolean;
}

export interface PresenceProvider extends ResourceProvider<PresenceUpdate> {
  refreshPresence(arrayOfIds: string[]): void;
}

const emptySecurityProvider = () => {
  return {
    params: {},
    headers: {},
  };
};

const buildUrl = (baseUrl: string, path: string | undefined, data: KeyValues, secOptions: SecurityOptions) => {
  const searchParam = new URLSearchParams();
  for (const key in data) { // eslint-disable-line no-restricted-syntax
    if ({}.hasOwnProperty.call(data, key)) {
      searchParam.append(key, data[key]);
    }
  }
  if (secOptions && secOptions.params) {
    for (const key in secOptions.params) { // eslint-disable-line no-restricted-syntax
      if ({}.hasOwnProperty.call(secOptions.params, key)) {
        const values = secOptions.params[key];
        if (Array.isArray(values)) {
          for (let i = 0; i < values.length; i++) {
            searchParam.append(key, values[i]);
          }
        } else {
          searchParam.append(key, values);
        }
      }
    }
  }
  let seperator = '';
  if (baseUrl.substr(-1) !== '/') {
    seperator = '/';
  }
  return `${baseUrl}${seperator}${path}?${searchParam.toString()}`;
};

const buildHeaders = (secOptions: SecurityOptions) => {
  const headers = new Headers();
  if (secOptions && secOptions.headers) {
    for (const key in secOptions.headers) { // eslint-disable-line no-restricted-syntax
      if ({}.hasOwnProperty.call(secOptions.headers, key)) {
        const values = secOptions.headers[key];
        if (Array.isArray(values)) {
          for (let i = 0; i < values.length; i++) {
            headers.append(key, values[i]);
          }
        } else {
          headers.append(key, values);
        }
      }
    }
  }

  return headers;
};

/**
 * @returns Promise containing the json response
 */
const requestService = <T>(baseUrl: string, path: string | undefined, data: KeyValues, opts: KeyValues,
                        secOptions: SecurityOptions, refreshedSecurityProvider?: RefreshSecurityProvider): Promise<T> => {
  const url = buildUrl(baseUrl, path, data, secOptions);
  const headers = buildHeaders(secOptions);
  const options = {
    ...opts,
    ...{ headers },
    credentials: 'include' as RequestCredentials,
  };
  return fetch(new Request(url, options))
    .then((response: Response) => {
      if (response.ok) {
        return response.json<T>();
      } else if (response.status === 401 && refreshedSecurityProvider) {
        // auth issue - try once
        debug('401 attempting a forced refresh from securityProvider');
        return refreshedSecurityProvider().then(newSecOptions => (
          requestService<T>(baseUrl, path, data, opts, newSecOptions)
        ));
      }
      return Promise.reject<T>({
        code: response.status,
        reason: response.statusText,
      });
    });
};

class AbstractResource<Result> implements ResourceProvider<Result> {

  protected changeListeners: Map<string, ResultCallback<Result>>;
  protected errListeners: Map<string, ErrorCallback>;
  protected infoListeners: Map<string, InfoCallback>;

  constructor() {
    this.changeListeners = new Map<string, ResultCallback<Result>>();
    this.errListeners = new Map<string, ErrorCallback>();
    this.infoListeners = new Map<string, InfoCallback>();
  }

  subscribe(key: string, callback?: ResultCallback<Result>, errCallback?: ErrorCallback, infoCallback?: InfoCallback): void {
    if (callback) {
      this.changeListeners.set(key, callback);
    }
    if (errCallback) {
      this.errListeners.set(key, errCallback);
    }
    if (infoCallback) {
      this.infoListeners.set(key, infoCallback);
    }
  }

  unsubscribe(key: string): void {
    this.changeListeners.delete(key);
    this.errListeners.delete(key);
    this.infoListeners.delete(key);
  }
}

class AbstractPresenceResource extends AbstractResource<PresenceUpdate> {
  // eslint-disable-next-line class-methods-use-this
  refreshPresence(arrayOfIds: string[]): void {
    throw new Error(`not yet implemented.\nParams: arrayOfIds=${arrayOfIds}`);
  }

  protected notifyListeners(presences: PresenceUpdate): void {
    this.changeListeners.forEach((listener, key) => {
      try {
        listener(presences);
      } catch (e) {
        // ignore error from listener
        debug(`error from listener '${key}', ignoring`, e);
      }
    });
  }
}

class AbstractMentionResource extends AbstractResource<Mention[]> implements MentionProvider {

  shouldHighlightMention(mention: Mention): boolean {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  filter(query?: string): void {
    throw new Error(`not yet implemented.\nParams: query=${query}`);
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  recordMentionSelection(mention: Mention): void {
    // Do nothing
  }

  protected _notifyListeners(mentionsResult: MentionsResult): void {
    debug('ak-mention-resource._notifyListeners',
      mentionsResult && mentionsResult.mentions && mentionsResult.mentions.length,
      this.changeListeners);

    this.changeListeners.forEach((listener, key) => {
      try {
        listener(mentionsResult.mentions);
      } catch (e) {
        // ignore error from listener
        debug(`error from listener '${key}', ignoring`, e);
      }
    });
  }

  protected _notifyErrorListeners(error: Error): void {
    this.errListeners.forEach((listener, key) => {
      try {
        listener(error);
      } catch (e) {
        // ignore error from listener
        debug(`error from listener '${key}', ignoring`, e);
      }
    });
  }

  protected _notifyInfoListeners(info: string): void {
    this.infoListeners.forEach((listener, key) => {
      try {
        listener(info);
      } catch (e) {
        // ignore error fromr listener
        debug(`error from listener '${key}', ignoring`, e);
      }
    });
  }
}

/**
 * Provides a Javascript API
 */
class MentionResource extends AbstractMentionResource {

  private config: MentionResourceConfig;
  private lastReturnedSearch: number;

  constructor(config: MentionResourceConfig) {
    super();

    if (!config.url) {
      throw new Error('config.url is a required parameter');
    }

    this.config = config;
    this.lastReturnedSearch = 0;
  }

  shouldHighlightMention(mention: Mention) {
    if (this.config.shouldHighlightMention) {
      return this.config.shouldHighlightMention(mention);
    }

    return false;
  }

  filter(query?: string): void {
    const searchTime = Date.now();
    const notify = (mentionResult: MentionsResult) => {
      if (searchTime > this.lastReturnedSearch) {
        this.lastReturnedSearch = searchTime;
        this._notifyListeners(mentionResult);
      } else {
        const date = new Date(searchTime).toISOString().substr(17, 6);
        debug('Stale search result, skipping', date, query); // eslint-disable-line no-console, max-len
      }
    };

    if (!query) {
      this.initialState().then(notify, error => this._notifyErrorListeners(error));
    } else {
      this.search(query).then(notify, error => this._notifyErrorListeners(error));
    }
  }

  recordMentionSelection(mention: Mention): Promise<void> {
    return this.recordSelection(mention).then(() => {}, error => debug(`error recording mention selection: ${error}`, error));
  }

  /**
   * Returns the initial mention display list before a search is performed for the specified
   * container.
   *
   * @param containerId
   * @returns Promise
   */
  private initialState(): Promise<MentionsResult> {
    const secOptions = this.config.securityProvider ? this.config.securityProvider() : emptySecurityProvider();
    const refreshedSecurityProvider = this.config.refreshedSecurityProvider;
    const data: KeyValues = {};
    const options: KeyValues = {};

    if (this.config.containerId) {
      data['containerId'] = this.config.containerId;
    }

    if (this.config.productId) {
      data['productIdentifier'] = this.config.productId;
    }

    return requestService<MentionsResult>(this.config.url, 'bootstrap', data, options, secOptions, refreshedSecurityProvider);
  }

  private search(query: string): Promise<MentionsResult> {
    const secOptions = this.config.securityProvider ? this.config.securityProvider() : emptySecurityProvider();
    const refreshedSecurityProvider = this.config.refreshedSecurityProvider;
    const data = {
      query,
    };
    const options = {};
    if (this.config.containerId) {
      data['containerId'] = this.config.containerId;
    }

    if (this.config.productId) {
      data['productIdentifier'] = this.config.productId;
    }

    return requestService<MentionsResult>(this.config.url, 'search', data, options, secOptions, refreshedSecurityProvider);
  }

  private recordSelection(mention: Mention): Promise<void> {
    const secOptions = this.config.securityProvider ? this.config.securityProvider() : emptySecurityProvider();
    const refreshedSecurityProvider = this.config.refreshedSecurityProvider;
    const data = {
      selectedUserId: mention.id,
    };
    const options = {
      method: 'POST',
    };

    if (this.config.productId) {
      data['productIdentifier'] = this.config.productId;
    }

    return requestService<void>(this.config.url, 'record', data, options, secOptions, refreshedSecurityProvider);
  }
}

export { AbstractResource, AbstractMentionResource, AbstractPresenceResource };
export default MentionResource;
