import React from 'react';
import HelpIcon from 'ak-icon/glyph/warning';
import Banner from '../src';

const ErrorBanner = () => (
  <Banner
    icon={<HelpIcon label="Info icon" />}
    isOpen
    appearance="error"
  >
    This is an error banner
  </Banner>
);

export default ErrorBanner;
