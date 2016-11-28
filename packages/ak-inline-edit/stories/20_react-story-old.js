import { storiesOf } from '@kadira/storybook';
import React from 'react';
import ReactField from './ReactField';

import { name } from '../package.json';

const formStyle = {
  padding: '20px',
  backgroundColor: 'white',
  width: '500px',
};


storiesOf(name, module)
  .add('extending fieldBase using React', () => (
    <div>
      <form action="" style={formStyle}>
        <h2>My Form</h2>
        <div>
          <p>
            This component is made by extending FieldBase using React.
          </p>
          <p>
            It&#39;s very similar to what is described in the readme file for FieldBase.
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
  ));
