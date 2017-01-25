import React, { PureComponent, PropTypes } from 'react';
import { akColorN200 } from 'akutil-shared-styles';
import styled from 'styled-components';

export default class SecondaryText extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const Span = styled.span`
      color: ${akColorN200}
    `;
    return (<Span>{this.props.children}</Span>);
  }
}
