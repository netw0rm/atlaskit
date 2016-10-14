// IE, Safari, Mobile Chrome, Mobile Safari
// import URLSearchParams from 'url-search-params';

import Promise from 'babel-runtime/core-js/promise';
import 'whatwg-fetch';


// 'whatwg-fetch' needs a Promise polyfill
if (!window.Promise) {
  window.Promise = Promise;
}

const buildUrl = (baseUrl, path, data, secOptions) => {
  const searchParam = new URLSearchParams();
  // remove undefined keys from data object
  Object.keys(data).forEach(key =>
    data[key] === undefined && delete data[key]
  );
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

// Returns a Promise containing the json response
const requestService = (baseUrl, path, data, secOptions) => {
  const url = buildUrl(baseUrl, path, data, secOptions);
  const headers = buildHeaders(secOptions);
  return fetch(new Request(url, { headers }))
    .then((response) => {
      if (!response.ok) {
        return Promise.reject({
          code: response.status,
          reason: response.statusText,
        });
      }
      return response.json().then((json) => {
        if (!json.values.length) {
          return Promise.reject({
            code: 404,
            reason: 'Not found',
          });
        }
        return json.values[0];
      });
    });
};

class ProfileCardResource {
  constructor(config) {
    if (!config.url) {
      throw new Error('config.url is a required parameter');
    }
    if (!config.securityProvider) {
      throw new Error('config.securityProvider is a required parameter');
    }

    this._config = config;
  }

  _get(options) {
    const secOptions = this._config.securityProvider();

    return requestService(this._config.url, 'user', options, secOptions);
  }
}

export default ProfileCardResource;
