import {readBlob} from './util/blobReader';
import createRequest, {CreateRequestFunc} from './util/createRequest';
import {ArtifactName, FileItem, isFileItem, MediaItem} from '../';
import {AuthProvider} from '../auth';

export type DataUri = string;
export type ImageResizeMode = 'crop' | 'fit' | 'full-fit';

export interface DataUriService {
  fetchOriginalDataUri(mediaItem: MediaItem): Promise<DataUri>;
  fetchImageDataUri(mediaItem: MediaItem, width: number, height: number, mode?: ImageResizeMode): Promise<DataUri>;
  fetchThumbnailDataUri(mediaItem: MediaItem, options?: FetchThumbnailOptions): Promise<DataUri>;
}

export type ThumbnailSize = 'normal' | 'large';
export interface FetchThumbnailOptions {
  readonly size?: ThumbnailSize;
}

const MAX_AGE = 3600;

export class MediaDataUriService implements DataUriService {
  private readonly request: CreateRequestFunc;

  constructor(
    private readonly authProvider: AuthProvider,
    private readonly serviceHost: string,
    private readonly collectionName?: string) {
    this.request = createRequest({
      config: {
        serviceHost: this.serviceHost,
        authProvider: this.authProvider
      },
      collectionName: this.collectionName
    });
  }

  fetchOriginalDataUri(mediaItem: MediaItem): Promise<DataUri> {
    return this.fetchSomeDataUri(
      `/file/${mediaItem.details.id}/binary`, {
        'max-age': MAX_AGE,
        collection: this.collectionName
      });
  }

  fetchImageDataUri(mediaItem: MediaItem, width: number, height: number, mode: ImageResizeMode = 'crop'): Promise<DataUri> {
    return this.fetchSomeDataUri(
      `/file/${mediaItem.details.id}/image`, {
        width,
        height,
        mode,
        'max-age': MAX_AGE,
        collection: this.collectionName
      });
  }

  fetchThumbnailDataUri(mediaItem: MediaItem, options?: FetchThumbnailOptions): Promise<DataUri> {
    if (isFileItem(mediaItem)) {
      return this.fetchFileThumbnailUrl(mediaItem, options)
        .then((url) => this.fetchSomeDataUri(url, {
          'max-age': MAX_AGE,
          collection: this.collectionName
        }));
    } else {
      return Promise.reject(new Error('not yet implemented'));
    }
  }

  private fetchSomeDataUri(url: string, params: Object): Promise<DataUri> {
    return this.request({
      url,
      params,
      responseType: 'image'
    })
      .then(readBlob);
  }

  private fetchFileThumbnailUrl({details}: FileItem, options: FetchThumbnailOptions = {}): Promise<string> {
    const artifactName = this.mapFileThumbnailSizeToArtifactName(options.size);
    const artifact = details.artifacts && details.artifacts[artifactName];
    if (artifact) {
      return Promise.resolve(artifact.url);
    } else {
      return Promise.reject(new Error('no thumbnail is available for this file'));
    }
  }

  private mapFileThumbnailSizeToArtifactName(size?: ThumbnailSize): ArtifactName {
    switch (size) {
      case 'large':
        return 'thumb_large.jpg';
      default:
        return 'thumb.jpg';
    }
  }
}
