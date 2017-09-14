import createRequest from './util/createRequest';
import {ArtifactName, FileDetails, FileItem, MediaApiConfig} from '../';
import {LRUCache} from 'lru-fast';

export interface FileService {
  getFileItem(fileId: string, collectionName?: string): Promise<FileItem>;
  getFileArtifactBinary(fileId: string, artifactName: ArtifactName, collectionName?: string): Promise<Blob>;
}

export class MediaFileService implements FileService {
  constructor(private config: MediaApiConfig, private fileItemCache: LRUCache<string, FileItem>) {
  }

  getFileItem(fileId: string, collectionName?: string): Promise<FileItem> {
    const cacheKey = [fileId, 'file'].join('-');
    const cachedValue = this.fileItemCache.get(cacheKey);

    if (cachedValue) {
      return Promise.resolve(cachedValue);
    } else {
      const request = createRequest({
        config: this.config,
        collectionName,
        preventPreflight: true
      });

      return request({url: `/file/${fileId}`})
        .then(json => json.data as FileDetails)
        .then(details => {
          const fileItem = {
            type: 'file',
            details
          } as FileItem;
          if (details.processingStatus === 'succeeded') {
            this.fileItemCache.set(cacheKey, fileItem);
          }
          return fileItem;
        });
    }
  }

  getFileArtifactBinary(fileId: string, artifactName: ArtifactName, collectionName?: string): Promise<Blob> {
    const request = createRequest({
      config: this.config,
      collectionName,
      preventPreflight: true
    });

    return request({
      url: `/file/${fileId}/artifact/${artifactName}/binary`,
      responseType: 'blob'
    });
  }
}
