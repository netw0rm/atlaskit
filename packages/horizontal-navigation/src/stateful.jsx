import React, { PureComponent, PropTypes } from 'react';
import HorizontalNavigation from './stateless';

export default class AkHorizontalNavigation extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
  }

  state = {
    isActive: false,
  }

  onHorizontalNavigation = () => {
    this.setState({
      isActive: !this.state.isActive,
    });

    // you may choose to publish this state change to a callback
  }

  render() {
    return (
      <HorizontalNavigation
        label={this.props.label}
        onHorizontalNavigation={this.onHorizontalNavigation}
        isActive={this.state.isActive}
      />
    );
  }
}
