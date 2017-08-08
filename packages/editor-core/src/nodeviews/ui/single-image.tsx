import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import {
  EditorView,
  Node as PMNode,
} from '../../prosemirror';

export interface MediaGroupNodeProps {
  view: EditorView;
  node: PMNode;
}

// tslint:disable-next-line:variable-name
const Wrapper = styled.div`
  padding: 0 0 8px 0;
  display: inline-block;
  float: ${props => props['data-alignment']};

  & > * {
    padding: 5px 10px 0 10px;
  }
`;


export default class SingleImageNode extends PureComponent<MediaGroupNodeProps, {}> {

  constructor(props) {
    super(props);
  }

  render() {
    const { node } = this.props;
    return (
      <Wrapper data-alignment={node.attrs.alignment}>
        {this.props.children}
      </Wrapper>
    );
  }
}
