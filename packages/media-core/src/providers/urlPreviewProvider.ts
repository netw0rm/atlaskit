import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import {UrlPreview, MediaApiConfig} from '../';
import {UrlPreviewService, MediaUrlPreviewService} from '../services/urlPreviewService';

export interface UrlPreviewProvider {
  observable(): Observable<UrlPreview>;
}

export class UrlPreviewProvider {

  public static fromMediaApi(config: MediaApiConfig,
                             url: string,
                             clientId: string): UrlPreviewProvider {

    return UrlPreviewProvider.fromUrlPreviewService(new MediaUrlPreviewService(config), url, clientId);
  }

  public static fromUrlPreviewService(urlPreviewService: UrlPreviewService, url: string, clientId: string): UrlPreviewProvider {
    return {
      observable() {
        const urlPreviewMetadata$ = Observable.fromPromise(
          urlPreviewService.getUrlPreview(url, clientId)
        );

        return urlPreviewMetadata$;
      }
    };
  }
}
