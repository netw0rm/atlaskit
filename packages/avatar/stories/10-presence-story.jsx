import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Props } from '@atlaskit/util-readme';

import { name } from '../package.json';
import { Presence } from '../src';

import PresenceOverviewExample from './examples/PresenceOverview'; // eslint-disable-line import/no-duplicates

/* eslint-disable import/first, import/no-duplicates */
import PresenceOverviewExampleRaw from '!raw!./examples/PresenceOverview';
/* eslint-enable import/first, import/no-duplicates */

const presenceWrapperStyles = {
  height: '30px',
  width: '30px',
};

storiesOf(name, module)
  .add('Presence — README', () => (
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
  ))
  .add('Presence — basic example', () => (
    <div>
      <p>
        By default presences will stretch to fill their parents (Try resizing container below).
      </p>
      <p>
        It is recommended to always have a wrapping div around presences when consuming
        them separately to Avatars.
      </p>
      <div
        style={{
          height: '40px',
          marginTop: '16px',
          overflow: 'hidden',
          resize: 'both',
          width: '40px',
        }}
      >
        <Presence presence="online" />
      </div>
    </div>
  ))
  .addCodeExampleStory('Presence — custom ', () => (
    <div>
      <p>
        Aside from the default supported presences, you can also create custom presences by passing
        HTML to the Presence component. This could be anything from an image, an svg or a
        styled div.
      </p>
      <p>
        For best results it is recommended that whatever you pass in is square and has it&#39;s
        height and width set to 100%.
      </p>
      <p style={presenceWrapperStyles}>
        <Presence presence="online" />
      </p>
      <p style={presenceWrapperStyles}>
        <Presence presence="busy" />
      </p>
      <p style={presenceWrapperStyles}>
        <Presence>
          <div style={{ height: '100%', width: '100%', backgroundColor: 'rebeccapurple' }} />
        </Presence>
      </p>
    </div>
  ))
  .addCodeExampleStory('Presence — custom border-color', () => (
    <div>
      <p>
        By default presences will display a white border (2px). This can be overridden with the
        borderColor prop.
      </p>
      <p>
        The border color prop will accept any string that the CSS border-color (hex values, rgba,
        transparent, etc).
      </p>
      <p style={presenceWrapperStyles}>
        <Presence presence="online" />
      </p>
      <p style={presenceWrapperStyles}>
        <Presence presence="online" borderColor="red" />
      </p>
      <p style={presenceWrapperStyles}>
        <Presence presence="online" borderColor="rgba(0, 0, 255, 0.2)" />
      </p>
      <p style={presenceWrapperStyles}>
        <Presence presence="online" borderColor="transparent" />
      </p>
    </div>
  ));
