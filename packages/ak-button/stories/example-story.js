import { storiesOf, action } from '@kadira/storybook';
import reactify from 'akutil-react';
import AkButtonTemplate from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';
// import styles from 'style!./../src/host.less'; // eslint-disable-line import/no-unresolved

const AkButton = reactify(AkButtonTemplate, {
  React,
  ReactDOM,
});

storiesOf(name, module)
  .add('a default ak-button', () => (
    <AkButton label="Button" />
  ))
  .add('a primary ak-button', () => (
    <AkButton label="Button" primary />
  ))
  .add('an ak-button that emits an action when it is clicked', () => (
    <AkButton id="myComponent" label="Button" onClick={action('clicking the WebComponent')} />
  ));
