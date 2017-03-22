import React, { PropTypes, PureComponent } from 'react';

const halfGrid = 4;

export default class extends PureComponent {
  static displayName = 'utilReadmeDescription'
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    return typeof this.props.children === 'string' ?
      <p>{this.props.children}</p> :
      <div style={{ marginTop: 3 * halfGrid }}>{this.props.children}</div>;
  }
}
