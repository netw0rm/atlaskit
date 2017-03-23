import React, { PropTypes, PureComponent } from 'react';
import Lozenge from '@atlaskit/lozenge';

import styles from 'style!./styles.less';
import CommentAction from './CommentAction';
import CommentAuthor from './CommentAuthor';
import CommentTime from './CommentTime';
import CommentLayout from './layout/CommentLayout';

export { CommentAction, CommentAuthor, CommentTime, CommentLayout };

export default class Comment extends PureComponent {
  static propTypes = {
    actions: PropTypes.node,
    author: PropTypes.node,
    avatar: PropTypes.node.isRequired,
    children: PropTypes.node,
    content: PropTypes.node,
    time: PropTypes.node,
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
        this.props.time || null,
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
      <CommentLayout
        avatar={this.props.avatar}
        content={
          <div>
            {this.renderTopItems()}
            <div className={styles.contentContainer}>{this.props.content}</div>
            {this.renderActions()}
          </div>
        }
      >
        {this.props.children}
      </CommentLayout>
    );
  }
}
