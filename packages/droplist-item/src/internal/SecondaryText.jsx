import React, { PureComponent, PropTypes } from 'react';
import styled from 'styled-components';
import { akColorN200 } from 'akutil-shared-styles';


export const Span = styled.span`
  color: ${akColorN200};
`;

export default class SecondaryText extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  render = () => (
    <Span>{this.props.children}</Span>
  );
}
