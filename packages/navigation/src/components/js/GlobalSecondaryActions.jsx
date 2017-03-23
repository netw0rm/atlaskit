import React, { PureComponent, PropTypes } from 'react';

export default class GlobalSecondaryActions extends PureComponent {
  static propTypes = {
    actions: PropTypes.arrayOf(PropTypes.node),
  }

  render() {
    return (
      <div>
        {this.props.actions.map((action, index) => (
          <div key={index}>{action}</div>
        ))}
      </div>
    );
  }
}
