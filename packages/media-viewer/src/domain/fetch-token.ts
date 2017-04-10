import { JwtTokenProvider } from '@atlaskit/media-core';
import * as $ from 'jquery';

export interface File {
  get(key: 'src'): string;
}

export type FetchTokenResult = {
  src: string
};

export const fetchToken =
  (clientId: string, tokenProvider: JwtTokenProvider, collectionName?: string) =>
    (originalFile: File) => {
      const source = getPathFromUrl(originalFile.get('src'));
      const deferred = $.Deferred<FetchTokenResult>();

      tokenProvider(collectionName)
        .then(token => {
          deferred.resolve({
            src: `${source}?token=${token}&client=${clientId}`
          });
        })
        .catch(deferred.reject);

      return deferred.promise();
    };

function getPathFromUrl(url: string): string {
  return url.split(/[?#]/)[0];
}
