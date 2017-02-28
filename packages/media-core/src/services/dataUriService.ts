import axios from 'axios';
import { MediaItem, JwtTokenProvider } from '../';
import { DataUri } from '../index';

export interface DataUriService {
  fetchOriginalDataUri(mediaItem: MediaItem): Promise<DataUri>;
  fetchImageDataUri(mediaItem: MediaItem, width: number, height: number): Promise<DataUri>;
}

export class MediaDataUriService implements DataUriService {
  constructor(
    private readonly clientId: string,
    private readonly serviceHost: string,
    private readonly tokenProvider: JwtTokenProvider,
    private readonly collectionName?: string) {
  }

  fetchOriginalDataUri(mediaItem: MediaItem): Promise<DataUri> {
    return this.fetchSomeDataUri(
      `/file/${mediaItem.details.id}/binary`, {
        'max-age': 3600,
        collection: this.collectionName
      });
  }

  fetchImageDataUri(mediaItem: MediaItem, width: number, height: number): Promise<DataUri> {
    return this.fetchSomeDataUri(
      `/file/${mediaItem.details.id}/image`, {
        width,
        height,
        mode: 'crop',
        'max-age': 3600,
        collection: this.collectionName
      });
  }

  private fetchSomeDataUri(url: string, params: Object): Promise<DataUri> {
    return this.tokenProvider(this.collectionName).then(token => {
      return Promise.resolve(axios.get(url, {
        baseURL: this.serviceHost,
        responseType: 'blob',
        params,
        headers: {
          'X-Client-Id': this.clientId,
          'Authorization': `Bearer ${token}`
        }
      }))
        .then(response => response.data)
        .then(this.readBlob);
    });
  }

  private readBlob(blob: Blob): Promise<DataUri> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.addEventListener('load', () => resolve(reader.result));
      reader.addEventListener('error', () => reject(reader.error));

      reader.readAsDataURL(blob);
    });
  }
}
