import * as React from 'react';
import { CardEvent } from '@atlaskit/media-card';
import { PureComponent, SyntheticEvent } from 'react';
import { Schema } from '../../prosemirror';
import ProviderFactory from '../../providerFactory';
import {
  ReactSerializer,
  renderDocument,
  RendererContext,
  RenderOutputStat,
} from '../../renderer';
import { defaultSchema } from '../../schema';
import { style } from './style';

export interface CardSurroundings {
  collectionName: string;
  list: string[];
}
export type MentionEventHandler = (mentionId: string, text: string, event?: SyntheticEvent<HTMLSpanElement>) => void;
export type CardEventClickHandler = (result: CardEvent, surroundings?: CardSurroundings) => void;
export type AppCardEventClickHandler = (url?: string) => void;
export type AppCardActionEventClickHandler = (action: AppCardAction) => void;
export interface AppCardAction {
  title: string;
}

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
  applicationCard?: {
    onClick?: AppCardEventClickHandler;
    onActionClick?: AppCardActionEventClickHandler;
  };
}

export interface Props {
  document: any;
  dataProviders?: ProviderFactory;
  eventHandlers?: EventHandlers;
  onComplete?: (stat: RenderOutputStat) => void;
  portal?: HTMLElement;
  rendererContext?: RendererContext;
  schema?: Schema<any, any>;
}

let hasStyle = false;

export default class Renderer extends PureComponent<Props, {}> {
  private providerFactory: ProviderFactory;
  private serializer: ReactSerializer;

  constructor(props: Props) {
    super(props);
    this.providerFactory = props.dataProviders || new ProviderFactory();

    this.updateSerializer(props);
  }

  componentWillMount() {
    if (!hasStyle) {
      const stylesheet = document.createElement('style') as HTMLStyleElement;
      stylesheet.type = 'text/css';
      stylesheet.innerHTML = style;
      document.head.appendChild(stylesheet);
      hasStyle = true;
    }
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
    const { document, onComplete, schema } = this.props;
    const { result, stat } = renderDocument(document, this.serializer, schema || defaultSchema);

    if (onComplete) {
      onComplete(stat);
    }

    return <div className="akRenderer">{result}</div>;
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
