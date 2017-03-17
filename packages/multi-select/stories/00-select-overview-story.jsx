import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Code, Chrome, Description, Props } from '@atlaskit/util-readme';

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
import SmartSelectElemBefore from './examples/SmartSelectElemBefore';
import SmartSelectElemBeforeRaw from '!raw!./examples/SmartSelectElemBefore';
/* eslint-enable import/first, import/no-duplicates */

import DummyItem from '../src/internal/DummyItem';
import { name, description } from '../package.json';

import { ItemPropDescriptions } from './props';

storiesOf(name, module)
  .add('📖 Multi select (smart) - readme', () => (
    <Chrome title="Multi select (smart) - overview">
      <Description>
        <p>{description}</p>
        <p>
          The &ldquo;smart&rdquo; multi-select component will handle it&apos;s own state for you
          (you won&apos;t need to/be able to update the list of <code>selected</code> items). If
          you require this funcitonality, use the <code>stateless</code> version instead.
        </p>
      </Description>
      {SmartSelectOverview}
      <Code>
        {SmartSelectOverviewRaw}
      </Code>
    </Chrome>
  ))
  /* 📖 Multi select (stateless) - readme */
  .add('📖 Multi select Item - readme', () => (
    <Chrome title="Multi select Item - overview">
      <Description>
        <p>
          Items you pass in support a range of options that affect how your options are rendered
          both in the dropdown and in the selected tags.
        </p>
      </Description>
      {SmartSelectElemBefore}
      <Code>
        {SmartSelectElemBeforeRaw}
      </Code>
      <Props component={DummyItem} descriptions={ItemPropDescriptions} />
    </Chrome>
  ))
  /* 📖 Multi select Item - readme */
  .add('Multi select is submittable', () => (
    <Chrome title="Multi select in forms">
      {SelectInForm}
      <Code>
        {SelectInFormRaw}
      </Code>
    </Chrome>
  ))
  .add('Multi select with elemBefore (Avatars)', () => (
    <Chrome title="Multi select with Avatars">
      <Description>
        <p>You can pass content to be displayed in front of the dropdown items and also the tags by
          using the <code>elemBefore</code> and <code>tagElemBefore</code> props
          respectively.
        </p>
        <p>The most common use case for this would be for things like <code>@atlaskit/icon</code>
          &apos;s and <code>@atlaskit/avatar</code>&apos;s
        </p>
      </Description>
      {SmartSelectElemBefore}
      <Code>
        {SmartSelectElemBeforeRaw}
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
