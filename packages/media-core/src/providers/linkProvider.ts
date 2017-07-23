import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import {LinkItem, MediaApiConfig} from '../';
import {LinkService, MediaLinkService} from '../services/linkService';

export interface LinkProvider {
  observable(): Observable<LinkItem>;
}

export class LinkProvider {
  public static fromMediaApi(config: MediaApiConfig,
                             linkId: string,
                             clientId: string,
                             collectionName?: string): LinkProvider {
    return LinkProvider.fromLinkService(
      new MediaLinkService(config),
      linkId,
      clientId,
      collectionName
    );
  }

  public static fromLinkService(linkService: LinkService,
                                linkId: string,
                                clientId: string,
                                collectionName?: string): LinkProvider {
    return {
      observable() {
        const linkMetadata$ = Observable.fromPromise(
          linkService.getLinkItem(linkId, clientId, collectionName)
        );

        return linkMetadata$;
      }
    };
  }
}
