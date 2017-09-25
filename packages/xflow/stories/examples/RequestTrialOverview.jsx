import React from 'react';
import { RequestTrial, XFlowProvider } from '@atlaskit/xflow';
import { AtlassianLogo } from '@atlaskit/logo';

export default (
  <XFlowProvider
    productLogo={<AtlassianLogo />}
    requestTrial={{
      accessImage: 'https://aes-artifacts--cdn.us-east-1.prod.public.atl-paas.net/hashed/kEL9zW2kcU8_U4Y_Rc1p3Zmm8J8Jq_JR0ikTg6cEWe8/Multi-Document.svg',
      accessHeading: 'Jira\'s perfect partner',
      accessMessage: 'Confluence helps your team create, capture and collaborate on project documentation and it integrates perfectly with Jira.',
      notePrompt: 'Send a quick note telling your site admin why you\'re keen to start a trial:',
      notePlaceholder: 'Hi! I\'d like to try Confluence. It helps give the team more context on anything happening in Jira - and it\'s free for 30 days.',
      notePlaceholderShort: 'Hi! I\'d like to try Confluence.',
    }}
  >
    <RequestTrial />
  </XFlowProvider>
);
