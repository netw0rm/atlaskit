import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import AkToggle from '../src';
import { name } from '../package.json';

const containerStyles = {
  margin: 10,
  display: 'inline-flex',
  flexDirection: 'column',
};

storiesOf(name, module)
  .add('with checked state', () =>
    <div style={containerStyles}>
      <AkToggle isDefaultChecked />
    </div>
  )
  .add('with disabled state', () =>
    <div style={containerStyles}>
      <AkToggle isDisabled />
      <AkToggle isDefaultChecked isDisabled />
    </div>
  );
