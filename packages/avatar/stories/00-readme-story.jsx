import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Props } from '@atlaskit/util-readme';

import AvatarOverviewExample from './examples/AvatarOverview'; // eslint-disable-line import/no-duplicates
import PresenceOverviewExample from './examples/PresenceOverview'; // eslint-disable-line import/no-duplicates

/* eslint-disable import/first, import/no-duplicates */
import AvatarOverviewExampleRaw from '!raw!./examples/AvatarOverview';
import PresenceOverviewExampleRaw from '!raw!./examples/PresenceOverview';
/* eslint-enable import/first, import/no-duplicates */

import { name, description } from '../package.json';
import Avatar, { Presence } from '../src';

storiesOf(name, module)
  .add('📖 Avatar readme', () => (
    <div>
      <Readme
        component={name}
        description={description}
      >
        <Code code={AvatarOverviewExampleRaw}>
          {AvatarOverviewExample}
        </Code>
        <Props component={Avatar} />
      </Readme>
    </div>
  ))
  .add('📖 Presence readme', () => (
    <div>
      <Readme
        component={name}
        description="A component used to convey the online status of a user."
      >
        <Code code={PresenceOverviewExampleRaw}>
          {PresenceOverviewExample}
        </Code>
        <Props component={Presence} />
      </Readme>
    </div>
  ));
