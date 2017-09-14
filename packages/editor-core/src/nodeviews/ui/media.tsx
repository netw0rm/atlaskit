import * as React from 'react';
import { PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  ProsemirrorGetPosHandler,
  ReactNodeProps,
} from './';
import UIMedia from '../../ui/Media';
import ProviderFactory from '../../providerFactory';
import { FakeMediaCursorLeft, FakeMediaCursorRight } from '../../plugins/fakecursor';
import { MediaPluginState, stateKey as mediaStateKey } from '../../plugins/media';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
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

const blink = keyframes`
  0% { border-right: 2px solid #0066FF; }
  50% { border-right: 1px solid transparent; }
  100% { border-right: 2px solid #0066FF; }
`;

// tslint:disable-next-line:variable-name
const CursorLeft = styled.div`
  pointer-events: none;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  caret-color: transparent;
  &:after {
    content: "";
    display: inline;
    position: absolute;
    top: 2px;
    bottom: 2px;
    border-right: 2px solid #0066FF;
    animation: 1s ${blink} step-end infinite;
  }
`;

// tslint:disable-next-line:variable-name
const CursorRight = styled.div`
  pointer-events: none;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  caret-color: transparent;
  &:after {
    content: "";
    display: inline;
    position: absolute;
    top: 2px;
    right: 1px;
    bottom: 2px;
    border-right: 2px solid #0066FF;
    animation: 1s ${blink} step-end infinite;
  }
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
    return getId(nextProps) !== getId(this.props) || nextProps.selected !== this.props.selected;
  }

  render() {
    const { node, providerFactory, selected, view, cardDimensions } = this.props;
    const { id, type, collection } = node.attrs;
    const { selection } = view.state;

    return (
      <Wrapper selected={selected}>
      {(selection instanceof FakeMediaCursorLeft) && <CursorLeft />}
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
      {(selection instanceof FakeMediaCursorRight) && <CursorRight />}
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
