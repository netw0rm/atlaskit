import React, { PropTypes, PureComponent } from 'react';
import Avatar from 'ak-avatar';
import Lozenge from 'ak-lozenge';

import styles from 'style!./styles.less';
import CommentButton from './internal/comment-button';

export default class extends PureComponent {
  static propTypes = {
    actions: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.node,
      onClick: PropTypes.func,
    })),
    author: PropTypes.string,
    avatarLabel: PropTypes.string,
    avatarSrc: PropTypes.string,
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
        this.props.author ? <span className={styles.commenter}>{this.props.author}</span> : null,
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
    const items = this.props.actions.map((action, index) => (
      <div key={index} className={styles.actionsItem}>
        <CommentButton
          className={styles.actionsItem}
          onClick={action.onClick}
        >
          {action.content}
        </CommentButton>
      </div>
    ));

    return (items && items.length)
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
        <div className={styles.leftSection}>
          <div className={styles.avatarContainer}>
            <Avatar src={this.props.avatarSrc} label={this.props.avatarLabel} />
          </div>
        </div>
        <div className={styles.rightSection}>
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
