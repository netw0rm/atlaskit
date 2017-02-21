import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Code, Chrome, Description } from '@atlaskit/util-readme';

/* eslint-disable import/first, import/no-duplicates */
import SmartSelectOverview from './examples/SmartSelectOverview';
import SmartSelectOverviewRaw from '!raw!./examples/SmartSelectOverview';
import SmartSelectDefaultSelectedItems from './examples/SmartSelectDefaultSelectedItems';
import SmartSelectDefaultSelectedItemsRaw from '!raw!./examples/SmartSelectDefaultSelectedItems';
import SmartSelectRequired from './examples/SmartSelectRequired';
import SmartSelectRequiredRaw from '!raw!./examples/SmartSelectRequired';
import SmartSelectDisabled from './examples/SmartSelectDisabled';
import SmartSelectDisabledRaw from '!raw!./examples/SmartSelectDisabled';
import SmartSelectInvalid from './examples/SmartSelectInvalid';
import SmartSelectInvalidRaw from '!raw!./examples/SmartSelectInvalid';
import SelectInForm from './examples/SelectInForm';
import SelectInFormRaw from '!raw!./examples/SelectInForm';
import SmartSelectFocus from './examples/SmartSelectFocus';
import SmartSelectFocusRaw from '!raw!./examples/SmartSelectFocus';
import SmartSelectAppearances from './examples/SmartSelectAppearances';
import SmartSelectAppearancesRaw from '!raw!./examples/SmartSelectAppearances';
/* eslint-enable import/first, import/no-duplicates */

import { name, description } from '../package.json';

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
    <Chrome title="Multi select in forms">
      {SelectInForm}
      <Code>
        {SelectInFormRaw}
      </Code>
    </Chrome>
  ))
  .add('Multi select with default selected items', () => (
    <Chrome title="Multi select (smart) - overview">
      {SmartSelectDefaultSelectedItems}
      <Code>
        {SmartSelectDefaultSelectedItemsRaw}
      </Code>
    </Chrome>
  ))
  .add('Multi select - required', () => (
    <Chrome title="Multi select (smart) - overview">
      {SmartSelectRequired}
      <Code>
        {SmartSelectRequiredRaw}
      </Code>
    </Chrome>
  ))
  .add('Multi select - disabled', () => (
    <Chrome title="Multi select (smart) - overview">
      {SmartSelectDisabled}
      <Code>
        {SmartSelectDisabledRaw}
      </Code>
    </Chrome>
  ))
  .add('Multi select - invalid', () => (
    <Chrome title="Multi select (smart) - overview">
      {SmartSelectInvalid}
      <Code>
        {SmartSelectInvalidRaw}
      </Code>
    </Chrome>
  ))
  .add('Multi select - focus behavior', () => (
    <Chrome title="Multi select (smart) - overview">
      <SmartSelectFocus />
      <Code>
        {SmartSelectFocusRaw}
      </Code>
    </Chrome>
  ))
  .add('Multi select - appearance variations', () => (
    <Chrome title="Multi select - appearance variations">
      {SmartSelectAppearances}
      <Code>
        {SmartSelectAppearancesRaw}
      </Code>
    </Chrome>
  ));
