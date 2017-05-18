/* tslint:disable:no-unused-expression */
import {expect} from 'chai';
import * as sinon from 'sinon';
import createRequest from '../src/services/util/createRequest';

let fakeXhr;
let myFakeResponses;

describe('createRequest()', () => {

  beforeEach(() => {
    myFakeResponses = [];
    fakeXhr = sinon.useFakeXMLHttpRequest();
    fakeXhr.onCreate = res => myFakeResponses.push(res);
  });

  afterEach(() => {
    fakeXhr.restore();
  });

  it('should send the client ID and auth token', () => {
    const tokenProvider = sinon.stub().returns(Promise.resolve('ABCD'));

    const request = createRequest({
      clientId: '1234',
      config: {
        tokenProvider,
        serviceHost: 'http://example.com'
      }
    });

    setTimeout(() => myFakeResponses[0].respond(200), 0);

    return request({url: '/some-api/links'}).then(json => {
      expect(tokenProvider.calledOnce).to.be.true;
      expect(myFakeResponses[0].url).to.equal('http://example.com/some-api/links');
      expect(myFakeResponses[0].requestHeaders['X-Client-Id']).to.equal('1234');
      expect(myFakeResponses[0].requestHeaders['Authorization']).to.equal('Bearer ABCD');
    });

  });

});
