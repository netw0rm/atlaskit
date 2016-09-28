import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { name } from '../package.json';
import slotComponent from './slot-children/slot-component';
import reactify from 'akutil-react';

const SlotComponent = reactify(slotComponent, {});

storiesOf(name, module)
  .add('Select slot children', () => (
    <div>
      <SlotComponent>
        <span is slot="red">Red slot (should be red)</span>
        <span is slot="blue">Blue slot (should be blue)</span>
        <span>Default slot (should be green)</span>
        <span>Default slot (should be green)</span>
      </SlotComponent>
    </div>
  ));
