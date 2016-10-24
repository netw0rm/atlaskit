import URLSearchParams from 'url-search-params'; // IE, Safari, Mobile Chrome, Mobile Safari
import Promise from 'babel-runtime/core-js/promise';
// 'whatwg-fetch' needs a Promise polyfill
/* eslint-disable import/imports-first */
if (!window.Promise) {
  window.Promise = Promise;
}
import 'whatwg-fetch';

import debug from '../util/logger';
/* eslint-enable import/imports-first */


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
const requestService = (baseUrl, path, data, opts, secOptions) => {
  const url = buildUrl(baseUrl, path, data, secOptions);
  const headers = buildHeaders(secOptions);
  const options = Object.assign({}, opts, { headers });
  return fetch(new Request(url, options))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject({
        code: response.status,
        reason: response.statusText,
      });
    });
};

class AbstractMentionResource {

  constructor() {
    this._changeListeners = new Map();
    this._errListeners = new Map();
  }

  subscribe(key, callback, errCallback) {
    if (callback) {
      this._changeListeners.set(key, callback);
    }
    if (errCallback) {
      this._errListeners.set(key, errCallback);
    }
  }

  unsubscribe(key) {
    this._changeListeners.delete(key);
    this._errListeners.delete(key);
  }

  // eslint-disable-next-line class-methods-use-this
  filter(query) {
    throw new Error(`not yet implemented.\nParams: query=${query}`);
  }

  // eslint-disable-next-line class-methods-use-this
  recordMentionSelection(mention) {
    throw new Error(`not yet implemented.\nParams: selectedUserId=${mention.id}`);
  }

  _notifyListeners(mentions) {
    debug('pf-mention-resource._notifyListeners',
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


}

/**
 * Provides a Javascript API
 */
class MentionResource extends AbstractMentionResource {

  /*
   * FIXME: Issues:
   * - can organisationId be inferred from the securityProvider (on the service side)? Currently
   *   assuming it's just returned.
   * - parameter terminology - using
   *   https://extranet.atlassian.com/display/PRODUCT/Product+Fabric+Terminology - do we need to
   *   fix mentions service?
   */

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
    this._recordSelection(mention).then(() => {}, error => debug(`error recording mention selection: ${error}`, error));
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
    const data = {};
    const options = {};

    if (this._config.containerId) {
      data.containerId = this._config.containerId;
    }
    return requestService(this._config.url, 'mentions/bootstrap', data, options, secOptions);
  }

  _search(query) {
    const secOptions = this._config.securityProvider();
    const data = {
      query,
    };
    const options = {};
    if (this._config.containerId) {
      data.containerId = this._config.containerId;
    }
    return requestService(this._config.url, 'mentions/search', data, options, secOptions);
  }

  _recordSelection(mention) {
    const secOptions = this._config.securityProvider();
    const data = {
      selectedUserId: mention.id,
    };
    const options = {
      method: 'POST',
    };
    return requestService(this._config.url, 'mentions/record', data, options, secOptions);
  }
}

export default MentionResource;
export { AbstractMentionResource };
