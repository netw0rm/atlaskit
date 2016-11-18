import { storiesOf } from '@kadira/storybook';
import React from 'react';

import Lozenge from '../src';
import { name } from '../package.json';

storiesOf(name, module)
  .add('standard and bold lozenges', () => (
    <div>
      <h2>Standard lozenges</h2>
      <p><Lozenge>Default</Lozenge></p>
      <p><Lozenge appearance="success">Success</Lozenge></p>
      <p><Lozenge appearance="removed">removed</Lozenge></p>
      <p><Lozenge appearance="inprogress">in progress</Lozenge></p>
      <p><Lozenge appearance="new">new</Lozenge></p>
      <p><Lozenge appearance="moved">moved</Lozenge></p>
      <h2>Bold lozenges</h2>
      <p><Lozenge bold>Default</Lozenge></p>
      <p><Lozenge bold appearance="success">Success</Lozenge></p>
      <p><Lozenge bold appearance="removed">removed</Lozenge></p>
      <p><Lozenge bold appearance="inprogress">in progress</Lozenge></p>
      <p><Lozenge bold appearance="new">new</Lozenge></p>
      <p><Lozenge bold appearance="moved">moved</Lozenge></p>
    </div>
  ))
  .addBaselineAligned('baseline alignment', () => (
    <Lozenge bold appearance="new">lozenge</Lozenge>
  ))
  .add('truncation when too wide', () => (
    <div>
      <p>
        <Lozenge appearance="success">
          very very very wide text which truncates
        </Lozenge>
      </p>
      <p>
        <Lozenge appearance="success" bold>
          very very very wide text which truncates
        </Lozenge>
      </p>
    </div>
  ));
