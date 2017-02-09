import React, { PureComponent, PropTypes } from 'react';
import Toggle from './stateless';

export default class AkToggle extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
  }

  state = {
    isActive: false,
  }

  onToggle = () => {
    this.setState({
      isActive: !this.state.isActive,
    });

    // you may choose to publish this state change to a callback
  }

  render() {
    return (
      <Toggle
        label={this.props.label}
        onToggle={this.onToggle}
        isActive={this.state.isActive}
      />
    );
  }
}
