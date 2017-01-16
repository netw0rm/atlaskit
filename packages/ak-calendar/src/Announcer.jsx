import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

const Div = styled.div`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

export default class extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }
  render = () => (
    <Div aria-live="assertive" aria-relevant="text">{this.props.children}</Div>
  )
}
