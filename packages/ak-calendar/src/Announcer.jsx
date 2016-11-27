import React, { Component, PropTypes } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
export default class extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }
  render = () => (
    <div
      aria-live="assertive"
      aria-relevant="text"
      style={{
        border: '0',
        clip: 'rect(0 0 0 0)',
        height: '1px',
        margin: '-1px',
        overflow: 'hidden',
        padding: '0',
        position: 'absolute',
        width: '1px',
      }}
    >{this.props.children}</div>
  )
}
