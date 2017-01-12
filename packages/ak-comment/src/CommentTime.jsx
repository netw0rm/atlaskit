import React, { PropTypes, PureComponent } from 'react';
import CommentField from './internal/CommentField';

export default class CommentTime extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    href: PropTypes.string,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onMouseOver: PropTypes.func,
  }

  render() {
    return (
      <CommentField
        href={this.props.href}
        onClick={this.props.onClick}
        onFocus={this.props.onFocus}
        onMouseOver={this.props.onMouseOver}
      >
        {this.props.children}
      </CommentField>
    );
  }
}
