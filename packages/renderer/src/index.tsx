import { PureComponent } from 'react';
import { MentionProvider } from '@atlaskit/mention';
import { renderNode } from './nodes';
import { ServicesConfig, EventHandlers } from './config';

export interface Props {
  document?: any;
  mentionProvider?: Promise<MentionProvider>;
  eventHandlers?: EventHandlers;
}

export interface State {}

export default class Renderer extends PureComponent<Props, State> {
  static defaultProps = {
    document: {},
  };

  render() {
    const { props } = this;
    const { mentionProvider, eventHandlers } = props;

    let servicesConfig: ServicesConfig = {};

    if (mentionProvider) {
      servicesConfig.getMentionProvider = () => mentionProvider;
    }

    return renderNode(this.props.document, servicesConfig, eventHandlers);
  }
}
