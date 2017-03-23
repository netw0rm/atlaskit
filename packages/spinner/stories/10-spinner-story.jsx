import { storiesOf } from '@kadira/storybook';
import React from 'react';

import StatefulSpinner from './StatefulSpinner'; // eslint-disable-line import/no-duplicates
import { name } from '../package.json';
import Spinner from '../src';
import ButtonSpinner from './ButtonSpinner'; // eslint-disable-line import/no-duplicates

/* eslint-disable import/no-duplicates, import/first */
import statefulSpinnerRaw from '!raw!./StatefulSpinner';
import ButtonSpinnerRaw from '!raw!./ButtonSpinner';
/* eslint-enable import/no-duplicates, import/first */

const defaultImports = { imports: [['Spinner', '@atlaskit/spinner']] };

storiesOf(name, module)
  .addCodeExampleStory('A default spinner', () => (
    <Spinner />
  ), defaultImports)
  .addCodeExampleStory('Baseline alignment', () => (
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
  ), defaultImports)
  .addCodeExampleStory('Spinner sizes', () => (
    <div>
      <div>
        <h3>default</h3>
        <Spinner />
      </div>
      <div>
        <h3>small</h3>
        <Spinner size="small" />
      </div>
      <div>
        <h3>medium</h3>
        <Spinner size="medium" />
      </div>
      <div>
        <h3>large</h3>
        <Spinner size="large" />
      </div>
      <div>
        <h3>xlarge</h3>
        <Spinner size="xlarge" />
      </div>
      <div>
        <h3>custom</h3>
        <Spinner size={35} />
      </div>
    </div>
  ), defaultImports)
  .addCodeExampleStory('Stateful spinner', () => (
    <div style={{ padding: '10px' }}>
      <StatefulSpinner />
    </div>
  ), { scripts: [statefulSpinnerRaw] })
  .addCodeExampleStory('Spinner in a button', () => (
    <div style={{ padding: '10px' }}>
      <ButtonSpinner />
    </div>
  ), { scripts: [ButtonSpinnerRaw] })
  ;
