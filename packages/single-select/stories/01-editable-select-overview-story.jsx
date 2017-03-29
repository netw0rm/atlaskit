import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Code, Chrome, Props } from '@atlaskit/util-readme';

/* eslint-disable import/first, import/no-duplicates */
import EditableSelectOverview from './examples/EditableSelectOverview';
import EditableSelectOverviewRaw from '!raw!./examples/EditableSelectOverview';
import EditableSelectConfirmOnSelect from './examples/EditableSelectConfirmOnSelect';
import EditableSelectConfirmOnSelectRaw from '!raw!./examples/EditableSelectConfirmOnSelect';
/* eslint-enable import/first, import/no-duplicates */

import { name } from '../package.json';
import { EditableSelect } from '../src';

const propDescriptions = {
  select: 'Single Select instance to be used as edit-view',
};

const propTypes = {
  select: 'An instance of Single Select',
};

storiesOf(`${name} (editable)`, module)
  .add('Default Behaviour', () => (
    <Chrome title="Overview">
      {EditableSelectOverview}
      <Code>{EditableSelectOverviewRaw}</Code>
      <Props component={EditableSelect} descriptions={propDescriptions} types={propTypes} />
    </Chrome>
  ))
  .add('Confirm on Select', () => (
    <Chrome title="Overview">
      {EditableSelectConfirmOnSelect}
      <Code>{EditableSelectConfirmOnSelectRaw}</Code>
    </Chrome>
  ));
