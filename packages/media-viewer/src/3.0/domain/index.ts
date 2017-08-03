import {MediaItemType} from '@atlaskit/media-core';

export interface MediaIdentifier {
  readonly mediaItemType: MediaItemType;
  readonly id: string;
  readonly collectionName: string;
}
