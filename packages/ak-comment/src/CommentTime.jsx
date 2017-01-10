import React, { PropTypes, PureComponent } from 'react';
import styles from './styles.less';
import CommentField from './internal/CommentField';

export default class CommentTime extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    href: PropTypes.string,
  }

  render() {
    return (
      <CommentField
        href={this.props.href}
        linkClasses={styles.locals.topButton}
        {...this.props}
      >
        {this.props.children}
      </CommentField>
    );
  }
}
