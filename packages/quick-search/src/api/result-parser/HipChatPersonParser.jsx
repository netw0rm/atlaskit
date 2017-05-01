import React from 'react';
import AkAvatar from '@atlaskit/avatar';
import styled from 'styled-components';
import { akColorN100 } from '@atlaskit/util-shared-styles';

const SecondaryTitle = styled.span`
  color: ${akColorN100}
`;

const NO_OP = () => {};

class HipChatPersonParser {
  getClickHandler = (
    data,
    actionCallback = NO_OP,
    doneCallback = NO_OP
  ) => (
    () => {
      if (actionCallback) {
        actionCallback({
          uuid: data.id,
          type: 'direct',
        });
        doneCallback();
      }
    }
  );

  getMainText = (data) => {
    if (data.meta.mentionName) {
      return (
        <div>
          {data.title}
          <SecondaryTitle>{` @${data.meta.mentionName}`}</SecondaryTitle>
        </div>
      );
    }
    return data.title;
  }

  parse = (data, actionCallback, doneCallback) => ({
    href: null,
    icon: <AkAvatar src={data.meta.avatarUrl} size="small" />,
    key: `hc.person.${data.id}`,
    onClick: this.getClickHandler(data, actionCallback, doneCallback),
    subText: null,
    text: this.getMainText(data),
  });
}

export default new HipChatPersonParser();
