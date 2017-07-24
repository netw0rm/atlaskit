import { MediaDataUriService } from '../../../src/services/dataUriService';

const clientId = 'some-client-id';
const collectionName = 'some-collection-name';
const token = 'some-token';
const serviceHost = 'some-service-host';
const tokenProvider = () => Promise.resolve(token);

describe('MediaDataUriService', () => {
  const service = new MediaDataUriService(clientId, serviceHost, tokenProvider, collectionName);

  describe('fetchImageDataUri()', () => {
    it('should use "crop" resize mode as default', () => {
      const fetchSomeDataUriSpy = jest.fn();
      service.fetchSomeDataUri = fetchSomeDataUriSpy;

      service.fetchImageDataUri({type: 'file', details: {}}, 100, 100);

      expect(fetchSomeDataUriSpy.mock.calls[0][1].mode).toBe('crop');
    });

    it('should allow consumers to specify a resize mode', () => {
      const fetchSomeDataUriSpy = jest.fn();
      service.fetchSomeDataUri = fetchSomeDataUriSpy;

      service.fetchImageDataUri({type: 'file', details: {}}, 100, 100, 'full-fit');

      expect(fetchSomeDataUriSpy.mock.calls[0][1].mode).toBe('full-fit');
    });
  });
});
