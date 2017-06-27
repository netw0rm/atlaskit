import React from 'react';
import { RequestTrial, CrossAcquisitionProvider } from '@atlaskit/cross-acquisition';
import AtlassianLogo from '@atlaskit/logo';

export default (
  <CrossAcquisitionProvider
    productLogo={<AtlassianLogo />}
    requestTrial={{
      accessBanner: 'https://placehold.it/352x214',
      accessHeading: 'Ask your admin for access',
      accessMessage: 'Send a request for your admin to activate this product',
      notePrompt: 'Help your site administrator understand why you would like to use this product:',
      notePlaceholder: 'I would like to try this product because…',
    }}
  >
    <RequestTrial />
  </CrossAcquisitionProvider>
);
