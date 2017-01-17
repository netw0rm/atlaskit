import { storiesOf } from '@kadira/storybook';
import React from 'react';
import FieldText from 'ak-field-text';
import { akGridSize } from 'akutil-shared-styles';

import InlineMessage from '../src';
import { name } from '../package.json';
import DualExample from './components/DualExample';

const margin = 4 * parseInt(akGridSize, 10);

storiesOf(name, module)
  .add('simple inline message', () => (
    <div style={{ margin }}>
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
  .addCodeExampleStory('with long text', () => (
    <div style={{ border: '1px solid #AAA', margin, width: 400 }}>
      <InlineMessage
        title="Cookie tart chocolate bar jelly toffee."
        secondaryText="Carrot cake chocolate bar caramels. Wafer jelly beans toffee chocolate ice cream jujubes candy canes. Sugar plum brownie jelly chocolate cake. Candy canes topping halvah tiramisu caramels dessert brownie jelly-o. Sweet tart cookie cupcake jelly-o jelly caramels bear claw."
      />
    </div>
  ))
  .addCodeExampleStory('focus style', () => (
    <div style={{ margin }}>
      <p>
        <FieldText placeholder="Click me, then tab" />
      </p>
      <p>
        <InlineMessage
          title="Cookie tart chocolate bar jelly toffee"
          secondaryText="Carrot cake chocolate bar caramels"
        />
      </p>
    </div>
  ));
