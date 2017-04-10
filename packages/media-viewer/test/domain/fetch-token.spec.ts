import { expect } from 'chai';
import { fetchToken, File } from '../../src/domain/fetch-token';
import {
  defaultClientId as clientId,
  defaultCollectionName as collectionName
} from '@atlaskit/media-test-helpers';

const token = 'some-token';
const tokenProvider = () => Promise.resolve(token);

describe('fetchToken', () => {
  it('should add token and client query parameters', () =>
    new Promise<void>((resolve, reject) => {
      fetchToken(clientId, tokenProvider, collectionName)(Mocks.file)
        .then(result => {
          if (result) {
            expect(result.src).to.be.equal('http://some-api/collection/items?token=some-token&client=5a9812fc-d029-4a39-8a46-d3cc36eed7ab');
          } else {
            expect.fail('fetchToken did no return anything');
          }
        })
        .then(resolve, reject);
    }));

  it('should refresh token of pre authenticated file', () =>
    new Promise<void>((resolve, reject) => {
      fetchToken(clientId, tokenProvider, collectionName)(Mocks.authenticatedFile)
        .then(result => {
          if (result) {
            expect(result.src).to.be.equal('http://some-api/collection/items?token=some-token&client=5a9812fc-d029-4a39-8a46-d3cc36eed7ab');
          } else {
            expect.fail('fetchToken did no return anything');
          }
        })
        .then(resolve, reject);
    }));
});

class Mocks {
  static file: File = {
    get(key: 'src') {
      return 'http://some-api/collection/items';
    }
  };

  static authenticatedFile: File = {
    get(key: 'src') {
      return 'http://some-api/collection/items?token=some-old-token&client=5a9812fc-d029-4a39-8a46-d3cc36eed7ab';
    }
  };
}
