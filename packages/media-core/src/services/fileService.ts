import axios from 'axios';
import {FileItem, MediaApiConfig, MediaItem} from '../';
import {LRUCache} from 'lru-fast';

export interface FileService {
  getFileItem(fileId: string, clientId: string, collection?: string): Promise<FileItem>;
}

export class MediaFileService implements FileService {

  constructor(private config: MediaApiConfig, private cache: LRUCache<string, MediaItem>) {}

  getFileItem(fileId: string, clientId: string, collectionName?: string): Promise<FileItem> {

    const cacheKey = [fileId, 'file'].join('-');
    const cachedValue = this.cache.get(cacheKey);

    if (cachedValue) {
      return Promise.resolve(cachedValue);
    } else {
      return this.config.tokenProvider(collectionName)
        .then(token => {
          const params = collectionName ? {collection: collectionName} : {};

          return axios.get(`/file/${fileId}`, {
            baseURL: this.config.serviceHost,
            headers: {
              'X-Client-Id': clientId,
              'Authorization': `Bearer ${token}`
            },
            params
          })
            .then(response => response.data.data)
            .then(fileDetails => {
              const fileItem =  <FileItem> {
                type: 'file',
                details: {
                  id: fileDetails.id,
                  mediaType: fileDetails.mediaType,
                  mimeType: fileDetails.mimeType,
                  name: fileDetails.name,
                  processingStatus: fileDetails.processingStatus,
                  size: fileDetails.size,
                  artifacts: fileDetails.artifacts
                }
              };
              if (fileDetails.processingStatus === 'succeeded') {
                this.cache.set(cacheKey, fileItem);
              }
              return fileItem;
            });
        });
    }
  }
}
