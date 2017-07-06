import PropTypes from 'prop-types';
import React from 'react';
import Measurer from './Measurer';

export default class SizeDetector extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  static childContextTypes = {
    width: PropTypes.number,
  }

  state = {
    width: 0,
  }

  getChildContext() {
    return {
      width: this.state.width,
    };
  }

  handleResize = availableWidth => this.setState({ width: availableWidth });

  render() {
    return (
      <div>
        <Measurer onChange={this.handleResize} />
        {this.props.children(this.state.width)}
      </div>
    );
  }
}
