import Promise from 'babel-runtime/core-js/promise';
// 'whatwg-fetch' needs a Promise polyfill
/* eslint-disable import/imports-first */
if (!window.Promise) {
  window.Promise = Promise;
}
import 'whatwg-fetch';
/* eslint-enable import/imports-first */


/**
 * Transform response from GraphQL
 * - Prefix `timestring` with `remoteWeekdayString` depending on `remoteWeekdayIndex`
 * - Remove properties which will be not used later
 * @ignore
 * @param  {obejct} data
 * @return {object}
 */
export const modifyResponse = (data) => {
  const localWeekdayIndex = new Date().getDay().toString();

  if (data.remoteWeekdayIndex && data.remoteWeekdayIndex !== localWeekdayIndex) {
    data.remoteTimeString = `${data.remoteWeekdayString} ${data.remoteTimeString}`;
  }

  data.timestring = data.remoteTimeString;

  delete data.remoteWeekdayIndex;
  delete data.remoteWeekdayString;
  delete data.remoteTimeString;
  delete data.id;

  return data;
};

const buildHeaders = (secOptions) => {
  const headers = new Headers();

  headers.append('Content-Type', 'application/json');

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
 * Build query string for GraphQL
 * @ignore
 * @param  {string} userId
 * @param  {string} [timeformat='h:MMa']
 * @return {string}
 */
const buildQueryString = (userId, timeformat = 'h:MMa') => {
  const fields = [
    'id',
    'fullName',
    'nickname',
    'email',
    'meta: position',
    'location',
    'companyName',
    'avatarUrl(size: 100)',
    'remoteWeekdayIndex: localTime(format: "d")',
    'remoteWeekdayString: localTime(format: "ddd")',
    `remoteTimeString: localTime(format: "${timeformat}")`,
  ];

  return `{User(id: "${userId}") {${fields.join(', ')}}}`;
};

const requestService = (baseUrl, options, secOptions) => {
  const headers = buildHeaders(secOptions);
  const query = buildQueryString(options.userId, options.timeformat);

  return fetch(new Request(baseUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query }),
  }))
  .then((response) => {
    if (!response.ok) {
      return Promise.reject({
        code: response.status,
        reason: response.statusText,
      });
    }
    return response.json().then((json) => {
      if (json.errors) {
        return Promise.reject({
          reason: json.errors[0],
        });
      }

      return modifyResponse(json.data.User);
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

    return requestService(this._config.url, options, secOptions);
  }
}

export default ProfileCardResource;
