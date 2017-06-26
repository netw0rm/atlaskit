import React, { PropTypes, PureComponent } from 'react';
import { action } from '@storybook/react';
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
        <button onClick={action('button clicked')}>Button</button> (should only be clickable if canClickThrough=true)
        <Blanket {...this.props} />
      </div>
    );
  }
}
