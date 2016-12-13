import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { InfoIcon } from 'ak-icon';

import Flag, { FlagGroup } from '../src';
import ExampleNavigation from './components/ExampleNavigation';
import { name } from '../package.json';

storiesOf(name, module)
  .addCodeExampleStory('a simple ak-flag', () => (
    <ExampleNavigation>
      <FlagGroup>
        <Flag
          icon={<InfoIcon label="Flag icon" />}
          title="Upload succeeded"
          description="Your image is now safe and sound in the cloud."
        />
        <Flag
          icon={<InfoIcon label="Flag icon" />}
          title="Ticket not found"
          description="We couldn't find the ticket you requested."
        />
        <Flag
          icon={<InfoIcon label="Flag icon" />}
          title="Pipes too full"
          description="The information superhighway seems to be clogged at the moment."
        />
        <Flag
          icon={<InfoIcon label="Flag icon" />}
          title="This is one of the longest titles i have ever seen, and i've seen a lot of titles"
          description="That is a seriously long title, you should probably take it easy on your title length and just use description."
        />
      </FlagGroup>
    </ExampleNavigation>
  ));
