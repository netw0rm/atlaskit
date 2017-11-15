import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import TreeTable from './stateless';

export default class AkTreeTable extends PureComponent {
  static propTypes = {
    /** the label for the toggle */
    label: PropTypes.string.isRequired,
  }

  state = {
    isActive: false,
  }

  onTreeTable = () => {
    this.setState({
      isActive: !this.state.isActive,
    });

    // you may choose to publish this state change to a callback
  }

  render() {
    return (
      <TreeTable
        label={this.props.label}
        onTreeTable={this.onTreeTable}
        isActive={this.state.isActive}
      />
    );
  }
}
