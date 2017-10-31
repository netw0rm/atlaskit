import { MediaState } from '@atlaskit/media-core';
import { default as ProviderFactory } from '../../providerFactory';
import { ErrorReporter } from '../../utils';

export type MediaPluginOptions = {
  slim?: boolean;
  providerFactory: ProviderFactory;
  errorReporter?: ErrorReporter;
  uploadErrorHandler?: (state: MediaState) => void;
  waitForMediaUpload?: boolean;
};
