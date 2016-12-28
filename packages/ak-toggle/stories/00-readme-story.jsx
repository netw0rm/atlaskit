import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Props } from 'akutil-readme';
import { name, description } from '../package.json';
import { Toggle } from '../src';

const togglePropDescriptions = {
  isChecked: 'Weather the toggle is checked or not',
};

storiesOf(name, module)
  .add('Readme', () => (
    <div>
      <Readme
        component={name}
        description={description}
      >
        <Props component={Toggle} descriptions={togglePropDescriptions} />
      </Readme>
    </div>
  ));
