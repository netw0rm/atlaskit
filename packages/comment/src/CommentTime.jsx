import React, { PropTypes, PureComponent } from 'react';
import CommentField from './internal/CommentField';

export default class CommentTime extends PureComponent {
  static propTypes = {
    /** The time of the comment. */
    children: PropTypes.node,
    /** The URL of the link. If not provided, the element will be rendered as text. */
    href: PropTypes.string,
    /** Handler called when the element is clicked. */
    onClick: PropTypes.func,
    /** Handler called when the element is focused. */
    onFocus: PropTypes.func,
    /** Handler called when the element is moused over. */
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
