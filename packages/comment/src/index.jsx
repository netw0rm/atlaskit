import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames';
import LockIcon from '@atlaskit/icon/glyph/lock';
import Lozenge from '@atlaskit/lozenge';
import WarningIcon from '@atlaskit/icon/glyph/warning';

import styles from './styles.less';
import CommentAction from './CommentAction';
import CommentAuthor from './CommentAuthor';
import CommentTime from './CommentTime';
import CommentEdited from './CommentEdited';
import CommentLayout from './layout/CommentLayout';

export { CommentAction, CommentAuthor, CommentTime, CommentEdited, CommentLayout };

export default class Comment extends PureComponent {
  static propTypes = {
    /** An list of CommentAction items rendered as a row of buttons below the comment content */
    actions: PropTypes.node,
    /** A CommentAuthor element containing the name of the comment author. */
    author: PropTypes.node,
    /** The element to display as the Comment avatar - generally an AtlasKit Avatar */
    avatar: PropTypes.node.isRequired,
    /** Nested comments should be provided as children of the Comment */
    children: PropTypes.node,
    /** The main content of the Comment */
    content: PropTypes.node,
    /** The name of a group that a comment is restricted to. Will display in the top items */
    restrictedTo: PropTypes.string,
    /** Enable "optimistic saving" mode, remove actions and show `savingText` prop */
    isSaving: PropTypes.bool,
    /** Text to show when in "optimistic saving" mode */
    savingText: PropTypes.string,
    /** A CommentTime element containing the time to be displayed */
    time: PropTypes.node,
    /** The type of the comment - will be rendered in a lozenge at the top of the Comment */
    type: PropTypes.string,
    /** will be rendered beside the time to show whether the comment is edited or not */
    edited: PropTypes.node,
    /** Indicates whether the component is in an error state - hides actions and time */
    isError: PropTypes.bool,
    /** A list of CommentAction items rendered with a warning icon instead of the actions */
    errorActions: PropTypes.node,
    /** Text to show in the warning icon title */
    errorLabel: PropTypes.string,
  }

  static defaultProps = {
    actions: [],
    restrictedTo: '',
    isSaving: false,
    savingText: 'Sending...',
    isError: false,
    errorActions: [],
    errorIconLabel: '',
  }

  renderRestrictedItem = () => (
    <div className={styles.restricted}>
      <span className={styles.bulletSpacer}>&bull;</span><LockIcon label="restricted" size="small" />Restricted to {this.props.restrictedTo}
    </div>
  );

  renderTopItems = () => {
    const items = (
      [
        this.props.author || null,
        this.props.type ? <Lozenge>{this.props.type}</Lozenge> : null,
        this.props.time && !this.props.isSaving && !this.props.isError ? this.props.time : null,
        this.props.edited || null,
        this.props.isSaving ? this.props.savingText : null,
        this.props.restrictedTo ? this.renderRestrictedItem() : null,
      ]
      .filter(item => !!item)
      .map((item, index) => <div key={index} className={styles.topItem}>{item}</div>)
    );

    return items.length
      ? <div className={styles.topItemsContainer}>{items}</div>
      : null;
  }

  renderBottomItems = () => {
    if (this.props.isSaving) {
      return null;
    }
    return this.props.isError
      ? this.renderErrorActions()
      : this.renderActions();
  }

  renderErrorActions = () => {
    const items = this.props.errorActions.map(
      (item, index) => <div key={index} className={styles.actionsItem}>{item}</div>
    );
    if (items) {
      return (
        <div className={styles.actionsContainer}>
          <span className={styles.errorIcon}>
            <WarningIcon label={this.props.errorLabel} />
          </span>
          {items}
        </div>);
    }
    return null;
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
    const contentClasses = [styles.contentContainer, {
      [styles.optimisticSavingContent]: this.props.isSaving || this.props.isError,
    }];
    return (
      <CommentLayout
        avatar={this.props.avatar}
        content={
          <div>
            {this.renderTopItems()}
            <div className={classNames(contentClasses)}>{this.props.content}</div>
            {this.renderBottomItems()}
          </div>
        }
      >
        {this.props.children}
      </CommentLayout>
    );
  }
}
