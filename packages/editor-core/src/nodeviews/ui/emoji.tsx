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

    const emojiProvider = this.props.providerFactory.providers.get("emojiProvider");
    console.log('PAC: emojiProvider = ' + emojiProvider);
    const node = this.props.node;
    const emojiId = node.attrs.id;

    if (emojiProvider) {
      emojiProvider.then(provider => {
        provider.findById(emojiId).then((loadedEmoji) => {
          if (loadedEmoji) {
            console.log('PAC: Found emoji for id = ' + emojiId + ' which is [id=' + loadedEmoji.id + ', shortName=' + loadedEmoji.shortName + ', fallback=' + loadedEmoji.fallback + ']');
            node.attrs.id = loadedEmoji.id;
            node.attrs.shortName = loadedEmoji.shortName;
            node.attrs.text = loadedEmoji.fallback;

            this.forceUpdate();
          } else {
            console.log('PAC: No emoji found for id = ' + emojiId);
          }
        });
      });
    }

    this.resolvingAttempted = true;
  }

  /**
   * return true if the component should try to resolve an emoji Id to an Emoji.
   * If resolving has been attempted previously and failed, or it's unnecessary because we already
   * have a fully defined Emoji then false will be returned
   */
  shouldResolve() {
    const node = this.props.node;
    if (node.attrs.shortName != null && node.attrs.shortName != undefined) {
      return false;
    }

    return !this.resolvingAttempted;
  }

  render() {
    const { node, providerFactory } = this.props;
    const { shortName, id, text } = node.attrs;

    if (node.type.name === 'nativeEmoji' && !shortName) {
      console.log('PAC: React render of nativeEmoji');
      return (<span className='native-emoji'>{text}</span>); // render the native emoji as plain text // TODO remove the need for the span
    }

    console.log('PAC: React render of resolved emoji');
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
}
