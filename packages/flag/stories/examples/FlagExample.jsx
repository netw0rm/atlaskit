import React from 'react';
import Flag from 'ak-flag';
import { SuccessIcon } from 'ak-icon';

export default (
  <Flag
    description="Somebody forgot to upgrade the storage on the information superhighway."
    icon={
      <SuccessIcon label="Warning" />
    }
    id="flag-1"
    key="flag-1"
    title="The Internet seems to be full"
  />
);
