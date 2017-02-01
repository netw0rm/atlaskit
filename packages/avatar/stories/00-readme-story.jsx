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

const avatarPropDescriptions = {
  presenceBorderColor: 'Used to override the default border color of the presence indicator. Accepts any color argument that the border-color CSS property accepts.',
  presence: 'Indicates a user\'s online status by showing a small icon on the avatar itself. Allowed values: \'online\', \'offline\', \'busy\' or \'none\'',
  size: 'Defines the size of the avatar. Allowed values: \'small\', \'medium\', \'large\', \'xlarge\'.',
  src: 'A url to load an image from (this can also be a base64 encoded image)',
  label: 'Defines the label for the Avatar used by screen readers as fallback content if the image fails to load.',
  children: 'Content to use as a custom presence indicator. Accepts any html content. For best results, it is recommended to use square content with height and width of 100%',
};

const presencePropDescriptions = {
  presence: 'Indicates a user\'s online status by showing a small icon on the avatar itself. Allowed values: \'online\', \'offline\', \'busy\' or \'none\'',
  borderColor: 'Used to override the default border color of the presence indicator. Accepts any color argument that the border-color CSS property accepts.',
  children: 'Content to use as a custom presence indicator (usually not required if consuming Presence separate to Avatar).',
};

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
        <Props component={Avatar} descriptions={avatarPropDescriptions} />
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
        <Props component={Presence} descriptions={presencePropDescriptions} />
      </Readme>
    </div>
  ));
