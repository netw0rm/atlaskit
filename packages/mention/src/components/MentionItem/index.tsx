import * as React from 'react';
import { MouseEvent } from '@types/react';
import { PureComponent } from 'react';
import Avatar from '@atlaskit/avatar';
import Lozenge from '@atlaskit/lozenge';
import LockCircleIcon from '@atlaskit/icon/glyph/lock-circle';
import Tooltip from '@atlaskit/tooltip';
import NumericAvatar from '../NumericAvatar';

import {
  AvatarStyle,
  FullNameStyle,
  InfoSectionStyle,
  MentionItemStyle,
  NicknameStyle,
  NameSectionStyle,
  AccessSectionStyle,
  RowStyle,
  TimeStyle,
} from './styles';

type ReactComponentConstructor = new() => React.Component<any, any>;

import { HighlightDetail, MentionDescription, OnMentionEvent, Presence, isRestricted } from '../../types';
import { leftClick } from '../../util/mouse';

/** Match URL schemes of the form 'numvatar:38' */
const numvatarRegex = /^numvatar:(\d+)$/;

interface Part {
  value: string;
  matches: boolean;
}

// tslint:disable:next-line variable-name
function renderHighlight(ReactComponent: ReactComponentConstructor, value?: string, highlights?: HighlightDetail[], prefix?: string) {
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
    <ReactComponent>
      {prefixText}
      {parts.map((part) => {
        if (part.matches) {
          return <b>{part.value}</b>;
        }
        return part.value;
      })}
    </ReactComponent>
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
      <TimeStyle>{time}</TimeStyle>
    );
  }
  return null;
}

export interface Props {
  mention: MentionDescription;
  selected?: boolean;
  onMouseMove?: OnMentionEvent;
  onSelection?: OnMentionEvent;
}

export default class MentionItem extends PureComponent<Props, undefined> {

  // internal, used for callbacks
  private onMentionSelected = (event: MouseEvent<any>) => {
    if (leftClick(event) && this.props.onSelection) {
      event.preventDefault();
      this.props.onSelection(this.props.mention, event);
    }
  }

  private onMentionMenuItemMouseMove = (event: MouseEvent<any>) => {
    if (this.props.onMouseMove) {
      this.props.onMouseMove(this.props.mention, event);
    }
  }

  /**
   * Check the URL for the avatar. If it matches the 'numvatarRegex' then we are going to display a
   * NumericAvatar component instead of a usual image or default avatar.
   */
  private static getAvatar = (url: string | undefined, presence: Presence | undefined, restricted: boolean) => {
    const status = presence ? presence.status : undefined;

    let avatar: JSX.Element;

    const match = url ? numvatarRegex.exec(url) : null;
    if (match) {
      const num = parseInt(match[1],10);
      avatar = (<NumericAvatar num={num} />);
    } else {
      avatar = (<Avatar src={url} size="medium" presence={status} />)
    }

    return (
      <AvatarStyle restricted={restricted}>{avatar}</AvatarStyle>
    );
  }

  render() {
    const { mention, selected } = this.props;
    const { id, highlight, avatarUrl, presence, name, mentionName, nickname, lozenge, accessLevel } = mention;
    const { time } = presence || {} as Presence;
    const restricted = isRestricted(accessLevel);

    const nameHighlights = highlight && highlight.name;
    const nicknameHighlights = highlight && highlight.nickname;

    const avatarSection = MentionItem.getAvatar(avatarUrl, presence, restricted);

    return (
      <MentionItemStyle
        selected={selected}
        onMouseDown={this.onMentionSelected}
        onMouseMove={this.onMentionMenuItemMouseMove}
        data-mention-id={id}
        data-mention-name={mentionName}
      >
        <RowStyle>
          {avatarSection}
          <NameSectionStyle restricted={restricted}>
            {renderHighlight(FullNameStyle, name, nameHighlights)}
            {renderHighlight(NicknameStyle, nickname, nicknameHighlights, '@')}
          </NameSectionStyle>
          <InfoSectionStyle restricted={restricted}>
            {renderLozenge(lozenge)}
            {renderTime(time)}
          </InfoSectionStyle>
          {restricted ?
            <Tooltip
                description={`${name} won't be notified as they have no access`}
                position="left"
            >
              <AccessSectionStyle>
                <LockCircleIcon label="No access"/>
              </AccessSectionStyle>
            </Tooltip> : null
          }
        </RowStyle>
      </MentionItemStyle>
    );
  }
}
