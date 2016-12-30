import React, { PropTypes, PureComponent } from 'react';
import { Toggle } from 'ak-toggle';

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
  <SmartToggle />
);
