import { storiesOf } from '@kadira/storybook';
import React from 'react';
import AkToggle from '../src';
import { name } from '../package.json';

const containerStyles = {
  margin: 10,
  display: 'inline-flex',
  flexDirection: 'column',
};

storiesOf(name, module)
  .add('with no properties', () =>
    <div style={containerStyles}>
      <AkToggle label="wifi enabled" />
    </div>
  )
  .add('with large size', () =>
    <div style={containerStyles}>
      <AkToggle label="wifi enabled" size="large" />
    </div>
  )
  .add('with checked state by default', () =>
    <div style={containerStyles}>
      <AkToggle isDefaultChecked label="wifi enabled" />
    </div>
  )
  .add('with disabled state', () =>
    <div style={containerStyles}>
      <AkToggle isDisabled />
      <AkToggle size="large" isDisabled />
      <AkToggle isDefaultChecked isDisabled />
      <AkToggle size="large" isDefaultChecked isDisabled />
    </div>
  )
  .add('within a form', () =>
    <div style={containerStyles}>
      <form
        action={'//httpbin.org/get'}
        method="get"
        style={{ backgroundColor: 'white', padding: '40px', width: '500px' }}
        target="myFrame"
      >
        <h2>Submit test</h2>
        <p>Note: Ensure that you are not using HTTPS for this story.</p>
        <AkToggle name="test1" value="1" label="option 1" />
        <AkToggle name="test2" value="foo" label="option 2" />
        <AkToggle isDisabled name="test3" value="123" label="option 3" />
        <p>
          <button type="submit">Submit</button>
        </p>
      </form>
      <iframe src="" name="myFrame" style={{ width: '50%', height: '300px' }} />
    </div>
  );
