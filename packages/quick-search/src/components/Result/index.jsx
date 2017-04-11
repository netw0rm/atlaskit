import React, { PureComponent } from 'react';

import axios, { CancelToken } from 'axios';
import AkAvatar from '@atlaskit/avatar';
import LockCircleIconIcon from '@atlaskit/icon/glyph/lock-circle';
import WorldIconIcon from '@atlaskit/icon/glyph/world';
import { AkDrawerItem } from '@atlaskit/navigation';

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
    const host = 'https://hc-shapeshifter.internal.uswest2.adev.atlassian.io';
    axios.put(
      `${host}/conversations/join`,
      { conversationId: 'a58acf84-cfec-4845-a02c-61d24803f8dc' },
      {
        responseType: 'json',
        // withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          authorization: '',
        },
        cancelToken: new CancelToken((c) => {
          this._cancel = c;
        }),
        validateStatus: status => (
          status < 300 || status === 400
        ),
      }
    ).then((response) => {
      const data = response.data.response.conversation;
      window.location = `/${data.orgId}/chat/${data.id}`;
    });
  }

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
  render() {
    return (
      <AkDrawerItem
        href={''}
        icon={(<AkAvatar src={this.props.meta.avatarUrl} size="small" />)}
        text={this.props.title}
        subText={this.props.subTitle}
        isCompact
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
