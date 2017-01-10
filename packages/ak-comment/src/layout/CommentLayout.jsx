import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames';
import styles from '../styles.less';

export default class CommentLayout extends PureComponent {
  static propTypes = {
    avatar: PropTypes.node,
    children: PropTypes.node,
    className: PropTypes.string,
    content: PropTypes.node,
  }

  render() {
    const AvatarSection = () => (this.props.avatar ?
      (<div className={styles.locals.avatarSection}>
        <div className={styles.locals.avatarContainer}>
          {this.props.avatar}
        </div>
      </div>) : null);

    return (
      <div className={classNames(styles.locals.container, this.props.className)}>
        <AvatarSection />
        <div className={styles.locals.mainSection}>
          {this.props.content}
          <div className={styles.locals.nestedComments}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
