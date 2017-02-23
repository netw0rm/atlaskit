import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Props, Description } from '@atlaskit/util-readme';

/* eslint-disable import/first, import/no-duplicates */
import BasicUsageExampleRaw from '!raw!./examples/basic-usage';
/* eslint-enable import/first, import/no-duplicates */

import Blanket from '../src';
import { name } from '../package.json';

const BlanketDescription = (<Description>
  <p>The main purpose of the blanket component is to provide the overlay layer for components such
    as a modal dialog or a tooltip.
  </p>
  <p>
    No custom z-index style is applied, so make sure you put it into an appropriate DOM position.
  </p>
  <p>For the purpose of simplicity blanket doesn&#40;t have any `show/hide` functionality.
    Since the main use of it suppose to be inside `popup` elements it would appear/disappear with
    the parent element.
  </p>
</Description>);

const blanketPropDescriptions = {
  canClickThrough: 'Whether mouse events can pierce the blanket. If true, onBlanketClicked will not be fired',
  isTinted: 'Whether the blanket has a tinted background color.',
  onBlanketClicked: 'Handler function to be called when the blanket is clicked',
};

storiesOf(name, module)
  .add('📖 Blanket readme', () => (
    <Readme
      component={name}
      description={BlanketDescription}
    >
      <Code code={BasicUsageExampleRaw}>
        <div>To see a live example of this, use the storybooks on the left</div>
      </Code>
      <Props component={Blanket} descriptions={blanketPropDescriptions} />
    </Readme>
  ));
