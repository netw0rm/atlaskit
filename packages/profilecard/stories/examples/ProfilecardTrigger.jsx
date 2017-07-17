import React from 'react';
import { AkProfilecardTrigger } from '@atlaskit/profilecard';
import { getMockProfileClient } from '../util';

const mockClient = getMockProfileClient();

const canvasStyles = {
  paddingBottom: '360px',
};

export default (
  <div style={canvasStyles}>
    <AkProfilecardTrigger
      position="bottom left"
      cloudId="DUMMY-CLOUDID"
      userId="2"
      resourceClient={mockClient}
      actions={[
        {
          label: 'View profile',
          callback: () => {},
        },
      ]}
    >
      <strong>Hover Over Me</strong>
    </AkProfilecardTrigger>

    &hellip;

    <AkProfilecardTrigger
      position="bottom left"
      cloudId="DUMMY-CLOUDID"
      userId="2"
      resourceClient={mockClient}
      trigger="click"
      actions={[
        {
          label: 'View profile',
          callback: () => {},
        },
      ]}
    >
      <strong>Click me</strong>
    </AkProfilecardTrigger>
  </div>
);
