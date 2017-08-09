import * as React from 'react';
import { CardEvent } from '@atlaskit/media-card';
import { PureComponent, SyntheticEvent } from 'react';
import { Schema } from '../../prosemirror';
import ProviderFactory from '../../providerFactory';
import {
  ReactSerializer,
  renderDocument,
} from '../../renderer';
import { defaultSchema } from '../../schema';

export type MentionEventHandler = (mentionId: string, text: string, event?: SyntheticEvent<HTMLSpanElement>) => void;
export type CardEventClickHandler = (result: CardEvent) => void;

export interface MentionEventHandlers {
  onClick?: MentionEventHandler;
  onMouseEnter?: MentionEventHandler;
  onMouseLeave?: MentionEventHandler;
}

export interface EventHandlers {
  mention?: MentionEventHandlers;
  media?: {
    onClick?: CardEventClickHandler;
  };
}

export interface Props {
  document: any;
  dataProviders?: ProviderFactory;
  eventHandlers?: EventHandlers;
  schema?: Schema<any, any>;
}

export interface State {
  portal?: HTMLElement;
}

export default class Renderer extends PureComponent<Props, State> {
  private providerFactory: ProviderFactory;
  state: State = {};

  constructor(props: Props) {
    super(props);
    this.providerFactory = props.dataProviders || new ProviderFactory();
  }

  render() {
    const {
      document,
      eventHandlers,
      schema,
    } = this.props;

    const serializer = new ReactSerializer(this.providerFactory, eventHandlers, this.state.portal);

    return (
      <div>
        {renderDocument(document, serializer, schema || defaultSchema)}
        <div ref={this.handlePortalRef}/>
      </div>
    );
  }

  componentWillUnmount() {
    const { dataProviders } = this.props;

    // if this is the ProviderFactory which was created in constructor
    // it's safe to destroy it on Renderer unmount
    if (!dataProviders) {
      this.providerFactory.destroy();
    }
  }

  private handlePortalRef = (elem: HTMLElement | null) => {
    this.setState({ portal: elem || undefined });
  }
}
