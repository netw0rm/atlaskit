import React from 'react';
import AkAvatar from '@atlaskit/avatar';
import LockCircleIcon from '@atlaskit/icon/glyph/lock-circle';
import WorldIcon from '@atlaskit/icon/glyph/world';
import HipChatIcon from '@atlaskit/icon/glyph/hipchat';

const NO_OP = () => {};

class HipChatRoomParser {
  resolveRoomAvatar = (data) => {
    if (data.meta && data.meta.avatarUrl) {
      return (<AkAvatar src={data.meta.avatarUrl} size="small" />);
    }
    if (data.meta && data.meta.privacy) {
      return data.meta.privacy === 'private'
        ? <LockCircleIcon label="Private room" />
        : <WorldIcon label="Public room" />;
    }
    return <HipChatIcon label="HipChat room" />;
  }

  getClickHandler = (
    data,
    actionCallback = NO_OP,
    doneCallback = NO_OP
  ) => (
    () => {
      if (actionCallback) {
        actionCallback({
          uuid: data.meta.conversation_id,
          type: 'group',
        });
        doneCallback();
      }
    }
  );

  parse = (data, actionCallback, doneCallback) => ({
    href: null,
    icon: this.resolveRoomAvatar(data),
    key: `hc.room.${data.id}`,
    onClick: this.getClickHandler(data, actionCallback, doneCallback),
    subText: null,
    text: data.title,
  });
}

export default new HipChatRoomParser();
