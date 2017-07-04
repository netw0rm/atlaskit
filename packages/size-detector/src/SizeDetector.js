import React, { PureComponent, PropTypes } from 'react';
import Measurer from './Measurer';

export default class SizeDetector extends React.Component {
  state = {
    width: 0
  }

  static childContextTypes = {
    width: PropTypes.number,
  }

  getChildContext() {``
    return {
      width: this.state.width
    };
  }

  handleResize = (availableWidth) => { this.setState({ width: availableWidth })};

  render() {
    return (
      <div>
        <Measurer onChange={this.handleResize} />
        {this.props.children(this.state.width)}
      </div>
    );
  }
}

const Foo = ({ children }) => (<div>{children}</div>);
