import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import { ResourcedEmoji } from '@atlaskit/emoji';
import ProviderFactory, { ProviderHandler, WithProviders } from '../../providerFactory';
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

  private resolvingAttempted: boolean;

  constructor(props) {
    super(props);
    this.resolvingAttempted = false;
  }

  componentWillMount() {
    const { node, providerFactory } = this.props;

    if (!this.shouldResolve()) {
      return;
    }

    const emojiProviderName = 'emojiProvider';
    const emojiResolvingHandler = this.createEmojiResolvingHandler(node.attrs.id, emojiProviderName);

    // kick off the emoji resolution
    providerFactory.subscribe(emojiProviderName, emojiResolvingHandler);
    this.resolvingAttempted = true;
  }

  /**
   * return true if the component should try to resolve an emoji Id to an Emoji.
   * If resolving has been attempted previously and failed, or it's unnecessary because we already
   * have a fully defined Emoji then false will be returned
   */
  private shouldResolve() {
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

    return (<span className="native-emoji">{text}</span>); // render the native emoji as plain text
  }

  /**
   * Returns a ProviderHandler that will look up emoji's by the supplied emojiId
   * and will force this Component to render when fulfilled.
   * @param emojiId the id of the emoji to be found
   * @param emojiProviderName the name of the ProviderHandler created
   * @return a ProviderHandler function
   */
  private createEmojiResolvingHandler(emojiId: string, emojiProviderName: string): ProviderHandler {
    const emojiResolvingHandler = function(name: string, providerPromise?: Promise<any>) {
      if (providerPromise) {
        providerPromise.then(emojiProvider => {
          emojiProvider.findById(emojiId).then((loadedEmoji) => {
            if (loadedEmoji) {
              const node = this.component.props.node;
              node.attrs.shortName = loadedEmoji.shortName;
              node.attrs.text = loadedEmoji.fallback;
              this.forceUpdate();
            }
          }, unsubscribeHandler);
        }, unsubscribeHandler);
      }
    };

    const unsubscribeHandler = function() {
      this.props.providerFactory.unsubscribe(emojiProviderName, emojiResolvingHandler);
    };

    return emojiResolvingHandler;
  }
}
