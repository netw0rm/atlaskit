import React, { PropTypes, PureComponent } from 'react';
import Lozenge from 'ak-lozenge';

import styles from 'style!./styles.less';
import CommentAction from './CommentAction';
import CommentAuthor from './CommentAuthor';

export { CommentAction, CommentAuthor };

export default class extends PureComponent {
  static propTypes = {
    actions: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.node,
      onClick: PropTypes.func,
    })),
    author: PropTypes.string,
    avatar: PropTypes.node.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    content: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    datetime: PropTypes.string,
    type: PropTypes.string,
  }

  static defaultProps = {
    actions: [],
  }

  renderTopItems = () => {
    const items = (
      [
        this.props.author || null,
        this.props.type ? <Lozenge>{this.props.type}</Lozenge> : null,
        this.props.datetime || null,
      ]
      .filter(item => !!item)
      .map((item, index) => <div key={index} className={styles.topItem}>{item}</div>)
    );

    return items.length
      ? <div className={styles.topContainer}>{items}</div>
      : null;
  }

  renderActions = () => {
    const items = this.props.actions.map(
      (item, index) => <div key={index} className={styles.actionsItem}>{item}</div>
    );
    return items
      ? <div className={styles.actionsContainer}>{items}</div>
      : null;
  }

  renderChildren = () => (
    this.props.children
      ? <div className={styles.nestedComments}>{this.props.children}</div>
      : null
  )

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.avatarSection}>
          <div className={styles.avatarContainer}>
            {this.props.avatar}
          </div>
        </div>
        <div className={styles.mainSection}>
          {this.renderTopItems()}
          <div className={styles.contentContainer}>
            {this.props.content}
          </div>
          {this.renderActions()}
          {this.renderChildren()}
        </div>
      </div>
    );
  }
}
