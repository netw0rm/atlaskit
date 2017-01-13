import { storiesOf, action } from '@kadira/storybook';
import React from 'react';

import AnimationDemo from './components/AnimationDemo';
import { name } from '../package.json';
import Flag from '../src';
import GreenSuccessIcon from './components/GreenSuccessIcon';

storiesOf(name, module)
  .add('Interactive flag example', () => (
    <AnimationDemo />
  ))
  .addCodeExampleStory('Flag dumb component without FlagGroup', () => (
    <div style={{ padding: 24 }}>
      <p>
        This is the Flag component. It is a dumb component as it does not maintain any state, and
        all animations are managed by the parent FlagGroup component.
      </p>
      <p>
        <Flag
          id="1"
          key="1"
          icon={<GreenSuccessIcon />}
          title="Welcome to the jungle"
          description="We got fun an games. We got everything you want honey, we know the names."
          actions={[
            { content: 'Show me', onClick: action('Show me clicked') },
            { content: 'No thanks', onClick: action('No thanks clicked') },
          ]}
        />
      </p>
    </div>
  ));
