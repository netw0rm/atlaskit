import React from 'react';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import Banner from '@atlaskit/banner';

const Icon = <WarningIcon label="Warning icon" secondaryColor="inherit" />;

export default ({ isOpen = true }) => (
  <Banner icon={Icon} isOpen={isOpen} appearance="warning">
    This is an warning banner
  </Banner>
);
