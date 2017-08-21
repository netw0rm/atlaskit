import React from 'react';
import { RequestTrial, XFlowProvider } from '@atlaskit/xflow';
import { AtlassianLogo } from '@atlaskit/logo';

export default (
  <XFlowProvider
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
  </XFlowProvider>
);
