import React from 'react';
import Flag, { FlagGroup } from '@atlaskit/flag';
import YellowWarningIcon from '../components/YellowWarningIcon';

export default (
  <FlagGroup
    onDismissed={(dismissedId) => {
      console.info(`${dismissedId} was dismissed`);
    // update your state here to no longer render the dismissed Flag
    }}
  >
    <Flag
      description="Somebody forgot to upgrade the storage on the information superhighway."
      icon={<YellowWarningIcon label="Warning" />}
      id="flag-1"
      key="flag-1"
      title="The Internet seems to be full"
    />
  </FlagGroup>
);
