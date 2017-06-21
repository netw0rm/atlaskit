import {FileDetails, LinkDetails, UrlPreview} from '@atlaskit/media-core';
import {AppCardModel} from '../app';

export function isAppCardModel(model?: FileDetails | LinkDetails | UrlPreview | AppCardModel): model is AppCardModel {
  return Boolean(model) && (model as AppCardModel).title !== undefined;
}
