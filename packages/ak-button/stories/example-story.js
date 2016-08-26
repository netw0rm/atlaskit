import { storiesOf, action } from '@kadira/storybook';
import reactify from 'akutil-react';
import AkButtonTemplate, { APPEARANCE } from '../src/index';
const { React, ReactDOM } = window;
import AkButtonStates from './AkButtonStates';
import { name } from '../package.json';

const AkButton = reactify(AkButtonTemplate, {
  React,
  ReactDOM,
});

storiesOf(name, module)
  .add('a standard ak-button', () => (
    <AkButton>Button</AkButton>
  ))
  .add('a primary ak-button', () => (
    <AkButton appearance={APPEARANCE.PRIMARY}>Primary Button</AkButton>
  ))
  .add('a disabled ak-button', () =>
    <AkButton disabled onclick={action('clicking the WebComponent')}>
      Button
    </AkButton>
  )
  .add('a subtle ak-button', () =>
    <AkButton appearance={APPEARANCE.SUBTLE} >
      Button
    </AkButton>
  )
  .add('a selected button', () =>
    <AkButton selected>
      Button
    </AkButton>
  )
  .add('a link button', () =>
    <AkButton appearance={APPEARANCE.LINK}>
      Button
    </AkButton>
  )
  .add('an ak-button that emits an action when it is clicked', () => (
    <AkButton id="myComponent" onClick={action('clicking the WebComponent')}>Button</AkButton>
  ))
  .add('compact buttons with all attributes', () =>
    <div>
      <style>{"ak-button {margin-left: 10px;}"}</style>
      <AkButton compact>
        Button
      </AkButton>
      <AkButton compact appearance="primary">
        Button
      </AkButton>
      <AkButton compact appearance="subtle">
        Button
      </AkButton>
      <AkButton compact selected>
        Button
      </AkButton>
      <AkButton compact disabled onclick={action('clicking the WebComponent')}>
        Button
      </AkButton>
    </div>
  )
  .add('an ak-button that emits an action when it is clicked', () => (
    <AkButton id="myComponent" onClick={action('clicking the WebComponent')}>Button</AkButton>
  ))
  .add('a button that can change its attributes', () =>
    <AkButtonStates />
  );
