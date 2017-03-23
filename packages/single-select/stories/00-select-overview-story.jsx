import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Code, Chrome, Description, Props } from '@atlaskit/util-readme';

/* eslint-disable import/first, import/no-duplicates */
import StatelessSelectOverview from './examples/StatelessSelectOverview';
import StatelessSelectOverviewRaw from '!raw!./examples/StatelessSelectOverview';
import SmartSelectOverview from './examples/SmartSelectOverview';
import SmartSelectOverviewRaw from '!raw!./examples/SmartSelectOverview';
import DefaultSelectedItem from './examples/DefaultSelectedItem';
import DefaultSelectedItemRaw from '!raw!./examples/DefaultSelectedItem';
import WideSelect from './examples/WideSelect';
import WideSelectRaw from '!raw!./examples/WideSelect';
import SelectAlignment from './examples/SelectAlignment';
import SelectAlignmentRaw from '!raw!./examples/SelectAlignment';
import SelectWithGroups from './examples/SelectWithGroups';
import SelectWithGroupsRaw from '!raw!./examples/SelectWithGroups';
import SelectInForm from './examples/SelectInForm';
import SelectInFormRaw from '!raw!./examples/SelectInForm';
import SelectWithAutocomplete from './examples/SelectWithAutocomplete';
import SelectWithAutocompleteRaw from '!raw!./examples/SelectWithAutocomplete';
import Appearances from './examples/Appearances';
import AppearancesRaw from '!raw!./examples/Appearances';
import SelectWithHeapsOfOptions from './examples/SelectWithHeapsOfOptions';
import SelectWithHeapsOfOptionsRaw from '!raw!./examples/SelectWithHeapsOfOptions';
import SelectWithDescriptions from './examples/SelectWithDescriptions';
import SelectWithDescriptionsRaw from '!raw!./examples/SelectWithDescriptions';
/* eslint-enable import/first, import/no-duplicates */

import { name } from '../package.json';
import Select, { StatelessSelect } from '../src';

const propDescriptions = {
  appearance: 'Appearance of the triggering field',
  defaultSelected: 'Default selected item',
  id: 'id of the form element',
  isDisabled: 'Specifies that a select should be disabled',
  isDefaultOpen: 'Controls the open state of the select',
  isRequired: 'Specifies that the user is required to select a value before submitting the form',
  isInvalid: 'Specifies that selected value is not correct',
  isOpen: 'Controls the open state of the select',
  items: 'List of items',
  label: 'Text that you will see above the element',
  onSelected: 'This is a handler function which is called when an item is selected',
  onOpenChange: `This is a handler function which is called when the droplist should be open/closed.
  Received an object with isOpen state`,
  placeholder: 'The short hint that is displayed in the select before the user selects a value',
  position: 'Position of the select. See the documentation of ak-layer for more details',
  selectedItem: 'Selected item',
  shouldFitContainer: 'Specifies whether a select will take all available space',
};
const shape = 'shape({ content, value, isDisabled, isSelected, elemBefore, elemAfter })';

const propTypes = {
  appearance: 'Predefined appearances of single-select. One of: \'default\', \'subtle\'',
  defaultSelected: shape,
  id: 'string',
  isDisabled: 'bool',
  isDefaultOpen: 'bool',
  isRequired: 'bool',
  isInvalid: 'bool',
  isOpen: 'bool',
  items: 'array',
  label: 'string',
  onSelected: 'func',
  onOpenChange: 'func',
  placeholder: 'string',
  position: 'string',
  selectedItem: shape,
  shouldFitContainer: 'bool',
};

storiesOf(name, module)
  .add('Single select (stateless) - overview', () => (
    <Chrome title="Single select (stateless) - overview">
      <Description>
        <p>Simple select component</p>
      </Description>
      {StatelessSelectOverview}
      <Code>{StatelessSelectOverviewRaw}</Code>
      <Props component={StatelessSelect} descriptions={propDescriptions} types={propTypes} />
    </Chrome>
  ))
  .add('Single select (smart) - overview', () => (
    <Chrome title="Single select (smart) - overview">
      <Description>
        <p>Simple select component</p>
      </Description>
      {SmartSelectOverview}
      <Code>
        {SmartSelectOverviewRaw}
      </Code>
      <Props component={Select} descriptions={propDescriptions} types={propTypes} />
    </Chrome>
  ))
  .add('Specify selected item', () => (
    <Chrome title="Specify selected item">
      <Description>
        <p style={{ marginBottom: '12px' }}>Sydney is selected by default</p>
      </Description>
      {DefaultSelectedItem}
      <Code>
        {DefaultSelectedItemRaw}
      </Code>
      <Props component={Select} descriptions={propDescriptions} types={propTypes} />
    </Chrome>
  ))
  .add('Select that fills all available space', () => (
    <Chrome title="Select that fills all available space">
      {WideSelect}
      <Code>
        {WideSelectRaw}
      </Code>
      <Props component={Select} descriptions={propDescriptions} types={propTypes} />
    </Chrome>
  ))
  .add('Select with groups', () => (
    <Chrome title="Select with groups">
      {SelectWithGroups}
      <Code>
        {SelectWithGroupsRaw}
      </Code>
      <Props component={Select} descriptions={propDescriptions} types={propTypes} />
    </Chrome>
  ))
  .add('Select with descriptions', () => (
    <Chrome title="Select with descriptions">
      <div style={{ width: '300px' }}>
        {SelectWithDescriptions}
      </div>
      <Code>
        {SelectWithDescriptionsRaw}
      </Code>
      <Props component={Select} descriptions={propDescriptions} types={propTypes} />
    </Chrome>
  ))
  .add('Select alignment', () => (
    <Chrome title="Select alignment">
      {SelectAlignment}
      <Code>
        {SelectAlignmentRaw}
      </Code>
      <Props component={Select} descriptions={propDescriptions} types={propTypes} />
    </Chrome>
  ))
  .add('Select in a form', () => (
    <Chrome title="Select alignment">
      {SelectInForm}
      <Code>
        {SelectInFormRaw}
      </Code>
      <Props component={Select} descriptions={propDescriptions} types={propTypes} />
    </Chrome>
  ))
  .add('Select with autocomplete', () => (
    <Chrome title="Select with autocomplete">
      {SelectWithAutocomplete}
      <Code>
        {SelectWithAutocompleteRaw}
      </Code>
      <Props component={Select} descriptions={propDescriptions} types={propTypes} />
    </Chrome>
  ))
  .add('Appearance variations', () => (
    <Chrome title="Appearance variations">
      {Appearances}
      <Code>
        {AppearancesRaw}
      </Code>
      <Props component={Select} descriptions={propDescriptions} types={propTypes} />
    </Chrome>
  ))
  .add('Select with heaps of options to test dummy search', () => (
    <Chrome title="Select with autocomplete">
      {SelectWithHeapsOfOptions}
      <Code>
        {SelectWithHeapsOfOptionsRaw}
      </Code>
      <Props component={Select} descriptions={propDescriptions} types={propTypes} />
    </Chrome>
  ));
