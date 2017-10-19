import * as React from 'react';
import { PureComponent } from 'react';
import { MediaType } from '@atlaskit/editor-common';
import { CardDimensions } from '@atlaskit/media-card';
import { ImageResizeMode } from '@atlaskit/media-core';
import { EventHandlers } from '../../../../editor-core/src/ui/Renderer'; // @TODO
import { ProviderFactory } from '@atlaskit/editor-core';
import UIMedia from '../../../../editor-core/src/ui/Media'; // @TODO
import { Appearance } from '../../../../editor-core/src/ui/Media/MediaComponent'; // @TODO

export interface MediaProps {
  id: string;
  providers?: ProviderFactory;
  eventHandlers?: EventHandlers;
  type: MediaType;
  collection: string;
  cardDimensions?: CardDimensions;
  appearance?: Appearance;
  resizeMode?: ImageResizeMode;
}

export default class Media extends PureComponent<MediaProps, {}> {
  render() {
    const {
      eventHandlers,
      id,
      providers,
      type,
      collection,
      cardDimensions,
      appearance,
      resizeMode,
    } = this.props;

    return (
      <UIMedia
        id={id}
        type={type}
        collection={collection}
        providers={providers}
        onClick={eventHandlers && eventHandlers.media && eventHandlers.media.onClick}
        cardDimensions={cardDimensions}
        appearance={appearance}
        resizeMode={resizeMode}
      />
    );
  }
}
