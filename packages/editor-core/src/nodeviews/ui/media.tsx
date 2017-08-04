import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import {
  ProsemirrorGetPosHandler,
  ReactNodeProps,
} from './';
import UIMedia from '../../ui/Media';
import ProviderFactory from '../../providerFactory';
import { mediaStateKey, MediaPluginState } from '../../plugins';
import {
  EditorView,
  Node as PMNode,
} from '../../prosemirror';
import { CardDimensions } from '@atlaskit/media-card';

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
  getPos: ProsemirrorGetPosHandler;
  view: EditorView;
  node: PMNode;
  providerFactory: ProviderFactory;
  cardDimensions: CardDimensions;
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

  componentWillUnmount() {
    const { node } = this.props;
    this.pluginState.handleMediaNodeUnmount(node);
  }

  shouldComponentUpdate(nextProps) {
    const getId = (props: MediaNodeProps) => props.node.attrs.id;
    if (nextProps.selected !== this.props.selected) {
      this.pluginState.updateSelectedMediaNode();
      return true;
    }
    return getId(nextProps) !== getId(this.props) || nextProps.selected !== this.props.selected;
  }

  render() {
    const { node, providerFactory, selected, view } = this.props;
    const { id, type, collection, width } = node.attrs;
    const cardDimensions = this.props.cardDimensions || width ? { width } : undefined;

    return (
      <Wrapper selected={selected}>
        <UIMedia
          key={`medianode-${id}`}
          editorView={view}
          id={id!}
          type={type!}
          collection={collection!}
          providers={providerFactory}
          cardDimensions={cardDimensions}
          onDelete={this.handleRemove}
        />
      </Wrapper>
    );
  }

  private handleRemove = (item?: any, event?: Event) => {
    const { getPos, node } = this.props;
    this.pluginState.handleMediaNodeRemoval(node, getPos);

    if (event) {
      event.stopPropagation();
    }
  }

  private handleNewNode = (props: MediaNodeProps) => {
    const { getPos, node } = props;
    this.pluginState.handleMediaNodeMount(node, getPos);
  }
}
