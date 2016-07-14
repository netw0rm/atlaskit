import URLSearchParams from 'url-search-params'; // IE, Safari, Mobile Chrome, Mobile Safari

const buildUrl = (baseUrl, path, data) => {
  const searchParam = new URLSearchParams();
  for (const key in data) { // eslint-disable-line no-restricted-syntax
    if (data.hasOwnProperty(key)) {
      searchParam.append(key, data[key]);
    }
  }
  let seperator = '';
  if (baseUrl.substr(-1) !== '/') {
    seperator = '/';
  }
  return `${baseUrl}${seperator}${path}?${searchParam.toString()}`;
};

/**
 * @returns Promise containing the json response
 */
const requestService = (baseUrl, path, data) => {
  const url = buildUrl(baseUrl, path, data);
  return fetch(url)
    .then(response => {
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
    this._changeListeners = [];
    this._errListeners = [];
  }

  subscribe(callback, errCallback) {
    if (callback) {
      this._changeListeners.push(callback);
    }
    if (errCallback) {
      this._errListeners.push(errCallback);
    }
  }

  unsubscribe(callback, errCallback) {
    this._changeListeners = this._changeListeners.filter((v) => v !== callback);
    this._errListeners = this._errListeners.filter((v) => v !== errCallback);
  }

  filter(query) {
    throw new Error(`not yet implemented.\nParams: query=${query}`);
  }

  _notifyListeners(mentions) {
    this._changeListeners.forEach((listener) => {
      try {
        listener(mentions.mentions);
      } catch (e) {
        // ignore error from listener
        if (process.env.NODE_ENV === 'development') {
          console.log('error from listener, ignoring', e); // eslint-disable-line no-console
        }
      }
    });
  }

  _notifyErrorListeners(error) {
    this._errListeners.forEach((listener) => {
      try {
        listener(error);
      } catch (e) {
        // ignore error from listener
        if (process.env.NODE_ENV === 'development') {
          console.log('error from listener, ignoring', e); // eslint-disable-line no-console
        }
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
   * @param config = {
   *   url: string (required), // the base url of the mentions service
   *   securityProvider: function (required), // a function returning a security token as a
   *     String (initially just the organisationId)
   *   application: string (required), // the site, or product
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
    if (!config.application) {
      throw new Error('config.application is a required parameter');
    }

    // FIXME clone/immutable js?
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
        if (process.env.NODE_ENV === 'development') {
          const date = new Date(searchTime).toISOString().substr(17, 6);
          console.log('Stale search result, skipping', date, query); // eslint-disable-line no-console, max-len
        }
      }
    };

    // const notifyErr = (error) => {
    //   this._notifyErrorListeners(error);
    // }

    if (!query) {
      this._initialState().then(notify, (error) => this._notifyErrorListeners(error));
    } else {
      this._search(query).then(notify, (error) => this._notifyErrorListeners(error));
    }
  }

  /**
   * Returns the initial mention display list before a search is performed for the specified
   * container.
   *
   * @param containerId
   * @returns Promise
   */
  _initialState() {
    // FIXME: FAB-139
    const options = {
      query: '',
      groupId: this._config.securityProvider(),
      application: this._config.application,
    };
    if (this._config.containerId) {
      options.containerId = this._config.containerId;
    }
    return requestService(this._config.url, 'mentions/search', options);
  }

  _search(query) {
    const options = {
      query,
      groupId: this._config.securityProvider(),
      application: this._config.application,
    };
    if (this._config.containerId) {
      options.containerId = this._config.containerId;
    }
    return requestService(this._config.url, 'mentions/search', options);
  }
}

export default MentionResource;
export { AbstractMentionResource };
