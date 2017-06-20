import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import LayerManager from './stateless';

export default class AkLayerManager extends PureComponent {
  static propTypes = {
    /** the label for the toggle */
    label: PropTypes.string.isRequired,
  }

  state = {
    isActive: false,
  }

  onLayerManager = () => {
    this.setState({
      isActive: !this.state.isActive,
    });

    // you may choose to publish this state change to a callback
  }

  render() {
    return (
      <LayerManager
        label={this.props.label}
        onLayerManager={this.onLayerManager}
        isActive={this.state.isActive}
      />
    );
  }
}
