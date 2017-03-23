import {expect} from 'chai';
import * as sinon from 'sinon';
import createRequest from '../src/services/util/createRequest';

let fakeXhr;
let fakeResponses;

describe('createRequest()', () => {

  beforeEach(() => {
    fakeResponses = [];
    fakeXhr = sinon.useFakeXMLHttpRequest();

    fakeXhr.onCreate = res => {
      fakeResponses.push(res);
    };

  });

  it('should send the client ID and auth token', () => {

    const request = createRequest({
      clientId: '1234',
      config: {
        tokenProvider: sinon.stub().returns(Promise.resolve('ABCD')),
        serviceHost: 'http://example.com'
      }
    });

    const promise = request({url: '/some-api/links'})
      .then(json => {
        expect(fakeResponses[0].requestHeaders['X-Client-Id']).to.equal('1234');
        expect(fakeResponses[0].requestHeaders['Authorization']).to.equal('Bearer ABCD');
        expect(fakeResponses[0].url).to.equal('http://example.com/some-api/links');
      })
    ;

    setTimeout(() => {
      fakeResponses[0].respond(200);
    }, 0);

    return promise;
  });

});
