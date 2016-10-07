import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import AkLozenge from '../src/index';
import React from 'react';
import { name } from '../package.json';
import styles from '../src/shadow.less';

const Lozenge = reactify(AkLozenge);
const lozengeClass = styles.akLozenge;

storiesOf(name, module)
  .add('standard and bold lozenges', () => (
    <div>
      <h2>Standard lozenges</h2>
      <p><Lozenge className={lozengeClass}>Default</Lozenge></p>
      <p><Lozenge className={lozengeClass} appearance="success">Success</Lozenge></p>
      <p><Lozenge className={lozengeClass} appearance="removed">removed</Lozenge></p>
      <p><Lozenge className={lozengeClass} appearance="inprogress">in progress</Lozenge></p>
      <p><Lozenge className={lozengeClass} appearance="new">new</Lozenge></p>
      <p><Lozenge className={lozengeClass} appearance="moved">moved</Lozenge></p>
      <h2>Bold lozenges</h2>
      <p><Lozenge className={lozengeClass} bold>Default</Lozenge></p>
      <p><Lozenge className={lozengeClass} bold appearance="success">Success</Lozenge></p>
      <p><Lozenge className={lozengeClass} bold appearance="removed">removed</Lozenge></p>
      <p><Lozenge className={lozengeClass} bold appearance="inprogress">in progress</Lozenge></p>
      <p><Lozenge className={lozengeClass} bold appearance="new">new</Lozenge></p>
      <p><Lozenge className={lozengeClass} bold appearance="moved">moved</Lozenge></p>
    </div>
  ))
  .addBaselineAligned('baseline alignment', () => (
    <Lozenge className={lozengeClass} bold appearance="new">lozenge</Lozenge>
  ))
  .add('truncation when too wide', () => (
    <div>
      <p>
        <Lozenge className={lozengeClass} appearance="success">
          very very very wide text which truncates
        </Lozenge>
      </p>
      <p>
        <Lozenge className={lozengeClass} appearance="success" bold>
          very very very wide text which truncates
        </Lozenge>
      </p>
    </div>
  ));
