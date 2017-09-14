jest.mock('../../src/services/util/createRequest');

import {LRUCache} from 'lru-fast';

import {FileItem} from '../../src';
import {MediaFileService} from '../../src/services/fileService';
import {CreateRequestFunc, default as createRequest} from '../../src/services/util/createRequest';

const serviceHost = 'some-host';
const clientId = 'some-client-id';
const token = 'some-token';
const authProvider = () => Promise.resolve({clientId, token});
const config = {serviceHost, authProvider};
const fileId = 'some-file-id';
const collectionName = 'some-collection';
const blob = new Blob(['hello']);
const artifactName = 'document.txt';
const succeededFileDetails = {
  id: fileId,
  mediaType: 'image',
  mimeType: 'some-mime-type',
  name: 'some-name',
  processingStatus: 'succeeded',
  size: 12345,
  artifacts: {
    'document.pdf': {href: `/file/${fileId}/artifact/document.pdf`},
    'presentation.ppt': {href: `/file/${fileId}/artifact/presentation.ppt`}
  }
};

describe('MediaFileService', () => {
  const setup = (response: Promise<any>, cacheSize = 0) => {
    const cache = new LRUCache<string, FileItem>(cacheSize);
    const request = jest.fn().mockReturnValue(response);

    (createRequest as jest.Mock<CreateRequestFunc>).mockReturnValue(request);

    const fileService = new MediaFileService(config, cache);

    return {
      request,
      fileService
    };
  };

  afterEach(function () {
    jest.resetAllMocks();
  });

  it('should resolve file item given collection is specified', async () => {
    const {fileService, request} = setup(Promise.resolve({data: succeededFileDetails}));

    await expect(fileService.getFileItem(fileId, collectionName))
      .resolves.toEqual({
        type: 'file',
        details: succeededFileDetails
      });

    expect(createRequest).toBeCalledWith({
      config,
      collectionName,
      preventPreflight: true
    });

    expect(request).toBeCalledWith({url: `/file/${fileId}`});
  });

  it('should resolve file item given NO collection is specified', async () => {
    const {fileService} = setup(Promise.resolve({data: succeededFileDetails}));

    await expect(fileService.getFileItem(fileId))
      .resolves.toEqual({
        type: 'file',
        details: succeededFileDetails
      });

    expect(createRequest).toBeCalledWith({
      config,
      collectionName: undefined,
      preventPreflight: true
    });
  });

  it('should reject given request is rejected with some error', async () => {
    const {fileService} = setup(Promise.reject('some-error'));

    await expect(fileService.getFileItem(fileId, collectionName))
      .rejects.toEqual('some-error');
  });

  describe('cache', () => {
    it('should cache processed files', async () => {
      const {fileService, request} = setup(Promise.resolve({data: succeededFileDetails}), 1);
      const fileItem = await fileService.getFileItem(fileId, collectionName);

      await expect(fileService.getFileItem(fileId, collectionName)).resolves.toEqual(fileItem);
      expect(request).toHaveBeenCalledTimes(1);
    });

    it('should not cache processed files if caching is disabled', async () => {
      const {fileService, request} = setup(Promise.resolve({data: succeededFileDetails}));
      const fileItem = await fileService.getFileItem(fileId, collectionName);

      await expect(fileService.getFileItem(fileId, collectionName)).resolves.toEqual(fileItem);
      expect(request).toHaveBeenCalledTimes(2);
    });

    it('should not cache unprocessed files', async () => {
      const pendingFileDetails = {
        ...succeededFileDetails,
        processingStatus: 'pending'
      };
      const {fileService, request} = setup(Promise.resolve({data: pendingFileDetails}), 1);
      const fileItem = await fileService.getFileItem(fileId, collectionName);

      await expect(fileService.getFileItem(fileId, collectionName)).resolves.toEqual(fileItem);
      expect(request).toHaveBeenCalledTimes(2);
    });
  });

  describe('getFileArtifactBinary', () => {
    it('should resolve with a blob', async () => {
      const {fileService} = setup(Promise.resolve(blob));

      await expect(fileService.getFileArtifactBinary(fileId, artifactName))
        .resolves.toEqual(blob);
    });

    it('should make a request to the media-api', async () => {
      const {fileService, request} = setup(Promise.resolve(blob));

      await expect(fileService.getFileArtifactBinary(fileId, artifactName, collectionName))
        .resolves.toEqual(blob);

      expect(createRequest).toBeCalledWith({
        config,
        collectionName,
        preventPreflight: true
      });

      expect(request).toBeCalledWith({
        url: `/file/${fileId}/artifact/${artifactName}/binary`,
        responseType: 'blob'
      });
    });
  });
});
