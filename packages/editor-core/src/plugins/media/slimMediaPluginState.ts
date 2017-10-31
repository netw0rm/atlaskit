import { MediaPluginState } from './index';
import { Identifier } from '@atlaskit/media-card';
import {
  Context,
  DefaultMediaStateManager,
  MediaProvider,
  MediaState,
  MediaStateManager,
  UploadParams,
  ContextConfig,
  ContextFactory
} from '@atlaskit/media-core';


export class SlimMediaPluginState extends MediaPluginState {
  public media: Identifier[] = [];

  insertFile = (mediaState: MediaState): void => {
    const collectionName = this.collectionFromProvider();
    if (!collectionName) {
      return;
    }

    if (!mediaState.publicId) {
      throw new Error('Media picker did not provide public id for new upload');
    }

    this.stateManager.subscribe(mediaState.id, this.handleMediaState);

    this.media.push({
      mediaItemType: 'file',
      id: mediaState.publicId!,
      collectionName
    });
  }

  insertLinks = async () => {
    // do nothing for now
    return undefined;
  }
}
