import React, { PropTypes, PureComponent } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
export default class Radio extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
  }

  render() {
    return (
      <div>
        <input
          name={this.props.name}
          value={this.props.value}
          type="radio"
        />
        {this.props.children}
      </div>
    );
  }
}
