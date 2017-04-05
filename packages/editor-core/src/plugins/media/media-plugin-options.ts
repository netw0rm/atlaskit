import { default as ProviderFactory } from '../../providerFactory';

export type MediaPluginBehavior = 'default' | 'compact';

export type MediaPluginOptions = {
  providerFactory: ProviderFactory;
  behavior: MediaPluginBehavior;
};
