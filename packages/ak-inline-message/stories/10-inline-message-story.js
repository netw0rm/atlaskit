import { storiesOf } from '@kadira/storybook';
import React from 'react';

import InlineMessage from '../src';
import { name } from '../package.json';
import DualExample from './components/DualExample';

storiesOf(name, module)
  .add('simple inline message', () => (
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
  ))
  .add('with long text', () => (
    <div style={{ border: '1px solid #AAA', margin: 32, width: 400 }}>
      <InlineMessage
        title="Cookie tart chocolate bar jelly toffee."
        secondaryText="Carrot cake chocolate bar caramels. Wafer jelly beans toffee chocolate ice cream jujubes candy canes. Sugar plum brownie jelly chocolate cake. Candy canes topping halvah tiramisu caramels dessert brownie jelly-o. Sweet tart cookie cupcake jelly-o jelly caramels bear claw."
      />
    </div>
  ));
