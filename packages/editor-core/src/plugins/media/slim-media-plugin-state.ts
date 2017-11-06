import { LinkIdentifier, FileIdentifier } from './../../../../media-card/src/root/card/index';
import { MediaPluginState } from './media-plugin-state';
import {
  MediaState,
} from '@atlaskit/media-core';

export type Identifier = LinkIdentifier | FileIdentifier;

export class SlimMediaPluginState extends MediaPluginState {
  public media: Identifier[] = [];

  insertFile = (mediaState: MediaState): void => {
    const collectionName = this.collectionFromProvider();
    if (!collectionName) {
      return;
    }

    this.stateManager.subscribe(mediaState.id, this.handleMediaState);

    this.media.push({
      mediaItemType: 'file',
      id: mediaState.id,
      collectionName
    });

    this.notifyPluginStateSubscribers();
    this.notifyOnChange();
  }

  insertLinks = async () => {
    // do nothing for now
    return undefined;
  }

  removeItemById = (id: string) => {
    let pos = -1;

    this.media.some((item, index) => {
      if (item.id === id) {
        pos = index;
        return true;
      }

      return false;
    });

    if (pos === -1) {
      console.warn(`Unable to remove non-existent media item ${id}`);
      return;
    }

    this.media.splice(pos, 1);
    this.notifyPluginStateSubscribers();
    this.notifyOnChange();
  }

  /**
   * Dispatch a non-updating transaction to trigger onChange()
   */
  notifyOnChange = () => {
    const { view } = this;
    view.dispatch(view.state.tr.setMeta('forceUpdate', true));
  }

  // Disable the default media d-n-d placeholder
  protected handleDrag = (dragState: 'enter' | 'leave') => {};
}
