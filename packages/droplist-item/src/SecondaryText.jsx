import React, { PureComponent, PropTypes } from 'react';
import { SecondaryTextSpan } from './styled';

export default class SecondaryText extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  render = () => (
    <SecondaryTextSpan>{this.props.children}</SecondaryTextSpan>
  );
}
