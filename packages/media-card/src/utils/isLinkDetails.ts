import {MediaItemDetails, UrlPreview} from '@atlaskit/media-core';

export const isLinkDetails = (metadata?: MediaItemDetails): metadata is UrlPreview => {
  return Boolean(metadata) && (metadata as UrlPreview).url !== undefined;
};
