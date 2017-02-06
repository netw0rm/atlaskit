import * as React from 'react';
import { MouseEventHandler, MouseEvent } from '@types/react';
import { PureComponent } from 'react';
import * as styles from './styles';

import * as classNames from 'classnames';

import Avatar from '@atlaskit/avatar';
import Lozenge from '@atlaskit/lozenge';

import { Mention, HighlightDetail } from '../../types';
import { leftClick } from '../../util/mouse';

interface Part {
  value: string;
  matches: boolean;
}

function renderHighlight(className?: string, value?: string, highlights?: HighlightDetail[], prefix?: string) {
  if (!value) {
    return null;
  }

  const parts: Part[] = [];
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

function renderLozenge(lozenge) {
  if (lozenge) {
    return <Lozenge>{lozenge}</Lozenge>;
  }
  return null;
}

function renderTime(time) {
  if (time) {
    return (
      <div className={styles.time}>{time}</div>
    );
  }
  return null;
}

export interface OnSelection {
  (mention: Mention) : void;
}

export interface Props extends Mention {
  onMouseMove: MouseEventHandler<MouseEvent<any>>;
  onSelection: OnSelection;
}

export default class MentionItem extends PureComponent<Props, undefined> {
  // internal, used for callbacks
  private onMentionSelected = (event: MouseEvent<any>) => {
    if (leftClick(event) && this.props.onSelection) {
      event.preventDefault();
      this.props.onSelection(this.props);
    }
  }

  private onMentionMenuItemMouseMove = (event: MouseEvent<any>) => {
    if (this.props.onMouseMove) {
      this.props.onMouseMove(event);
    }
  }

  render() {
    const { selected, highlight, avatarUrl, status, time, name, mentionName, lozenge } = this.props;
    const classes = classNames({
      'ak-mention-item': true,
      [styles.mentionItem]: true,
      [styles.selected]: selected,
    });

    const nameHighlights = highlight && highlight.name;
    const mentionHighlights = highlight && highlight.mentionName;

    return (
      <div
        className={classes}
        onMouseDown={this.onMentionSelected}
        onMouseMove={this.onMentionMenuItemMouseMove}
        data-mention-id={this.props.id}
        data-mention-name={this.props.mentionName}
      >
        <div className={styles.row}>
          <span className={styles.akAvatar}>
            <Avatar src={avatarUrl} size="medium" presence={status} />
          </span>
          <div className={styles.nameSection}>
            {renderHighlight(styles.fullName, name, nameHighlights)}
            {renderHighlight(styles.mentionName, mentionName, mentionHighlights, '@')}
          </div>
          <div className={styles.infoSection}>
            {renderLozenge(lozenge)}
            {renderTime(time)}
          </div>
        </div>
      </div>
    );
  }
}
