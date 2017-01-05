import React from 'react';
import Flag, { FlagGroup } from 'ak-flag';
import { SuccessIcon } from 'ak-icon';

export default (
  <FlagGroup
    onDismissed={(dismissedId) => {
      console.log(`${dismissedId} was dismissed`);
      // update your state here to no longer render the dismissed Flag
    }}
  >
    <Flag
      id="flag-1"
      key="flag-1"
      icon={
        <SuccessIcon label="Warning" />
      }
      title="The Internet seems to be full"
      description="Somebody forgot to upgrade the storage on the information superhighway."
    />
  </FlagGroup>
);
