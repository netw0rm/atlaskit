import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames';
import LockIcon from '@atlaskit/icon/glyph/lock';
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
    restricted: PropTypes.string,
    saving: PropTypes.bool,
    savingText: PropTypes.string,
    time: PropTypes.node,
    type: PropTypes.string,
  }

  static defaultProps = {
    actions: [],
    restricted: '',
    saving: false,
    savingText: 'Sending...',
  }

  renderRestrictedItem = () => (
    <div className={styles.restricted}>
      <span className={styles.bulletSpacer}>&bull;</span><LockIcon label="restricted" size="small" />Restricted to {this.props.restricted}
    </div>
  );

  renderTopItems = () => {
    const items = (
      [
        this.props.author || null,
        this.props.type ? <Lozenge>{this.props.type}</Lozenge> : null,
        this.props.time && !this.props.saving ? this.props.time : null,
        this.props.saving ? this.props.savingText : null,
        this.props.restricted.length ? this.renderRestrictedItem() : null,
      ]
      .filter(item => !!item)
      .map((item, index) => <div key={index} className={styles.topItem}>{item}</div>)
    );

    return items.length
      ? <div className={styles.topItemsContainer}>{items}</div>
      : null;
  }

  renderActions = () => {
    const items = this.props.actions.map(
      (item, index) => <div key={index} className={styles.actionsItem}>{item}</div>
    );
    return items && !this.props.saving
      ? <div className={styles.actionsContainer}>{items}</div>
      : null;
  }

  renderChildren = () => (
    this.props.children
      ? <div className={styles.nestedComments}>{this.props.children}</div>
      : null
  )

  render() {
    const contentClasses = [styles.contentContainer, {
      [styles.optimisticSavingContent]: this.props.saving,
    }];
    return (
      <CommentLayout
        avatar={this.props.avatar}
        content={
          <div>
            {this.renderTopItems()}
            <div className={classNames(contentClasses)}>{this.props.content}</div>
            {this.renderActions()}
          </div>
        }
      >
        {this.props.children}
      </CommentLayout>
    );
  }
}
