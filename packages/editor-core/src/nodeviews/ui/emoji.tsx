import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import { ResourcedEmoji } from '@atlaskit/emoji';
import { PositionedNode } from '../';
import ProviderFactory, { WithProviders } from '../../providerFactory';
import { mediaStateKey, MediaPluginState } from '../../plugins';
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

export default class MediaNode extends PureComponent<Props, {}> {
  componentWillUnmount() {
    const { node, view } = this.props;
    const pluginState = mediaStateKey.getState(view.state) as MediaPluginState;

    pluginState.handleMediaNodeRemove(node);
  }

  render() {
    const { node, providerFactory } = this.props;
    const { shortName, id, fallback } = node.attrs;

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
