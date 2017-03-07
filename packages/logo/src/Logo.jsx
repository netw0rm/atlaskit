import React, { PureComponent, PropTypes } from 'react';
import Size from './internal/Size';

export default class Logo extends PureComponent {
  static propTypes = {
    collapseTo: PropTypes.oneOf(['icon', 'type']),
    logoText: PropTypes.node.isRequired,
    size: PropTypes.string,
    typeOffsetRatio: PropTypes.number,
  }

  static defaultProps = {
    size: 'medium',
    typeOffsetRatio: 0,
  }

  render() {
    return (
      <Size
        collapseTo={this.props.collapseTo}
        size={this.props.size}
        typeOffsetRatio={this.props.typeOffsetRatio}
      >
        {this.props.logoText}
      </Size>
    );
  }
}
