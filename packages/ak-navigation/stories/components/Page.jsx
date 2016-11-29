import React, { Component, PropTypes } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
export default class Page extends Component {
  static get propTypes() {
    return {
      children: PropTypes.node,
    };
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          height: '100vh',
          overflowY: 'scroll',
        }}
      >
        <style>{'body { margin: 0 }'}</style>
        {this.props.children}
      </div>
    );
  }
}

