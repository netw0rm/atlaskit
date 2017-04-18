import React, { PureComponent } from 'react';
import styled from 'styled-components';

import AkAvatar from '@atlaskit/avatar';
import LockCircleIconIcon from '@atlaskit/icon/glyph/lock-circle';
import WorldIconIcon from '@atlaskit/icon/glyph/world';
import { AkDrawerItem } from '@atlaskit/navigation';
import { akColorN100 } from '@atlaskit/util-shared-styles';

const SecondaryTitle = styled.span`
  color: ${akColorN100}
`;

export default class Result extends PureComponent {
  // static propTypes = {
  //   meta: PropTypes.arrayOf(
  //     PropTypes.shapeOf({
  //       key: PropTypes.string.isRequired,
  //       value: PropTypes.string.isRequired,
  //     })
  //   ),
  // }
}

export class HipChatRoomResult extends Result {
  resolveRoomAvatar() {
    if (this.props.meta && this.props.meta.avatarUrl) {
      return (<AkAvatar src={this.props.meta.avatarUrl} size="small" />);
    }
    if (this.props.meta && this.props.meta.privacy) {
      return this.props.meta.privacy === 'private' ? <LockCircleIconIcon label="Private room" /> : <WorldIconIcon label="Public room" />;
    }
    return '[HcRoom]';
  }

  handleClick = () => {
    if (this.props.callback) {
      this.props.callback({
        uuid: this.props.meta.conversation_id,
        type: 'group',
      });
      this.terminateSearch();
    }
  }

  terminateSearch = () =>
    this.props.onSearchTerminate && this.props.onSearchTerminate();

  render() {
    return (
      <AkDrawerItem
        href={''}
        onClick={this.handleClick}
        icon={this.resolveRoomAvatar()}
        text={this.props.title}
        subText={this.props.subTitle}
        isCompact
      />
    );
  }
}

export class HipChatPersonResult extends Result {
  handleClick = () => {
    if (this.props.callback) {
      this.props.callback({
        uuid: this.props.id,
        type: 'direct',
      });
      this.terminateSearch();
    }
  }

  terminateSearch = () =>
    this.props.onSearchTerminate && this.props.onSearchTerminate();

  render() {
    const mainText = (
      <div>
        {this.props.title}
        <SecondaryTitle>{` @${this.props.meta.mentionName}`}</SecondaryTitle>
      </div>
    );
    return (
      <AkDrawerItem
        href={''}
        icon={(<AkAvatar src={this.props.meta.avatarUrl} size="small" />)}
        isCompact
        onClick={this.handleClick}
        subText={this.props.subTitle}
        text={mainText}
      />
    );
  }
}

export class UnknownResult extends Result {
  render() {
    return (
      <AkDrawerItem
        href={''}
        icon={'[unknown]'}
        text={this.props.title}
        subText={this.props.subTitle}
        isCompact
      />
    );
  }
}
