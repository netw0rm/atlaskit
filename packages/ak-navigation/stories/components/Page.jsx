import React, { PureComponent, PropTypes } from 'react';

export default class Page extends PureComponent {
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
          padding: 32,
        }}
      >
        <style>{'body { margin: 0 }'}</style>
        {this.props.children}
      </div>
    );
  }
}

