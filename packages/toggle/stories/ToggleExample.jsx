import React, { PropTypes, PureComponent } from 'react';
import { Toggle } from '@atlaskit/toggle';

class SmartToggle extends PureComponent {
  static propTypes = {
    isDefaultChecked: PropTypes.bool,
  }

  static defaultPrpps = {
    isDefaultChecked: false,
  }

  state = {
    isChecked: this.props.isDefaultChecked,
  }

  render = () => (
    <Toggle
      {...this.props}
      isChecked={this.state.isChecked}
      onChange={() => this.setState({ isChecked: !this.state.isChecked })}
    />
  )
}

export default (
  <div>
    <SmartToggle />
    <SmartToggle size="large" />
  </div>
);
