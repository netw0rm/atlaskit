import React, { PureComponent, PropTypes } from 'react';
import Button from '@atlaskit/button';

export default class extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }
  render = () => (
    <Button appearance="subtle" spacing="none" tabIndex={-1} theme="dark">{this.props.children}</Button>
  )
}
