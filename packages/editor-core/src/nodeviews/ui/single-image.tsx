import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import {
  EditorView,
  Node as PMNode,
} from '../../prosemirror';
import { Alignment, Display } from '../../schema/nodes/single-image';

export interface MediaGroupNodeProps {
  view: EditorView;
  node: PMNode;
}

// tslint:disable-next-line:variable-name
const Wrapper = styled.div`
  padding: 0 0 8px 0;
  display: block;
  float: ${props => float(props['data-alignment'], props['data-display'])};
  clear: ${props => clear(props['data-alignment'], props['data-display'])};
  text-align: ${props => textAlign(props['data-alignment'], props['data-display'])};

  & > * {
    padding: 5px 10px 0 0;
  }
`;

function textAlign(alignment: Alignment, display: Display): string {
  if (display !== 'block') {
    return 'left';
  }
  return alignment;
}

function float(alignment: Alignment, display: Display): string {
  if (display === 'block') {
    return 'none';
  }

  switch (alignment) {
    case 'right':
      return 'right';
    default:
      return 'left';
  }
}

function clear(alignment: Alignment, display: Display): string {
  if (display === 'block') {
    return 'both';
  }

  switch (alignment) {
    case 'left':
      return 'left';
    case 'right':
      return 'right';
    default:
      return 'both';
  }
}

export default class SingleImageNode extends PureComponent<MediaGroupNodeProps, {}> {

  constructor(props) {
    super(props);
  }

  render() {
    const { node } = this.props;
    return (
      <Wrapper data-alignment={node.attrs.alignment} data-display={node.attrs.display}>
        {this.props.children}
      </Wrapper>
    );
  }
}
