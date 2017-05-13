import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import { PositionedNode, ReactNodeProps } from './';
import MediaComponent from '../ui/Media/MediaComponent';
import ProviderFactory, { WithProviders } from '../providerFactory';
import { mediaStateKey, MediaPluginState } from '../plugins';
import { EditorView } from '../prosemirror';

// tslint:disable-next-line:variable-name
const Wrapper = styled.div`
  margin: 8px 8px 0 0;
  display: inline-block;
  verticalAlign: middle;
  userSelect: all;
  border: 3px solid ${props => props.selected ? '#8cf' : 'transparent'}
  border-radius: 5px;
`;

export interface Props extends ReactNodeProps {
  children?: React.ReactNode;
  view: EditorView;
  node: PositionedNode;
  providerFactory: ProviderFactory;
}

export default class MediaNode extends PureComponent<Props, {}> {
  private pluginState: MediaPluginState;

  constructor(props) {
    super(props);

    const { view } = this.props;
    this.pluginState = mediaStateKey.getState(view.state);
  }

  componentDidMount() {
    const { node } = this.props;
    this.pluginState.handleMediaNodeMount(node);
  }

  componentWillUnmount() {
    const { node } = this.props;
    this.pluginState.handleMediaNodeUnmount(node);
  }

  render() {
    const { node, providerFactory, selected, view } = this.props;
    const { id, type, collection, publicId } = node.attrs;

    return (
      <Wrapper selected={selected}>
        <WithProviders
          providers={['mediaProvider']}
          providerFactory={providerFactory}
          // tslint:disable-next-line:jsx-no-lambda
          renderNode={providers => {
            return (
              <MediaComponent
                mediaProvider={providers['mediaProvider']}
                editorView={view}
                id={id!}
                publicId={publicId!}
                type={type!}
                collection={collection!}
                onDelete={this.handleRemove}
              />
            );
          }}
        />
      </Wrapper>
    );
  }

  private handleRemove = (item?: any, event?: Event) => {
    const { node } = this.props;
    this.pluginState.handleMediaNodeRemove(node);

    if (event) {
      event.stopPropagation();
    }
  }
}
