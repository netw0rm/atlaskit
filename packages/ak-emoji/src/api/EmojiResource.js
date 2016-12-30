import URLSearchParams from 'url-search-params'; // IE, Safari, Mobile Chrome, Mobile Safari
import 'es6-promise/auto'; // 'whatwg-fetch' needs a Promise polyfill
import 'whatwg-fetch';

import debug from '../internal/logger';

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

const nonRejectingPromise = (promise, rejectValue) => (
  promise.catch((err) => {
    debug('Promise failed, resolving with default value instead. Err:', err);
    return Promise.resolve(rejectValue);
  })
);

const emojiRequest = (provider) => {
  const { url, securityProvider, refreshedSecurityProvider } = provider;
  const secOptions = securityProvider && securityProvider();
  const emojiPromise = requestService(url, '', null, null, secOptions, refreshedSecurityProvider);
  return nonRejectingPromise(emojiPromise, []);
};

export default class EmojiResource {

  /**
   *
   * @param {Object} config = {
   *   url: string (required), the base url of the emoji service. the service
   *     supported storage and retrieval of emoji used for the frequently used
   *     functionality. Paths:
   *     - {url}/frequent (get)
   *     - {url}/record (post)
   *
   *   securityProvider: function (required),
   *     a function returning an object with headers and/or params, e.g.
   *      { headers: {
   *          key1: [values],
   *          key2: value,
   *        },
   *        params: {
   *          key1: [values],
   *          key2: value,
   *        }
   *      }
   *
   *   refreshedSecurityProvider: a function returning a promise to a
   *     securityProvider that has just been forcibly refreshed with a
   *     new token. Will be used for single retry per request if a 401
   *     is returned. (optional)
   *
   *   providers: [...], an array of provider definitions. The order specified
   *     will represent the order categories and emojis are rendered in the picker.
   * }
   *
   * A provider is of the form: {
   *   url: the url that returns the emoji configuration
   *
   *   securityProvider: if authentication is required. as above.
   *
   *   refreshedSecurityProvider: if a retry should be performed on 401. as above.
   * }
   */
  constructor(config) {
    this.config = config;
  }

  /**
   * Returns a promise with an array of Emoji from all providers.
   */
  loadAllEmoji() {
    const emojiPromises = [];
    this.config.providers.forEach((provider) => {
      emojiPromises.push(emojiRequest(provider));
    });
    debug('EmojiResource.loadAllEmoji waiting for', emojiPromises.length, 'promises');
    return Promise.all(emojiPromises).then((emojiSets) => {
      let allEmoji = [];
      emojiSets.forEach((emojis) => {
        allEmoji = allEmoji.concat(emojis);
      });
      return Promise.resolve(allEmoji);
    });
  }

  recordEmojiSelection(shortcut) {
    const secOptions = this.config.securityProvider();
    const refreshedSecurityProvider = this.config.refreshedSecurityProvider;
    const data = {
      emoji: shortcut,
    };
    const options = {
      method: 'POST',
    };
    return requestService(this.config.url, 'record', data, options, secOptions, refreshedSecurityProvider);
  }
}
