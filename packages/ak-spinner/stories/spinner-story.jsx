import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { name } from '../package.json';
import Spinner from '../src';
import StatefulSpinner from './StatefulSpinner';
import ButtonSpinner from './ButtonSpinner';

storiesOf(name, module)
  .add('A default spinner', () => (
    <div>
      <Spinner />
    </div>
  ))
  .add('Baseline alignment', () => (
    <div>
      <div>
        <h1>This &lt;h1&gt; element <Spinner /> is using h800</h1>
        <h2>This &lt;h2&gt; element <Spinner /> is using h700</h2>
        <h3>This &lt;h3&gt; element <Spinner /> is using h600</h3>
        <h4>This &lt;h4&gt; element <Spinner /> is using h500</h4>
        <h5>This &lt;h5&gt; element <Spinner /> is using h400</h5>
        <h6>This &lt;h6&gt; element <Spinner /> is using h300</h6>
      </div>
    </div>
  ))
  .add('Stateful spinner', () => (
    <div style={{ padding: '10px' }}>
      <StatefulSpinner />
    </div>
  ))
  .add('Spinner in a button', () => (
    <div style={{ padding: '10px' }}>
      <ButtonSpinner />
    </div>
  ))
  ;
