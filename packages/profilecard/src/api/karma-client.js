import 'es6-promise/auto'; // 'whatwg-fetch' needs a Promise polyfill
import 'whatwg-fetch';

const buildHeaders = () => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return headers;
};

const buildUrl = (baseUrl, cloudId, userId) => {
  return `${baseUrl}/${cloudId}/${userId}`;
};

/**
 * @param {string} serviceUrl - Karma service endpoint
 * @param {string} userId
 * @param {string} cloudId
 * @param {object} opts.method
 * @param {object} data
 */
const requestService = (serviceUrl, cloudId, userId, opts, data) => {
  const headers = buildHeaders();
  const url = buildUrl(serviceUrl, cloudId, userId);
  const defaultOpts = {
    method: 'GET',
    credentials: 'include' as 'include',
    mode: 'cors',
    ...{ headers },
  };
  let options = { ...defaultOpts, ...opts };
  if (data) {
    options = { ...options, body: data };
  }

  return fetch(new Request(url, options))
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
          reason: json.errors[0].category || 'default',
        });
      }

      return json.data;
    });
  });
};


class KarmaClient {
  /**
   * @param {object} config
   * @param {string} config.baseUrl
   */
  constructor(config) {
    this.config = config;
  }

  makeRequest(cloudId, userId, options, data) {
    if (!this.config.baseUrl) {
      throw new Error('config.baseUrl is a required parameter');
    }

    return requestService(this.config.baseUrl, cloudId, userId, options, data);
  }

  getKarma(cloudId, userId) {
    if (!cloudId || !userId) {
      return Promise.reject(new Error('cloudId or userId missing'));
    }

    const options = {
      method: 'GET',
    };

    return new Promise((resolve, reject) => {
      this.makeRequest(cloudId, userId, options)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  increaseKarma(cloudId, userId) {
    if (!cloudId || !userId) {
      return Promise.reject(new Error('cloudId or userId missing'));
    }

    const options = {
      method: 'POST',
    };
    const data = {
      karma: 1,
    };

    return new Promise((resolve, reject) => {
      this.makeRequest(cloudId, userId, options, data)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default KarmaClient;
