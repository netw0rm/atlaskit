import { expect } from 'chai';
import * as fetchMock from 'fetch-mock';

import { requestService, RefreshSecurityProvider, RequestServiceOptions, SecurityProvider, ServiceConfig } from '../../src/serviceUtils';

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
  beforeEach(() => {

  });

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
      expect(response).to.deep.equal(defaultResponse);
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
      expect(response).to.deep.equal(defaultResponse);
      const calls = fetchMock.calls('request');
      expect(calls.length, 'Fetch calls').to.equal(1);
      const { url, path, headers, method } = calls[0][0];
      const xCheeseHeader = headers._headers['x-cheese'];
      expect(xCheeseHeader, 'Header defined').to.not.equal(undefined);
      expect(xCheeseHeader.length, 'Header single value').to.equal(1);
      expect(xCheeseHeader[0], 'Header value').to.equal('american');
      expect(url.indexOf(url), `url starts with ${url}`).to.equal(0);
      expect(path.indexOf('sauce=tomato') >= 0, 'sauce query param').to.equal(true);
      expect(path.indexOf('bacon=nice') >= 0, 'sauce query param').to.equal(true);
      expect(method, 'method').to.equal('POST');
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
      expect(calls.length, 'Fetch calls').to.equal(1);
      expect(error.code).to.equal(401);
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
      expect(refreshCalls.length, 'Second request').to.equal(1);
      const { url, path, headers } = refreshCalls[0][0];
      const xCheeseHeader = headers._headers['x-cheese'];
      expect(xCheeseHeader, 'Header defined').to.not.equal(undefined);
      expect(xCheeseHeader.length, 'Header single value').to.equal(1);
      expect(xCheeseHeader[0], 'Header value').to.equal('swiss');
      expect(url.indexOf(url), `url starts with ${url}`).to.equal(0);
      expect(path.indexOf('bacon=crispy') >= 0, 'sauce query param').to.equal(true);
    });
  });
});
