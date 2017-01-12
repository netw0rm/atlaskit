import React, { PropTypes, PureComponent } from 'react';
import styles from './styles.less';
import CommentField from './internal/CommentField';

export default class CommentAuthor extends PureComponent {
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
        extraClasses={styles.locals.commentAuthor}
        onClick={this.props.onClick}
        onFocus={this.props.onFocus}
        onMouseOver={this.props.onMouseOver}
      >
        {this.props.children}
      </CommentField>
    );
  }
}
