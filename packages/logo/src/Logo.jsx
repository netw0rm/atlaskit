import React, { PureComponent, PropTypes } from 'react';
import Size from './internal/Size';

export default class Logo extends PureComponent {
  static propTypes = {
    /** If set, the logo will be collapsed down to show only the product icon or product type */
    collapseTo: PropTypes.oneOf(['icon', 'type']),
    /** The image component containing the product icon and logo text */
    logoText: PropTypes.node.isRequired,
    /** The size of the icon, uses the same sizing scheme as in @atlaskit/icon */
    size: PropTypes.string,
    /** Internal prop used for collapsing down to the product type. Do not use */
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
