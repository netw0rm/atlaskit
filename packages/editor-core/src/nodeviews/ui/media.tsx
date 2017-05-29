import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import {
  ProsemirrorGetPosHandler,
  ReactNodeProps,
} from './';
import MediaComponent from '../../ui/Media/MediaComponent';
import ProviderFactory, { WithProviders } from '../../providerFactory';
import { mediaStateKey, MediaPluginState } from '../../plugins';
import {
  EditorView,
  Node as PMNode,
} from '../../prosemirror';

// tslint:disable-next-line:variable-name
const Wrapper = styled.div`
  margin: 0;
  display: inline-block;
  verticalAlign: middle;
  userSelect: all;
  border: 3px solid ${props => props.selected ? '#8cf' : 'transparent'}
  border-radius: 5px;
`;

export interface MediaNodeProps extends ReactNodeProps {
  children?: React.ReactNode;
  getPos: ProsemirrorGetPosHandler;
  view: EditorView;
  node: PMNode;
  providerFactory: ProviderFactory;
}

export default class MediaNode extends PureComponent<MediaNodeProps, {}> {
  private pluginState: MediaPluginState;

  constructor(props) {
    super(props);

    const { view } = this.props;
    this.pluginState = mediaStateKey.getState(view.state);
  }

  componentDidMount() {
    this.handleNewNode(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { node } = this.props;

    // if media node is prepended to existing one, existing React component
    // will get new props instead of unmounting/creating a new one
    if (nextProps.node.attrs.id !== node.attrs.id) {
      this.pluginState.handleMediaNodeUnmount(node);
      this.handleNewNode(nextProps);
    }
  }

  componentWillUnmount() {
    const { node } = this.props;
    this.pluginState.handleMediaNodeUnmount(node);
  }

  render() {
    const { node, providerFactory, selected, view } = this.props;
    const { id, type, collection } = node.attrs;

    return (
      <Wrapper selected={selected}>
        <WithProviders
          providers={['mediaProvider']}
          providerFactory={providerFactory}
          // tslint:disable-next-line:jsx-no-lambda
          renderNode={providers => {
            return (
              <MediaComponent
                key={`medianode-${id}`}
                mediaProvider={providers['mediaProvider']}
                editorView={view}
                id={id!}
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
    const { getPos, node } = this.props;
    this.pluginState.handleMediaNodeRemove(node, getPos);

    if (event) {
      event.stopPropagation();
    }
  }

  private handleNewNode = (props: MediaNodeProps) => {
    const { getPos, node } = props;
    this.pluginState.handleMediaNodeMount(node, getPos);
  }
}
