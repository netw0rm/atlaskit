import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Code, Chrome, Description, Props } from '@atlaskit/util-readme';

/* eslint-disable import/first, import/no-duplicates */
import Appearances from './examples/Appearances';
import AppearancesRaw from '!raw!./examples/Appearances';
import DefaultSelectedItem from './examples/DefaultSelectedItem';
import DefaultSelectedItemRaw from '!raw!./examples/DefaultSelectedItem';
import InitialLoading from './examples/InitialLoading';
import InitialLoadingRaw from '!raw!./examples/InitialLoading';
import ItemsOverview from './examples/ItemsOverview';
import ItemsOverviewRaw from '!raw!./examples/ItemsOverview';
import SelectAlignment from './examples/SelectAlignment';
import SelectAlignmentRaw from '!raw!./examples/SelectAlignment';
import SelectAutocompleteWithIcons from './examples/SelectAutocompleteWithIcons';
import SelectAutocompleteWithIconsRaw from '!raw!./examples/SelectAutocompleteWithIcons';
import SelectAutocompleteWithJsxContent from './examples/SelectAutocompleteWithJsxContent';
import SelectAutocompleteWithJsxContentRaw from '!raw!./examples/SelectAutocompleteWithJsxContent';
import SelectInForm from './examples/SelectInForm';
import SelectInFormRaw from '!raw!./examples/SelectInForm';
import SelectNoPositionFlip from './examples/SelectNoPositionFlip';
import SelectNoPositionFlipRaw from '!raw!./examples/SelectNoPositionFlip';
import SelectOpenedByDefault from './examples/SelectOpenedByDefault';
import SelectOpenedByDefaultRaw from '!raw!./examples/SelectOpenedByDefault';
import SelectWithAutocomplete from './examples/SelectWithAutocomplete';
import SelectWithAutocompleteRaw from '!raw!./examples/SelectWithAutocomplete';
import SelectWithDescriptions from './examples/SelectWithDescriptions';
import SelectWithDescriptionsRaw from '!raw!./examples/SelectWithDescriptions';
import SelectWithFilterValues from './examples/SelectWithFilterValues';
import SelectWithFilterValuesRaw from '!raw!./examples/SelectWithFilterValues';
import SelectWithGroups from './examples/SelectWithGroups';
import SelectWithGroupsRaw from '!raw!./examples/SelectWithGroups';
import SelectWithHeapsOfOptions from './examples/SelectWithHeapsOfOptions';
import SelectWithHeapsOfOptionsRaw from '!raw!./examples/SelectWithHeapsOfOptions';
import SelectWithIcons from './examples/SelectWithIcons';
import SelectWithIconsRaw from '!raw!./examples/SelectWithIcons';
import SelectWithJsxContent from './examples/SelectWithJsxContent';
import SelectWithJsxContentRaw from '!raw!./examples/SelectWithJsxContent';
import SelectWithLongDescriptions from './examples/SelectWithLongDescriptions';
import SelectWithLongDescriptionsRaw from '!raw!./examples/SelectWithLongDescriptions';
import SelectWithTooltips from './examples/SelectWithTooltips';
import SelectWithTooltipsRaw from '!raw!./examples/SelectWithTooltips';
import ShouldFocus from './examples/ShouldFocus';
import ShouldFocusRaw from '!raw!./examples/ShouldFocus';
import ShouldFocusStateful from './examples/ShouldFocusStateful';
import ShouldFocusStatefulRaw from '!raw!./examples/ShouldFocusStateful';
import SmartSelectOverview from './examples/SmartSelectOverview';
import SmartSelectOverviewRaw from '!raw!./examples/SmartSelectOverview';
import StatelessSelectOverview from './examples/StatelessSelectOverview';
import StatelessSelectOverviewRaw from '!raw!./examples/StatelessSelectOverview';
import WideDroplist from './examples/WideDroplist';
import WideDroplistRaw from '!raw!./examples/WideDroplist';
import WideSelect from './examples/WideSelect';
import WideSelectRaw from '!raw!./examples/WideSelect';
/* eslint-enable import/first, import/no-duplicates */

// Dummy components exist so that we have a component to pass to <Props/>
import DummyItem from '../src/components/DummyItem';
import DummyGroup from '../src/components/DummyGroup';
import { name } from '../package.json';
import Select, { StatelessSelect } from '../src';

const propDescriptions = {
  appearance: 'Appearance of the triggering field',
  defaultSelected: 'Default selected item',
  droplistShouldFitContainer: 'Specifies whether a dropdown should be constrained to the width of its trigger',
  id: 'id of the form element',
  invalidMessage: 'Specifies a error message. It is used together with isInvalid property',
  isDisabled: 'Specifies that a select should be disabled',
  isDefaultOpen: 'Controls the open state of the select',
  isInvalid: 'Specifies that selected value is not correct',
  isLoading: 'Whether or not the select is loading data to display options',
  isRequired: 'Specifies that the user is required to select a value before submitting the form',
  isOpen: 'Controls the open state of the select',
  items: 'List of items',
  label: 'Text that you will see above the element',
  loadingMessage: 'Message to be displayed (or a11y read) when data is being fetched',
  onSelected: 'This is a handler function which is called when an item is selected',
  onOpenChange: `This is a handler function which is called when the droplist should be open/closed.
  Received an object with isOpen state`,
  placeholder: 'The short hint that is displayed in the select before the user selects a value',
  position: 'Position of the select. See the documentation of ak-layer for more details',
  selectedItem: 'Selected item',
  shouldFitContainer: 'Specifies whether a select will take all available space',
  shouldFocus: 'Specifies whether the component will auto-focus itself',
  shouldFlip: 'Specifies whether the droplist should flip its position when there is not enough space',
  maxHeight: 'Specifies if the droplist should be of a specific height',
};

const propTypes = {
  appearance: 'Predefined appearances of single-select. One of: \'default\', \'subtle\'',
  defaultSelected: 'Array(Item)',
  items: 'Array(Group)',
  selectedItem: 'Array(Item)',
};

const groupPropDescriptions = {
  items: 'An array of Items (see below for shape of Items)',
  heading: 'A description to show above a group of items.',
};

const groupPropTypes = {
  items: 'Array(Item)',
};

const itemPropDescriptions = {
  content: 'The text/content to display in the option and in the rendered trigger (selected option).',
  description: 'The text/content to display underneath the content. Doesn`t show in the rendered trigger',
  tooltipDescription: 'The text/content to display in a tooltip, appearing on hover.',
  tooltipPosition: 'The position of the tooltip (one of: left, right, top, bottom)',
  value: 'Value sent when option is selected in a form.',
  isDisabled: 'Whether an option is selectable or not.',
  isSelected: 'Whether an option is selected or not (affects appearance of option, not of selectedItems)',
  elemBefore: 'Content to display before the `content` in the option (icons, avatars, etc)',
  elemAfter: 'Content to display after the `content` in the option (icons, avatars, etc)',
};

const itemPropTypes = {
  value: 'OneOf(string, number)',
};

storiesOf(name, module)
  .add('📖 Single select (stateless) - readme', () => (
    <Chrome title="Single select (stateless) - overview">
      <Description>
        <p>Simple select component</p>
      </Description>
      {StatelessSelectOverview}
      <Code>{StatelessSelectOverviewRaw}</Code>
      <Props component={StatelessSelect} descriptions={propDescriptions} types={propTypes} />
    </Chrome>
  ))
  .add('📖 Single select (smart) - readme', () => (
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
  .add('📖 Single select Item - readme', () => (
    <Chrome title="Single select Item - overview">
      <Description>
        <p>
          The <code>items</code> prop take an array of groups of items. Groups are simply
          collections of Items.
        </p>
        <p>
          The <code>selectedItem</code> prop takes just an reference to one of the items
        </p>
        <p>
          It is recommended that every group should have a heading. However if headings are not
          required, the dialog will either have all headings or no headings at all for these groups.
        </p>
      </Description>
      <Props component={DummyGroup} descriptions={groupPropDescriptions} types={groupPropTypes} />
      <Description>
        <p>
          Items you pass in support a range of options that affect how your options are rendered
          both in the dropdown and in the selected tags.
        </p>
      </Description>
      <Props component={DummyItem} descriptions={itemPropDescriptions} types={itemPropTypes} />
      {ItemsOverview}
      <Code>
        {ItemsOverviewRaw}
      </Code>
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
  .add('Single select with should focus', () => (
    <Chrome title="With should focus">
      <Description>
        <p style={{ marginBottom: '12px' }}>Should focus</p>
      </Description>
      {ShouldFocus}
      <Code>
        {ShouldFocusRaw}
      </Code>
    </Chrome>
  ))
  .add('Single select (stateful) with should focus', () => (
    <Chrome title="With should focus">
      <Description>
        <p style={{ marginBottom: '12px' }}>Should focus (stateful)</p>
      </Description>
      {ShouldFocusStateful}
      <Code>
        {ShouldFocusStatefulRaw}
      </Code>
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
  .add('Droplist that extends past the select space', () => (
    <Chrome title="Droplist that extends past the select space">
      {WideDroplist}
      <Code>
        {WideDroplistRaw}
      </Code>
      <Props component={Select} descriptions={propDescriptions} types={propTypes} />
    </Chrome>
  ))
  .add('Select with icons', () => (
    <Chrome title="Select with icons">
      {SelectWithIcons}
      <Code>
        {SelectWithIconsRaw}
      </Code>
    </Chrome>
  ))
  .add('Autocomplete select with icons', () => (
    <Chrome title="Autocomplete select with icons">
      {SelectAutocompleteWithIcons}
      <Code>
        {SelectAutocompleteWithIconsRaw}
      </Code>
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
  .add('Select with long descriptions and max height', () => (
    <Chrome title="Select with long descriptions and max height">
      <div style={{ width: '300px' }}>
        {SelectWithLongDescriptions}
      </div>
      <Code>
        {SelectWithLongDescriptionsRaw}
      </Code>
      <Props component={Select} descriptions={propDescriptions} types={propTypes} />
    </Chrome>
  ))
  .add('Select with tooltips', () => (
    <Chrome title="Select with tooltips">
      <div style={{ width: '300px' }}>
        {SelectWithTooltips}
      </div>
      <Code>
        {SelectWithTooltipsRaw}
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
    <Chrome title="Select in a form">
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
  .add('Select with filter values', () => (
    <Chrome title="Select with filter values">
      <div style={{ width: '300px' }}>
        {SelectWithFilterValues}
      </div>
      <Code>
        {SelectWithFilterValuesRaw}
      </Code>
      <Props component={Select} descriptions={propDescriptions} types={propTypes} />
    </Chrome>
  ))
  .add('Select with JSX content', () => (
    <Chrome title="Select with JSX content">
      <div style={{ width: '300px' }}>
        {SelectWithJsxContent}
      </div>
      <Code>
        {SelectWithJsxContentRaw}
      </Code>
      <Props component={Select} descriptions={propDescriptions} types={propTypes} />
    </Chrome>
  ))
  .add('Autocomplete select with JSX content', () => (
    <Chrome title="Autocomplete select with JSX content">
      <div style={{ width: '300px' }}>
        {SelectAutocompleteWithJsxContent}
      </div>
      <Code>
        {SelectAutocompleteWithJsxContentRaw}
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
  ))
  .add('Select is opened by default', () => (
    <Chrome title="Select is opened by default">
      <Description>
        <p style={{ marginBottom: '12px' }}>Select is opened on first appearance</p>
      </Description>
      {SelectOpenedByDefault}
      <Code>
        {SelectOpenedByDefaultRaw}
      </Code>
      <Props component={Select} descriptions={propDescriptions} types={propTypes} />
    </Chrome>
  ))
  .add('Select does not flip when space limited', () => (
    <Chrome title="Select is opened by default">
      <Description>
        <p style={{ marginBottom: '12px' }}>
          Select does not flip to the top when no space below. When you change the
          vertical height of the container the dropdown should not go above the trigger.
        </p>
      </Description>
      {SelectNoPositionFlip}
      <Code>
        {SelectNoPositionFlipRaw}
      </Code>
      <Props component={Select} descriptions={propDescriptions} types={propTypes} />
    </Chrome>
  ))
  .add('Select (stateless) - loading state (initial fetch)', () => (
    <Chrome title="Select (stateless) - loading state (initial fetch)">
      <Description>
        <p style={{ marginBottom: '12px' }}>
          <strong>Note:</strong> loading options are
          <strong> only available on the stateless component </strong>
          as the stateful counterpart currently is not capable
          of handling back-end requests to fetch new items/options.
        </p>
      </Description>
      {InitialLoading}
      <Code>
        {InitialLoadingRaw}
      </Code>
      <Props component={Select} descriptions={propDescriptions} types={propTypes} />
    </Chrome>
  ));
