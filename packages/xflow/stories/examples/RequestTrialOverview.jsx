import React from 'react';
import { RequestTrial, XFlowProvider } from '@atlaskit/xflow';
import { AtlassianLogo } from '@atlaskit/logo';

export default (
  <XFlowProvider
    productLogo={<AtlassianLogo />}
    requestTrial={{
      accessImage: 'https://aes-artifacts--cdn.us-east-1.prod.public.atl-paas.net/hashed/kEL9zW2kcU8_U4Y_Rc1p3Zmm8J8Jq_JR0ikTg6cEWe8/Multi-Document.svg',
      accessHeading: 'JIRA Software\'s perfect partner',
      accessMessage: 'Create requirements and stay in sync with your entire team.',
      notePrompt: 'Help your site administrator understand why you would like to use this product:',
      notePlaceholder: 'I would like to try this product because…',
    }}
  >
    <RequestTrial />
  </XFlowProvider>
);
