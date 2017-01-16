import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { name } from '../package.json';
import DualExample from './components/DualExample';

storiesOf(name, module)
  .add('simple ak-inline-message', () => (
    <div style={{ padding: 32 }}>
      <DualExample
        type="connectivity"
        title="JIRA Service Desk"
        secondaryText="Authenticate to see more information"
      />

      <DualExample
        type="confirmation"
        title="JIRA Service Desk"
        secondaryText="Authenticate to see more information"
      />

      <DualExample
        type="info"
        title="JIRA Service Desk"
        secondaryText="Authenticate to see more information"
      />

      <DualExample
        type="warning"
        title="JIRA Service Desk"
        secondaryText="Authenticate to see more information"
      />

      <DualExample
        type="error"
        title="JIRA Service Desk"
        secondaryText="Authenticate to see more information"
      />
    </div>
  ));
