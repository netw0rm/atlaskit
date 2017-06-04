import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import { ResourcedEmoji } from '@atlaskit/emoji';
import ProviderFactory, { WithProviders } from '../../providerFactory';
import {
  EditorView,
  Node as PMNode,
} from '../../prosemirror';

// tslint:disable-next-line:variable-name
const Wrapper = styled.span`
  userSelect: all;
`;

export interface Props {
  children?: React.ReactNode;
  view: EditorView;
  node: PMNode;
  providerFactory: ProviderFactory;
}

export default class EmojiNode extends PureComponent<Props, {}> {

  resolvingAttempted: boolean

  constructor(props) {
    super(props);
    this.resolvingAttempted = false;
  }

  componentWillMount() {
    if (!this.shouldResolve()) {
      return;
    }

    const emojiProviderName = 'emojiProvider';
    const emojiId = this.props.node.attrs.id;
    const component = this;

    const emojiResolvingHandler = function(name: string, providerPromise?: Promise<any>) {
      if (providerPromise) {
        providerPromise.then(emojiProvider => {
          emojiProvider.findById(emojiId).then((loadedEmoji) => {
            if (loadedEmoji) {
              const node = component.props.node;
              node.attrs.shortName = loadedEmoji.shortName;
              node.attrs.text = loadedEmoji.fallback;
              component.forceUpdate();
            }
          }, unsubscribeHandler);
        }, unsubscribeHandler);
      }
    };

    const unsubscribeHandler = function() {
      component.props.providerFactory.unsubscribe(emojiProviderName, emojiResolvingHandler);
    };

    // kick off the emoji resolution
    this.props.providerFactory.subscribe(emojiProviderName, emojiResolvingHandler);
    this.resolvingAttempted = true;
  }

  /**
   * return true if the component should try to resolve an emoji Id to an Emoji.
   * If resolving has been attempted previously and failed, or it's unnecessary because we already
   * have a fully defined Emoji then false will be returned
   */
  shouldResolve() {
    const node = this.props.node;
    if (node.attrs.shortName) {
      return false;
    }

    return !this.resolvingAttempted;
  }

  render() {
    const { node, providerFactory } = this.props;
    const { shortName, id, text } = node.attrs;

    if (shortName) {
      return (
        <Wrapper>
          <WithProviders
            providers={['emojiProvider']}
            providerFactory={providerFactory}
            // tslint:disable-next-line:jsx-no-lambda
            renderNode={providers =>
              <ResourcedEmoji
                emojiId={{ shortName, id, fallback: text }}
                emojiProvider={providers['emojiProvider']}
              />
            }
          />
        </Wrapper>
      );
    }

    return (<span className='native-emoji'>{text}</span>); // render the native emoji as plain text
  }
}
