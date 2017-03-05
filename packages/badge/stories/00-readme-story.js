import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Props, Description } from '@atlaskit/util-readme';

import Badge from '../src';
import { name } from '../package.json';

/* eslint-disable import/first, import/no-duplicates */
import BasicUsageExample from './examples/basic-usage';
import BasicUsageExampleRaw from '!raw!./examples/basic-usage';
/* eslint-enable import/first, import/no-duplicates */

const BadgeDescription = (<Description>
  <p>Badges are visual indicators for numeric values such as tallies and scores.
    They&#40;re commonly used before and after the label of the thing they&#40;re quantifying.
  </p>
  <p>They must be used singly after a single item name, and have only numbers.</p>
  <ul>
    <li>Use lozenges for statuses.</li>
    <li>Use labels to call out tags and high-visibility attributes.</li>
    <li>Use a tooltip if you want to indicate units.</li>
  </ul>
</Description>);

const badgePropDescriptions = {
  value: 'The value displayed within the badge.',
  max: 'The max value to display. If value is 100, and max is 50, "50+" will be displayed',
  appearance: 'Affects the visual style of the badge. Allowed values are: \'default\', \'primary\', \'important\', \'added\', \'removed\'.',
  onValueUpdated: 'Handler function to be called when the \'updated\' prop is changed.',
  theme: 'Modifier used to change the badge colors for use with different color themes. Allowed values are: \'default\', \'dark\'',
};

storiesOf(name, module)
  .add('Badge Readme', () => (
    <div>
      <Readme
        component={name}
        description={BadgeDescription}
      >
        <Code code={BasicUsageExampleRaw}>
          {BasicUsageExample}
        </Code>
        <Props component={Badge} descriptions={badgePropDescriptions} />
      </Readme>
    </div>
  ));
