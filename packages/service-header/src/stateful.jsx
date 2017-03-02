import React, { PureComponent, PropTypes } from 'react';
import ServiceHeader from './stateless';

export default class AkServiceHeader extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
  }

  state = {
    isActive: false,
  }

  onServiceHeader = () => {
    this.setState({
      isActive: !this.state.isActive,
    });

    // you may choose to publish this state change to a callback
  }

  render() {
    return (
      <ServiceHeader
        label={this.props.label}
        onServiceHeader={this.onServiceHeader}
        isActive={this.state.isActive}
      />
    );
  }
}
