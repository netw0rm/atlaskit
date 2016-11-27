import React, { PureComponent, PropTypes } from 'react';
import Button from 'ak-button';

// eslint-disable-next-line react/prefer-stateless-function
export default class extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }
  render = () => (
    <Button appearance="subtle" spacing="none" tabIndex={-1} theme="dark">{this.props.children}</Button>
  )
}
