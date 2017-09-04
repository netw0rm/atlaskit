import * as sinon from 'sinon';
import createRequest from '../../src/services/util/createRequest';

let fakeXhr;
let myFakeResponses;

describe('createRequest()', () => {
  const token = 'ABC';
  const clientId = '1234';
  const serviceHost = 'http://example.com';

  beforeEach(() => {
    myFakeResponses = [];
    fakeXhr = sinon.useFakeXMLHttpRequest();
    fakeXhr.onCreate = res => myFakeResponses.push(res);
  });

  afterEach(() => {
    fakeXhr.restore();
  });

  it('should send the client ID and auth token in header fields by default', () => {
    const tokenProvider = sinon.stub().returns(Promise.resolve(token));

    const request = createRequest({
      clientId,
      config: {
        tokenProvider,
        serviceHost
      }
    });

    setTimeout(() => myFakeResponses[0].respond(200), 0);

    return request({url: '/some-api/links'}).then(json => {
      expect(tokenProvider.calledOnce).toBe(true);
      expect(myFakeResponses[0].url).toBe('http://example.com/some-api/links');
      expect(myFakeResponses[0].requestHeaders['X-Client-Id']).toBe(clientId);
      expect(myFakeResponses[0].requestHeaders['Authorization']).toBe(`Bearer ${token}`);
    });
  });

  it('should send auth arguments using queryParams when preventPreflight is true', () => {
    const tokenProvider = sinon.stub().returns(Promise.resolve(token));

    const request = createRequest({
      clientId,
      config: {
        tokenProvider,
        serviceHost
      },
      preventPreflight: true
    });

    setTimeout(() => myFakeResponses[0].respond(200), 0);

    return request({url: '/some-api/links'}).then(json => {
      expect(tokenProvider.calledOnce).toBe(true);
      expect(myFakeResponses[0].url).toMatchSnapshot();
      expect(myFakeResponses[0].requestHeaders['X-Client-Id']).toBeUndefined();
      expect(myFakeResponses[0].requestHeaders['Authorization']).toBeUndefined();
    });
  });
});
