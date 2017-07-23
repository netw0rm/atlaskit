import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/defer';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/publishLast';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/takeWhile';

import {FileItem, MediaApiConfig, MediaItem} from '../';
import {FileService, MediaFileService} from '../services/fileService';
import {LRUCache} from 'lru-fast';


export const FILE_PROVIDER_RETRY_INTERVAL = 2000;

export interface FileProvider {
  observable(): Observable<FileItem>;
}

export class FileProvider {
  public static fromMediaApi(config: MediaApiConfig,
                             cache: LRUCache<string, MediaItem>,
                             fileId: string,
                             clientId: string,
                             collection?: string,
                             pollInterval?: number): FileProvider {
    return FileProvider.fromFileService(
      new MediaFileService(config, cache),
      fileId,
      clientId,
      collection,
      pollInterval);
  }

  public static fromFileService(fileService: FileService,
                                fileId: string,
                                clientId: string,
                                collectionName?: string,
                                pollInterval?: number): FileProvider {
    return {
      observable() {
        const fileItemRequest$ = Observable.defer(
          () => fileService.getFileItem(fileId, clientId, collectionName)
        );

        const fileMetadata$ = Observable.timer(0, 1000)
          .switchMapTo(fileItemRequest$)
          .takeWhile(fileItem => fileItem.details.processingStatus === 'pending')
          .concat(fileItemRequest$)
          .publishLast();

        fileMetadata$.connect();

        return fileMetadata$;
      }
    };
  }
}
