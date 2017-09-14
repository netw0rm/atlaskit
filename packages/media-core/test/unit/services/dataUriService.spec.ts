jest.mock('../../../src/services/util/createRequest');

import {FileItem} from '../../../src';
import {MediaDataUriService} from '../../../src/services/dataUriService';
import {CreateRequestFunc, default as createRequest} from '../../../src/services/util/createRequest';

describe('MediaDataUriService', () => {
  const fileId = 'some-file-id';
  const clientId = 'some-client-id';
  const collectionName = 'some-collection-name';
  const token = 'some-token';
  const serviceHost = 'some-service-host';
  const authProvider = () => Promise.resolve({token, clientId});
  const fileItemWithNoThumbnails: FileItem = {
    type: 'file',
    details: {
      id: fileId,
      artifacts: {
      }
    }
  };
  const fileItemWithThumbnails: FileItem = {
    type: 'file',
    details: {
      id: fileId,
      artifacts: {
        'thumb.jpg': {
          href: '/file/some-file-id/artifact/thumb_120.jpg/binary',
          processingStatus: 'succeeded'
        },
        'thumb_large.jpg': {
          href: '/file/some-file-id/artifact/thumb_320.jpg/binary',
          processingStatus: 'succeeded'
        }
      }
    }
  };

  const setup = () => {
    const request = jest.fn().mockReturnValue(Promise.resolve(new Blob()));

    (createRequest as jest.Mock<CreateRequestFunc>).mockReturnValue(request);

    const dataUriService = new MediaDataUriService(authProvider, serviceHost, collectionName);

    return {
      request,
      dataUriService
    };
  };

  afterEach(function () {
    jest.resetAllMocks();
  });

  describe('fetchImageDataUri()', () => {
    it('should create request function', async () => {
      setup();

      expect(createRequest).toBeCalledWith({
        collectionName,
        config: {
          authProvider,
          serviceHost
        }
      });
    });

    it('should use "crop" resize mode as default', async () => {
      const {dataUriService, request} = setup();

      await dataUriService.fetchImageDataUri(fileItemWithThumbnails, 100, 100);

      expect(request).toBeCalledWith({
        url: '/file/some-file-id/image',
        params: {
          mode: 'crop',
          width: 100,
          height: 100,
          collection: 'some-collection-name',
          'max-age': 3600
        },
        responseType: 'image'
      });
    });

    it('should allow consumers to specify a resize mode', () => {
      const {dataUriService, request} = setup();

      dataUriService.fetchImageDataUri(fileItemWithThumbnails, 200, 200, 'full-fit');

      expect(request).toBeCalledWith({
        url: '/file/some-file-id/image',
        params: {
          mode: 'full-fit',
          width: 200,
          height: 200,
          collection: 'some-collection-name',
          'max-age': 3600
        },
        responseType: 'image'
      });
    });

    it('should request normal thumbnail given no size option', async () => {
      const {dataUriService, request} = setup();

      await dataUriService.fetchThumbnailDataUri(fileItemWithThumbnails);

      expect(request).toBeCalledWith({
        url: '/file/some-file-id/artifact/thumb_120.jpg/binary',
        params: {
          collection: 'some-collection-name',
          'max-age': 3600
        },
        responseType: 'image'
      });
    });

    it('should request large thumbnail given large size option', async () => {
      const {dataUriService, request} = setup();

      await dataUriService.fetchThumbnailDataUri(fileItemWithThumbnails, {size: 'large'});

      expect(request).toBeCalledWith({
        url: '/file/some-file-id/artifact/thumb_320.jpg/binary',
        params: {
          collection: 'some-collection-name',
          'max-age': 3600
        },
        responseType: 'image'
      });
    });

    it('should reject and not make any request given file item with no thumbnail artifacts', async () => {
      const {dataUriService, request} = setup();

      await expect(dataUriService.fetchThumbnailDataUri(fileItemWithNoThumbnails))
        .rejects.toMatchObject({
          message: 'no thumbnail is available for this file'
        });

      expect(request).not.toBeCalled();
    });
  });
});
