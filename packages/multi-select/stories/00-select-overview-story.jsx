import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Code, Chrome, Description } from '@atlaskit/util-readme';
import Button from '@atlaskit/button';

/* eslint-disable import/first, import/no-duplicates */
import SmartSelectOverview from './examples/SmartSelectOverview';
import SmartSelectOverviewRaw from '!raw!./examples/SmartSelectOverview';
/* eslint-enable import/first, import/no-duplicates */

import { name, description } from '../package.json';

const formTestUrl = 'http://www.w3schools.com/html/action_page.php';

storiesOf(name, module)
  .add('Multi select (smart) - overview', () => (
    <Chrome title="Multi select (smart) - overview">
      <Description>
        <p>{description}</p>
      </Description>
      {SmartSelectOverview}
      <Code>
        {SmartSelectOverviewRaw}
      </Code>
    </Chrome>
  ))
  .add('Multi select is submittable', () => (
    <Chrome title="Multi select is submittable">
      <form
        action={formTestUrl}
        method="get"
        target="myFrame"
      >
        {SmartSelectOverview}
        <div style={{ margin: '16px 0' }}>
          <Button type="submit">Submit allthethings!</Button>
        </div>
        <iframe src="" name="myFrame" style={{ width: '100%', height: '100px' }} />
        <Code>
          {SmartSelectOverviewRaw}
        </Code>
      </form>
    </Chrome>
  ));
