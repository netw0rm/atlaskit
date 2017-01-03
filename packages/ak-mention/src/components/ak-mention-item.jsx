import styles from 'style!./ak-mention-item.less';

import classNames from 'classnames';
import React, { PropTypes, PureComponent } from 'react';

import Avatar from 'ak-avatar';

import MentionPropTypes from '../internal/ak-mention-prop-types';
import { leftClick } from '../util/mouse';

function renderHighlight(className, value, highlights, prefix) {
  if (!value) {
    return null;
  }

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
          value: value.substring(lastIndex, start),
          matches: false,
        });
      }
      parts.push({
        value: value.substring(start, end + 1),
        matches: true,
      });
      lastIndex = end + 1;
    }
    if (lastIndex < value.length) {
      parts.push({
        value: value.substring(lastIndex, value.length),
        matches: false,
      });
    }
  } else {
    parts.push({
      value,
      matches: false,
    });
  }

  return (
    <span className={className}>
      {prefixText}
      {parts.map((part) => {
        if (part.matches) {
          return <b>{part.value}</b>;
        }
        return part.value;
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
    const { selected, highlight, avatarUrl, status, time, name, mentionName } = this.props;
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
        data-mention-id={this.props.id}
        data-mention-name={this.props.mentionName}
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
