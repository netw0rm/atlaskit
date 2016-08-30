import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import AkLozenge from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';
import hostStyles from 'style!./../src/host.less';

const Lozenge = reactify(AkLozenge, {
  React,
  ReactDOM,
});
const lozengeClass = hostStyles.akLozenge;

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
  .add('baseline alignment', () => (
    <div>
      <h1>heading <Lozenge className={lozengeClass} bold appearance="new">lozenge</Lozenge></h1>
      <p>Content <Lozenge className={lozengeClass} bold appearance="new">lozenge</Lozenge>.</p>
    </div>
  ))
  .add('truncation when too wide', () => (
    <div>
      <p>
        <Lozenge className={lozengeClass} appearance="success">
          very wide text which truncates
        </Lozenge>
      </p>
      <p>
        <Lozenge className={lozengeClass} appearance="success" bold>
          very wide text which truncates
        </Lozenge>
      </p>
    </div>
  ));
