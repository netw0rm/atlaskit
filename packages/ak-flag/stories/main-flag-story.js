import { storiesOf } from '@kadira/storybook';
import React from 'react';

import Flag, { FlagGroup } from '../src';
import ExampleNavigation from './components/ExampleNavigation';
import PurpleInfoIcon from './components/PurpleInfoIcon';
import { name } from '../package.json';

storiesOf(name, module)
  .addCodeExampleStory('a simple ak-flag', () => (
    <ExampleNavigation>
      <FlagGroup>
        <Flag
          icon={<PurpleInfoIcon />}
          title="Upload succeeded"
          description="Your image is now safe and sound in the cloud."
        />
        <Flag
          icon={<PurpleInfoIcon />}
          title="Flag without description"
        />
        <Flag
          icon={<PurpleInfoIcon />}
          title="Pipes too full"
          description="The information superhighway seems to be clogged at the moment."
        />
        <Flag
          icon={<PurpleInfoIcon />}
          title="This is one of the longest titles i have ever seen, and i've seen a lot of titles"
          description="That is a seriously long title, you should probably take it easy on your title length and just use description."
        />
      </FlagGroup>
    </ExampleNavigation>
  ));
