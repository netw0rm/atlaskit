import React from 'react';
import HelpIcon from 'ak-icon/glyph/help';
import Banner from '../src';

const WarningBanner = () => (
  <Banner
    icon={<HelpIcon label="Info icon" />}
    isOpen
  >
    This is a warning banner
  </Banner>

);

export default WarningBanner;
