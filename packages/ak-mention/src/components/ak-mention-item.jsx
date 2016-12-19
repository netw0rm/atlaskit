import styles from 'style!./ak-mention-item.less';

import classNames from 'classnames';
import React, { PropTypes, PureComponent } from 'react';

import Avatar from 'ak-avatar';

import MentionPropTypes from '../internal/ak-mention-prop-types';
import { leftClick } from '../util/mouse';

function renderHighlight(className, value, highlights, prefix) {
  const parts = [];
  const prefixText = prefix || '';
  let lastIndex = 0;

  if (highlights) {
    for (let i = 0; i < highlights.length; i++) {
      const h = highlights[i];
      const start = h.start;
      const end = h.end;
      if (start > lastIndex) {
        parts.push({
          v: value.substring(lastIndex, start),
          m: false,
        });
      }
      parts.push({
        v: value.substring(start, end + 1),
        m: true,
      });
      lastIndex = end + 1;
    }
    if (lastIndex < value.length) {
      parts.push({
        v: value.substring(lastIndex, value.length),
        m: false,
      });
    }
  } else {
    parts.push({
      v: value,
      m: false,
    });
  }

  return (
    <span className={className}>
      {prefixText}
      {parts.map((part) => {
        if (part.m) {
          return <b>{part.v}</b>;
        }
        return part.v;
      })}
    </span>
  );
}

function renderTime(time) {
  if (time) {
    return (
      <div className={styles.time}>{time}</div>
    );
  }
  return null;
}

export default class MentionItem extends PureComponent {
  static propTypes = {
    onMouseMove: PropTypes.func,
    onSelection: PropTypes.func,
    ...MentionPropTypes.mentionPropType,
    itemId: PropTypes.string,
  };

  // internal, used for callbacks
  _onMentionSelected = (event) => {
    if (leftClick(event) && this.props.onSelection) {
      event.preventDefault();
      this.props.onSelection(this.props);
    }
  }

  _onMentionMenuItemMouseMove = (event) => {
    if (this.props.onMouseMove) {
      this.props.onMouseMove(event);
    }
  }

  render() {
    const { selected, highlight, avatarUrl, status, time, name, mentionName, id,
      itemId } = this.props;
    const classes = classNames({
      'ak-mention-item': true,
      [styles.akMentionItem]: true,
      [styles.selected]: selected,
    });

    const nameHighlights = highlight && highlight.name;
    const mentionHighlights = highlight && highlight.mentionName;

    return (
      <div
        className={classes}
        onMouseDown={this._onMentionSelected}
        onMouseMove={this._onMentionMenuItemMouseMove}
        data-mention-id={id}
        data-mention-name={mentionName}
        role="option"
        id={itemId}
      >
        <div className={styles.row}>
          <Avatar src={avatarUrl} size="medium" presence={status} />
          <div className={styles.nameSection}>
            {renderHighlight(styles.fullName, name, nameHighlights)}
            {renderHighlight(styles.mentionName, mentionName, mentionHighlights, '@')}
          </div>
          {renderTime(time)}
        </div>
      </div>
    );
  }
}
