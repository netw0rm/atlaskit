import URLSearchParams from 'url-search-params'; // IE, Safari, Mobile Chrome, Mobile Safari
import 'es6-promise/auto'; // 'whatwg-fetch' needs a Promise polyfill
import 'whatwg-fetch';

import debug from '../util/logger';

const buildUrl = (baseUrl, path, data, secOptions) => {
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

const buildHeaders = (secOptions) => {
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
const requestService = (baseUrl, path, data, opts, secOptions, refreshedSecurityProvider) => {
  const url = buildUrl(baseUrl, path, data, secOptions);
  const headers = buildHeaders(secOptions);
  const options = {
    ...opts,
    ...{ headers },
  };
  return fetch(new Request(url, options))
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 401 && refreshedSecurityProvider) {
        // auth issue - try once
        debug('401 attempting a forced refresh from securityProvider');
        return refreshedSecurityProvider().then(newSecOptions => (
          requestService(baseUrl, path, data, opts, newSecOptions)
        ));
      }
      return Promise.reject({
        code: response.status,
        reason: response.statusText,
      });
    });
};

class AbstractResource {

  constructor() {
    this._changeListeners = new Map();
    this._errListeners = new Map();
    this._infoListeners = new Map();
  }

  subscribe(key, callback, errCallback, infoCallback) {
    if (callback) {
      this._changeListeners.set(key, callback);
    }
    if (errCallback) {
      this._errListeners.set(key, errCallback);
    }
    if (infoCallback) {
      this._infoListeners.set(key, infoCallback);
    }
  }

  unsubscribe(key) {
    this._changeListeners.delete(key);
    this._errListeners.delete(key);
    this._infoListeners.delete(key);
  }
}

class AbstractPresenceResource extends AbstractResource {
  // eslint-disable-next-line class-methods-use-this
  refreshPresence(arrayOfIds) {
    throw new Error(`not yet implemented.\nParams: arrayOfIds=${arrayOfIds}`);
  }

  _notifyListeners(presences) {
    this._changeListeners.forEach((listener, key) => {
      try {
        listener(presences);
      } catch (e) {
        // ignore error from listener
        debug(`error from listener '${key}', ignoring`, e);
      }
    });
  }
}

class AbstractMentionResource extends AbstractResource {

  // eslint-disable-next-line class-methods-use-this
  filter(query) {
    throw new Error(`not yet implemented.\nParams: query=${query}`);
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  recordMentionSelection(mention) {
    // Do nothing
  }

  _notifyListeners(mentions) {
    debug('ak-mention-resource._notifyListeners',
      mentions && mentions.mentions && mentions.mentions.length,
      this._changeListeners);

    this._changeListeners.forEach((listener, key) => {
      try {
        listener(mentions.mentions);
      } catch (e) {
        // ignore error from listener
        debug(`error from listener '${key}', ignoring`, e);
      }
    });
  }

  _notifyErrorListeners(error) {
    this._errListeners.forEach((listener, key) => {
      try {
        listener(error);
      } catch (e) {
        // ignore error from listener
        debug(`error from listener '${key}', ignoring`, e);
      }
    });
  }

  _notifyInfoListeners(info) {
    this._infoListeners.forEach((listener, key) => {
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

  /**
   *
   * @param {Object} config = {
   *   url: string (required), // the base url of the mentions service
   *   securityProvider: function (required),
   *   a function returning an object with headers and/or params, e.g.
   *      { headers: {
   *          key1: [values],
   *          key2: value,
   *        },
   *        params: {
   *          key1: [values],
   *          key2: value,
   *        }
   *      }
   *   containerId: string (optional)
   *   refreshedSecurityProvider: a function returning a promise to a
   *     securityProvider that has just been forcibly refreshed with a
   *     new token. Will be used for single retry per request if a 401
   *     is returned. (optional)
   * }
   *
   */
  constructor(config) {
    super();

    if (!config.url) {
      throw new Error('config.url is a required parameter');
    }
    if (!config.securityProvider) {
      throw new Error('config.securityProvider is a required parameter');
    }

    this._config = config;
    this._lastReturnedSearch = 0;
  }

  filter(query) {
    const searchTime = Date.now();
    const notify = (mentions) => {
      if (searchTime > this._lastReturnedSearch) {
        this._lastReturnedSearch = searchTime;
        this._notifyListeners(mentions);
      } else {
        const date = new Date(searchTime).toISOString().substr(17, 6);
        debug('Stale search result, skipping', date, query); // eslint-disable-line no-console, max-len
      }
    };

    if (!query) {
      this._initialState().then(notify, error => this._notifyErrorListeners(error));
    } else {
      this._search(query).then(notify, error => this._notifyErrorListeners(error));
    }
  }

  recordMentionSelection(mention) {
    return this._recordSelection(mention).then(() => {}, error => debug(`error recording mention selection: ${error}`, error));
  }

  /**
   * Returns the initial mention display list before a search is performed for the specified
   * container.
   *
   * @param containerId
   * @returns Promise
   */
  _initialState() {
    const secOptions = this._config.securityProvider();
    const refreshedSecurityProvider = this._config.refreshedSecurityProvider;
    const data = {};
    const options = {};

    if (this._config.containerId) {
      data.containerId = this._config.containerId;
    }
    return requestService(this._config.url, 'mentions/bootstrap', data, options, secOptions, refreshedSecurityProvider);
  }

  _search(query) {
    const secOptions = this._config.securityProvider();
    const refreshedSecurityProvider = this._config.refreshedSecurityProvider;
    const data = {
      query,
    };
    const options = {};
    if (this._config.containerId) {
      data.containerId = this._config.containerId;
    }
    return requestService(this._config.url, 'mentions/search', data, options, secOptions, refreshedSecurityProvider);
  }

  _recordSelection(mention) {
    const secOptions = this._config.securityProvider();
    const refreshedSecurityProvider = this._config.refreshedSecurityProvider;
    const data = {
      selectedUserId: mention.id,
    };
    const options = {
      method: 'POST',
    };
    return requestService(this._config.url, 'mentions/record', data, options, secOptions, refreshedSecurityProvider);
  }
}

export default MentionResource;
export { AbstractMentionResource, AbstractPresenceResource };
