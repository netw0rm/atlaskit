import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Avatar from '@atlaskit/avatar';

import Component from '../src/index';
import { name } from '../package.json';

const imports = [
  ['React', 'react'],
  ['Tag', '@atlaskit/tag'],
];

storiesOf(name, module)
  .addCodeExampleStory('overview', () => (
    <div>
      <Component
        text="Text only"
      />
      <Component
        href="https://some.link"
        text="Linked text"
      />
      <Component
        text="Removable"
        removeButtonText="Remove me"
      />
      <Component
        href="https://some.link"
        text="Removable & linked"
        removeButtonText="Remove me"
      />
      <Component
        text="Overflowing text that will be cut off"
      />
      <Component
        text="Text with button that will be cut off"
        removeButtonText="Remove me"
      />
      <Component
        appearance="rounded"
        text="A. Cool Name"
        elemBefore={<Avatar size="xsmall" />}
        removeButtonText="Remove me"
      />
      <Component
        appearance="rounded"
        href="https://some.link"
        text="A. Cool Name"
        elemBefore={<Avatar size="xsmall" />}
        removeButtonText="Remove me"
      />
      <Component
        text="standard color"
        color="standard"
      />
      <Component
        text="green color"
        color="green"
      />
      <Component
        text="teal color"
        color="teal"
      />
      <Component
        text="blue color"
        color="blue"
      />
      <Component
        text="purple color"
        color="purple"
      />
      <Component
        text="red color"
        color="red"
      />
      <Component
        text="yellow color"
        color="yellow"
      />
      <Component
        text="grey color"
        color="grey"
      />
      <Component
        text="greenLight color"
        color="greenLight"
      />
      <Component
        text="tealLight color"
        color="tealLight"
      />
      <Component
        text="blueLight color"
        color="blueLight"
      />
      <Component
        text="purpleLight color"
        color="purpleLight"
      />
      <Component
        text="redLight color"
        color="redLight"
      />
      <Component
        text="yellowLight color"
        color="yellowLight"
      />
      <Component
        text="greyLight color"
        color="greyLight"
      />

      <Component
        text="red color"
        color="red"
        href="https://atlaskit.atlassian.com/"
      />
      <Component
        text="yellow color"
        color="yellow"
        href="https://atlaskit.atlassian.com/"
      />
      <Component
        text="grey color"
        color="grey"
        href="https://atlaskit.atlassian.com/"
      />
      <Component
        text="greenLight color"
        color="greenLight"
        href="https://atlaskit.atlassian.com/"
      />
      <Component
        text="tealLight color"
        color="tealLight"
        href="https://atlaskit.atlassian.com/"
      />
      <Component
        text="blueLight color"
        color="blueLight"
        href="https://atlaskit.atlassian.com/"
      />
    </div>
  ), { imports });
