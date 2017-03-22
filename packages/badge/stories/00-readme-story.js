import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, DynamicProps, Description } from '@atlaskit/util-readme';

import { name } from '../package.json';

/* eslint-disable import/first, import/no-duplicates */
import Badge from '../src';
import BadgeSrc from '!raw!../src';

import BasicUsageExample from './examples/basic-usage';
import BasicUsageExampleRaw from '!raw!./examples/basic-usage';
/* eslint-enable import/first, import/no-duplicates */

const BadgeDescription = (<Description>
  <p>Badges are visual indicators for numeric values such as tallies and scores.
    They&#39;re commonly used before and after the label of the thing they&#39;re quantifying.
  </p>
  <p>They must be used singly after a single item name, and have only numbers.</p>
  <ul>
    <li>Use lozenges for statuses.</li>
    <li>Use labels to call out tags and high-visibility attributes.</li>
    <li>Use a tooltip if you want to indicate units.</li>
  </ul>
</Description>);

storiesOf(name, module)
  .add('📖 Badge Readme', () => (
    <div>
      <Readme
        component={name}
        description={BadgeDescription}
      >
        <Code code={BasicUsageExampleRaw}>
          {BasicUsageExample}
        </Code>
        <DynamicProps component={Badge} componentSrc={BadgeSrc} />
      </Readme>
    </div>
  ));
