import React, { PropTypes, PureComponent } from 'react';
import Blanket from '../src';

export default class BlanketDemo extends PureComponent {
  static propTypes = {
    helperText: PropTypes.string,
  };

  static defaultProps = {
    helperText: 'Blanket demo',
  };

  render() {
    return (
      <div>
        {this.props.helperText}
        <Blanket {...this.props} />
      </div>
    );
  }
}
