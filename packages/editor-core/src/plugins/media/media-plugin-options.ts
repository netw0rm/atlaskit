import { MediaState } from '@atlaskit/media-core';
import { default as ProviderFactory } from '../../providerFactory';

export type MediaPluginOptions = {
  providerFactory: ProviderFactory;
  uploadErrorHandler?: (state: MediaState) => void;
};
