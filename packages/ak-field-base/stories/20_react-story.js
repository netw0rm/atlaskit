import { storiesOf } from '@kadira/storybook';
import ReactField from './ReactField';
import React from 'react';
import { name } from '../package.json';

const formStyle = (width = 300) => ({
  padding: '20px',
  backgroundColor: 'white',
  width: `${width}px`,
});

const story = () => (
  <div>
    <form action="" style={formStyle(500)}>
      <h2>My Form</h2>
      <div>
        <p>
          This component is made by extending FieldBase using react.
        </p>
        <p>
          It's very similar to what is descibed in the readme file for FieldBase.
        </p>
      </div>
      <br />
      <ReactField
        value="Atlaskit"
        waiting={false}
        editing={false}
        label="Even length strings only!"
      />
    </form>
  </div>
);

storiesOf(name, module)
  .add('extending fieldBase using React', story)
;
