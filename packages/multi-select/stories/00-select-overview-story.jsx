import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Code, Chrome, Description, Props, Heading } from '@atlaskit/util-readme';

/* eslint-disable import/first, import/no-duplicates */
import SmartSelectOverview from './examples/SmartSelectOverview';
import SmartSelectOverviewRaw from '!raw!./examples/SmartSelectOverview';
import CustomMultiSelectRaw from '!raw!./examples/CustomMultiSelect';
import CustomMultiSelectOverview from './examples/CustomMultiSelectOverview';
import CustomMultiSelectOverviewRaw from '!raw!./examples/CustomMultiSelectOverview';
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
import SmartSelectWithDescriptions from './examples/SmartSelectWithDescriptions';
import SmartSelectWithDescriptionsRaw from '!raw!./examples/SmartSelectWithDescriptions';
/* eslint-enable import/first, import/no-duplicates */

// Dummy components exist so that we have a component to pass to <Props/>
import DummyItem from '../src/internal/DummyItem';
import DummyGroup from '../src/internal/DummyGroup';
import DummyTag from '../src/internal/DummyTag';
import { name, description } from '../package.json';

import SmartMultiSelect, { StatelessMultiSelect } from '../src';
import {
  statelessMultiSelectPropTypes,
  statelessMultiSelectPropDescriptions,
  smartMultiSelectPropDescriptions,
  smartMultiSelectPropTypes,
  itemPropDescriptions,
  itemPropTypes,
  groupPropDescriptions,
  groupPropTypes,
  tagPropDescriptions,
} from './props';

storiesOf(name, module)
  .add('📖 Multi select (smart) - readme', () => (
    <Chrome title="Multi select (smart) - overview">
      <Description>
        <p>{description}</p>
        <p>
          The &ldquo;smart&rdquo; multi-select component will handle it&apos;s own state for you
          (you won&apos;t need to/be able to update the list of <code>selected</code> items). If
          you require this functionality, use the <code>stateless</code> version instead.
        </p>
      </Description>
      {SmartSelectOverview}
      <Code>
        {SmartSelectOverviewRaw}
      </Code>
      <Props
        component={SmartMultiSelect}
        descriptions={smartMultiSelectPropDescriptions}
        types={smartMultiSelectPropTypes}
      />
    </Chrome>
  ))
  .add('📖 Multi select (stateless) - readme', () => (
    <Chrome title="Multi select (smart) - overview">
      <Description>
        <p>
          The &ldquo;stateless&rdquo; multi-select component gives you complete control of how the
          component should display and react to user interaction.
        </p>
        <p>This also means it is up to the Application to keep the props up to date (filter text,
          isOpen, selectedItems, etc)</p>
        <p>The following is an example of how you could build your own multiselect using the
          stateless component
        </p>
      </Description>
      <Code>
        {CustomMultiSelectRaw}
      </Code>
      <p>And we could then use it like so:</p>
      <Code>
        {CustomMultiSelectOverviewRaw}
      </Code>
      {CustomMultiSelectOverview}
      <Props
        component={StatelessMultiSelect}
        descriptions={statelessMultiSelectPropDescriptions}
        types={statelessMultiSelectPropTypes}
      />
    </Chrome>
  ))
  .add('📖 Multi select Items - readme', () => (
    <Chrome title="Multi select Items and Groups - overview">
      <Heading>Group</Heading>
      <Description>
        <p>The <code>items</code> prop takes an array of groups
          of items. Groups are simply collections of Items with optional headings</p>
        <p>It is recommended that every group should have a heading. However if headings are not
          required, the dialog will either have all headings or no headings at all for these groups.
          But if there are no headings for the group, then the group should be combined instead.</p>
        <p>The <code>selectedItems</code> prop takes just an array of references to items</p>
      </Description>
      <Props component={DummyGroup} descriptions={groupPropDescriptions} types={groupPropTypes} />

      <Heading>Item</Heading>
      <Description>
        <p>
          The selectedItems prop (and also the items part of Groups) take an array of Items.
          Items you pass in support a range of options that affect how your options are rendered
          both in the dropdown and in the selected tags.
        </p>
      </Description>
      <Props component={DummyItem} descriptions={itemPropDescriptions} types={itemPropTypes} />

      <Heading>Tag</Heading>
      <Description>
        <p>
          Items support modifying certain properties of the rendered Tags when selected.
          See below for the supported API.
        </p>
      </Description>
      <Props component={DummyTag} descriptions={tagPropDescriptions} />
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
  .add('Multi select with elemBefore (Avatars)', () => (
    <Chrome title="Multi select with Avatars">
      <Description>
        <p>You can pass content to be displayed in front of the dropdown items and also the tags by
          using the <code>elemBefore</code> and <code>tag.elemBefore</code> props
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
  ))
  .add('Multi select with descriptions', () => (
    <Chrome title="Multi select - appearance variations">
      <div style={{ width: '300px' }}>
        {SmartSelectWithDescriptions}
      </div>
      <Code>
        {SmartSelectWithDescriptionsRaw}
      </Code>
    </Chrome>
  ));
