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
      (<div className={styles.avatarSection}>
        <div className={styles.avatarContainer}>
          {this.props.avatar}
        </div>
      </div>) : null);

    const NestedComments = () => (this.props.children
      ? <div className={styles.nestedComments}>{this.props.children}</div>
      : null);

    return (
      <div className={styles.container}>
        <AvatarSection />
        <div className={styles.mainSection}>
          {this.props.content}
          <NestedComments />
        </div>
      </div>
    );
  }
}
