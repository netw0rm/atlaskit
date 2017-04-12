import React, { PropTypes, PureComponent } from 'react';
import styles from '../styles.less';

export default class CommentLayout extends PureComponent {
  static propTypes = {
    /** The element to display as the Comment avatar - generally an AtlasKit Avatar */
    avatar: PropTypes.node,
    /** Nested comments to render */
    children: PropTypes.node,
    /** The main content of the Comment */
    content: PropTypes.node,
  }

  render() {
    const AvatarSection = () => (this.props.avatar ?
      (<div className={styles.locals.avatarSection}>
        <div className={styles.locals.avatarContainer}>
          {this.props.avatar}
        </div>
      </div>) : null);

    const NestedComments = () => (this.props.children
      ? <div className={styles.locals.nestedComments}>{this.props.children}</div>
      : null);

    return (
      <div className={styles.locals.container}>
        <AvatarSection />
        <div className={styles.locals.mainSection}>
          {this.props.content}
          <NestedComments />
        </div>
      </div>
    );
  }
}
