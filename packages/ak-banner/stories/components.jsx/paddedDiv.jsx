import React, { PropTypes, PureComponent } from 'react';
import { akGridSize } from 'akutil-shared-styles';

// eslint-disable-next-line react/prefer-stateless-function
export default class PaddedDiv extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const buttonPadding = parseInt(akGridSize, 10) * 2;
    return (
      <div style={{ padding: buttonPadding }}>
        {this.props.children}
      </div>
    );
  }
}
