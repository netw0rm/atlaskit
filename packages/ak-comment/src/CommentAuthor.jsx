import React, { PropTypes, PureComponent } from 'react';
import styles from './styles.less';
import CommentField from './internal/CommentField';

export default class CommentAuthor extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    href: PropTypes.string,
  }

  render() {
    return (
      <CommentField
        href={this.props.href}
        linkClasses={styles.locals.commentAuthor}
        {...this.props}
      >
        {this.props.children}
      </CommentField>
    );
  }
}
