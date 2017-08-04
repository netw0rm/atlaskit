import {MediaItemType, MediaType} from '@atlaskit/media-core';

export interface MediaIdentifier {
  readonly mediaItemType: MediaItemType;
  readonly id: string;
  readonly collectionName: string;
  readonly mediaType?: MediaType;
}
