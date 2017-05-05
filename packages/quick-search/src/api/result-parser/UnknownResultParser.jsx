import React from 'react';

import OpenIcon from '@atlaskit/icon/glyph/open';

const NO_OP = () => {};

class UnknownResultParser {
  getClickHandler = (
    data,
    actionCallback = NO_OP,
    doneCallback = NO_OP
  ) => (
    () => {
      if (actionCallback) {
        actionCallback(data);
        doneCallback();
      }
    }
  );

  parse = (data, actionCallback, doneCallback) => ({
    href: null,
    icon: <OpenIcon label="Open" />,
    key: `${data.type}.${data.id}`,
    onClick: this.getClickHandler(data, actionCallback, doneCallback),
    subText: null,
    text: data.title,
  });
}

export default new UnknownResultParser();
