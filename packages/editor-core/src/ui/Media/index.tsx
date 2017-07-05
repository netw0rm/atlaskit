import * as React from 'react';
import { PureComponent } from 'react';
import MediaComponent from './MediaComponent';
import { EventHandlers } from '../Renderer';
import { MediaType } from '../../schema';
import { CardDimensions } from '@atlaskit/media-card';
import { ImageResizeMode } from '@atlaskit/media-core';
import {
  default as ProviderFactory,
  WithProviders
} from '../../providerFactory';

export interface MediaProps {
  id: string;
  providers?: ProviderFactory;
  eventHandlers?: EventHandlers;
  type: MediaType;
  collection: string;
  cardDimensions?: CardDimensions;
  resizeMode?: ImageResizeMode;
}

const noop = () => {};

export default class Media extends PureComponent<MediaProps, {}> {
  private providerFactory: ProviderFactory;

  constructor(props) {
    super(props);
    this.providerFactory = props.providers || new ProviderFactory();
  }

  componentWillUnmount() {
    if (!this.props.providers) {
      // new ProviderFactory is created if no `providers` has been set
      // in this case when component is unmounted it's safe to destroy this providerFactory
      this.providerFactory.destroy();
    }
  }

  private renderWithProvider = (providers) => {
    const { eventHandlers, id, type, collection, cardDimensions, resizeMode } = this.props;
    const actionHandlers = {};

    if (eventHandlers) {
      ['onClick', 'onDelete'].forEach(handler => {
        actionHandlers[handler] = eventHandlers[handler] || noop;
      });
    }

    return (
      <MediaComponent
        id={id}
        mediaProvider={providers.mediaProvider}
        type={type}
        collection={collection}
        cardDimensions={cardDimensions}
        resizeMode={resizeMode}
        onDelete={actionHandlers['onDelete']}
        onClick={actionHandlers['onClick']}
      />
    );
  }

  render() {
    return (
      <WithProviders
        providers={['mediaProvider']}
        providerFactory={this.providerFactory}
        renderNode={this.renderWithProvider}
      />
    );
  }
}
