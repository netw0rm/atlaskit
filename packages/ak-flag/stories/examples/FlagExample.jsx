import React from 'react';
import Flag from 'ak-flag';
import { SuccessIcon } from 'ak-icon';

export default (
  <Flag
    id="flag-1"
    key="flag-1"
    icon={
      <SuccessIcon label="Warning" />
    }
    title="The Internet seems to be full"
    description="Somebody forgot to upgrade the storage on the information superhighway."
  />
);
