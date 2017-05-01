import React from 'react';
import HelpIcon from 'ak-icon/glyph/help';
import Banner from '../src';

const Icon = <HelpIcon label="Info icon" />;
const WarningBanner = () => (
  <Banner
    icon={Icon}
    isOpen
  >
    This is a warning banner
  </Banner>

);

export default WarningBanner;
