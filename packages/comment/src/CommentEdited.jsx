import React, { PropTypes, PureComponent } from 'react';
import CommentAction from './CommentAction';

export default class CommentEdited extends PureComponent {
  static propTypes = {
    /** Content to render indicating that the comment has been edited. */
    children: PropTypes.node,
    /** Handler called when the element is clicked. */
    onClick: PropTypes.func,
    /** Handler called when the element is focused. */
    onFocus: PropTypes.func,
    /** Handler called when the element is moused over. */
    onMouseOver: PropTypes.func,
  };

  render() {
    return (
      <CommentAction
        onClick={this.props.onClick}
        onFocus={this.props.onFocus}
        onMouseOver={this.props.onMouseOver}
      >
        { this.props.children }
      </CommentAction>
    );
  }
}
