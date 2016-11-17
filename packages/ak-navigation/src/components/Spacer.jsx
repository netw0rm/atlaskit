import React, { Component, PropTypes } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
export default class Spacer extends Component {
  render() {
    return (
      <div
        style={{
          width: this.props.width,
        }}
      />
    );
  }
}

Spacer.propTypes = {
  width: PropTypes.number,
};

Spacer.defaultProps = {
  width: 0,
};
