import 'es6-promise/auto'; // 'whatwg-fetch' needs a Promise polyfill
import 'whatwg-fetch';
import * as fetchMock from 'fetch-mock/src/client';

import { requestService } from '../../src/serviceUtils';
import { RefreshSecurityProvider, RequestServiceOptions, SecurityProvider, ServiceConfig } from '../../src/types';

const url = 'http://cheese';
const defaultResponse = {
  cheese: 'cheddar'
};

const securityProvider: SecurityProvider = () => ({
  params: {
    bacon: 'nice'
  },
  headers: {
    'X-Cheese': 'american',
  }
});

const refreshedSecurityProvider: RefreshSecurityProvider = () => (
  Promise.resolve({
    params: {
      bacon: 'crispy'
    },
    headers: {
      'X-Cheese': 'swiss',
    }
  })
);

describe('requestService', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('minimal config/params', () => {
    fetchMock.mock({
      matcher: `begin:${url}`,
      response: defaultResponse,
    });
    const serviceConfig: ServiceConfig = {
      url
    };
    return requestService(serviceConfig).then(response => {
      expect(response).toEqual(defaultResponse);
    });
  });

  it('max config/params', () => {
    fetchMock.mock({
      matcher: `begin:${url}`,
      response: defaultResponse,
      name: 'request'
    });
    const serviceConfig: ServiceConfig = {
      url,
      securityProvider,
      refreshedSecurityProvider,
    };
    const options: RequestServiceOptions = {
      path: 'burger',
      queryParams: {
        sauce: 'tomato',
      },
      requestInit: {
        method: 'POST'
      }
    };
    return requestService(serviceConfig, options).then(response => {
      expect(response).toEqual(defaultResponse);
      const calls = fetchMock.calls('request');
      expect(calls.length).toBe(1);
      const { url, headers, method } = calls[0][0];
      const xCheeseHeader = headers.map['x-cheese'];
      expect(xCheeseHeader).not.toBe(undefined);
      expect(xCheeseHeader).toBe('american');
      expect(url.indexOf(url)).toBe(0);
      expect(url.indexOf('sauce=tomato') >= 0).toBe(true);
      expect(url.indexOf('bacon=nice') >= 0).toBe(true);
      expect(method).toBe('POST');
    });
  });

  it('retry on 401/no refresh support', () => {
    fetchMock.mock({
      matcher: `begin:${url}`,
      response: 401,
      name: 'request',
    });
    const serviceConfig: ServiceConfig = {
      url
    };
    return requestService(serviceConfig).catch(error => {
      const calls = fetchMock.calls('request');
      expect(calls.length).toBe(1);
      expect(error.code).toBe(401);
    });
  });

  it('retry on 401/refresh support', () => {
    fetchMock.mock({
      matcher: `begin:${url}`,
      response: 401,
      name: '401',
      times: 1
    }).mock({
      matcher: `begin:${url}`,
      response: defaultResponse,
      name: 'request'
    });
    const serviceConfig: ServiceConfig = {
      url,
      securityProvider,
      refreshedSecurityProvider,
    };
    return requestService(serviceConfig).then(response => {
      const refreshCalls = fetchMock.calls('request');
      expect(refreshCalls.length).toBe(1);
      const { url, headers } = refreshCalls[0][0];

      const xCheeseHeader = headers.map['x-cheese'];
      expect(xCheeseHeader).not.toBe(undefined);
      expect(xCheeseHeader).toBe('swiss');
      expect(url.indexOf(url)).toBe(0);
      expect(url.indexOf('bacon=crispy') >= 0).toBe(true);
    });
  });
});
