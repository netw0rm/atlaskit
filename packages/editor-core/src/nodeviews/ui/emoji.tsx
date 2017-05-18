import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import { ResourcedEmoji } from '@atlaskit/emoji';
import { PositionedNode } from '../';
import ProviderFactory, { WithProviders } from '../../providerFactory';
import { EditorView } from '../../prosemirror';

// tslint:disable-next-line:variable-name
const Wrapper = styled.span`
  userSelect: all;
`;

export interface Props {
  children?: React.ReactNode;
  view: EditorView;
  node: PositionedNode;
  providerFactory: ProviderFactory;
}

export default class EmojiNode extends PureComponent<Props, {}> {
  render() {
    const { node, providerFactory } = this.props;
    const { shortName, id, text: fallback } = node.attrs;

    return (
      <Wrapper>
        <WithProviders
          providers={['emojiProvider']}
          providerFactory={providerFactory}
          // tslint:disable-next-line:jsx-no-lambda
          renderNode={providers =>
            <ResourcedEmoji
              emojiId={{ shortName, id, fallback }}
              emojiProvider={providers['emojiProvider']}
            />
          }
        />
      </Wrapper>
    );
  }
}
