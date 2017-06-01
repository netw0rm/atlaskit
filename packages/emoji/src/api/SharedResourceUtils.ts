import * as URL from 'url';

import debug from '../util/logger';

export interface KeyValues {
  [index: string]: any;
}

export interface SecurityOptions {
  params?: KeyValues;
  headers?: KeyValues;
}

/**
 * Returns a promise to a SecurityOptions that has just been forcibly refreshed with a
 * new token. Will be used for single retry per request if a 401 is returned.
 */
export interface RefreshSecurityProvider {
  (): Promise<SecurityOptions>;
}

/**
 * Returns the current SecurityOptions for the mentions service.
 */
export interface SecurityProvider {
  (): SecurityOptions;
}

export interface ServiceConfig {
  url: string;
  securityProvider?: SecurityProvider;
  refreshedSecurityProvider?: RefreshSecurityProvider;
}

const buildUrl = (baseUrl: string, path: string | undefined, data: KeyValues, secOptions: SecurityOptions | undefined): string => {
  const searchParam = new URLSearchParams(URL.parse(baseUrl).search || undefined);
  baseUrl = baseUrl.split('?')[0];
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
  if (path && baseUrl.substr(-1) !== '/') {
    seperator = '/';
  }
  let params = searchParam.toString();
  if (params) {
    params = '?' + params;
  }

  return `${baseUrl}${seperator}${path}${params}`;
};

const buildHeaders = (secOptions?: SecurityOptions): Headers => {
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
export const requestService = (baseUrl: string, path: string | undefined, data: KeyValues, opts: KeyValues,
                        secOptions: SecurityOptions | undefined, refreshedSecurityProvider?: RefreshSecurityProvider) => {
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
