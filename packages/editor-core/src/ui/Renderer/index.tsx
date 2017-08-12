import { CardEvent } from '@atlaskit/media-card';
import { PureComponent, SyntheticEvent } from 'react';
import { Schema } from '../../prosemirror';
import ProviderFactory from '../../providerFactory';
import {
  ReactSerializer,
  renderDocument,
  RendererContext,
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
  portal?: HTMLElement;
  rendererContext?: RendererContext;
  schema?: Schema<any, any>;
}

export default class Renderer extends PureComponent<Props, {}> {
  private providerFactory: ProviderFactory;
  private serializer: ReactSerializer;

  constructor(props: Props) {
    super(props);
    this.providerFactory = props.dataProviders || new ProviderFactory();

    this.updateSerializer(props);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.portal !== this.props.portal) {
      this.updateSerializer(nextProps);
    }
  }

  private updateSerializer(props: Props) {
    const {
      eventHandlers,
      portal,
      rendererContext,
    } = props;

    this.serializer = new ReactSerializer(this.providerFactory, eventHandlers, portal, rendererContext);
  }

  render() {
    const { document, schema } = this.props;
    return renderDocument(document, this.serializer, schema || defaultSchema);
  }

  componentWillUnmount() {
    const { dataProviders } = this.props;

    // if this is the ProviderFactory which was created in constructor
    // it's safe to destroy it on Renderer unmount
    if (!dataProviders) {
      this.providerFactory.destroy();
    }
  }
}
