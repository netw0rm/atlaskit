import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Code, Chrome, Description, Props } from '@atlaskit/util-readme';

/* eslint-disable import/first, import/no-duplicates */
import EditableSelectOverview from './examples/EditableSelectOverview';
import EditableSelectOverviewRaw from '!raw!./examples/EditableSelectOverview';
/* eslint-enable import/first, import/no-duplicates */

import { name } from '../package.json';
import { EditableSelect } from '../src';

const propDescriptions = {
  select: 'Single Select instance to be used as edit-view',
};

const propTypes = {
  select: 'An instance of Single Select',
};

storiesOf(name, module)
  .add('Single select (stateless) - overview', () => (
    <Chrome title="Single select (stateless) - overview">
      <Description>
        <p>Simple select component</p>
      </Description>
      {EditableSelectOverview}
      <Code>{EditableSelectOverviewRaw}</Code>
      <Props component={EditableSelect} descriptions={propDescriptions} types={propTypes} />
    </Chrome>
  ));
