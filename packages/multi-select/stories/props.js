const statelessMultiSelectPropDescriptions = {
  appearance: 'Controls the appearance of the dropdown. Available types: \'default\', \'subtle\'.',
  filterValue: 'Text used in the filter input box to filter items. Use the `onFilterChange` prop to keep this in sync with the users text',
  id: 'The id of the component (same as the regular HTML id attribute)',
  isDisabled: 'Boolean flag for disabling the use of the component (clicking, keyboard, submitting, etc will be disabled)',
  isFirstChild: 'Boolean property that removes the extra padding from the top of the component, usually used if a multiselect is the first child in a list',
  shouldFocus: 'Boolean flag that causes the multi-select to request focus (think of it as an `autofocus` attribute)',
  isInvalid: 'Boolean flag to indicate the validity of the users currect selection (actual validation needs to be performed by the application)',
  isOpen: `Boolean flag to indicate if a multi-select's dropdown should be open.
    Use the 'onOpenChange' prop to keep this in sync (or use the smart component if you would like this handled for you).`,
  isRequired: 'Boolean flag to indicate if a field should be marked as `required` (will show an asterix but not prevent form submission).',
  items: 'Array of groups of multi-select Items. See the `📖 Multi select Item - readme` for more information on available options',
  label: 'Textual label for the component, provides semantics to screen readers',
  noMatchesFound: 'Textual label to display when no matches are found that match the filter',
  name: 'The name of the element passed when submitting a form',
  onFilterChange: 'Callback called whenever the filter value changes (from user input). Use this to keep filter value in sync',
  onOpenChange: 'Callback called whenever the the `open` state would usually change (user clicking, using keyboard, etc). Use this to keep the `open` state in sync',
  onSelected: 'Callback called whenever a user selects an item in the multi-select dropdown. Use this to keep the `selectedItems` prop in sync with the users selections.',
  onRemoved: 'Callback called whenever a user removes an item from the selected items list. Use this to keep the `selectedItems` prop in sync with the users selections',
  placeholder: 'Same as the HTML placeholder attribute, text that should be displayed if not selections or filters are entered.',
  position: 'Position of the menu. See the documentation of ak-layer for more details.',
  selectedItems: `An array of groups of Items (from the items prop) that should be rendered as tags and not in the selectable options list.
    Use the onSelected and onRemoved callbacks to keep this in sync.`,
  shouldFitContainer: 'Boolean property to define if a multiselect should fill the entire horizontal space it has, or if it should display inline.',
};

// some overrides for types that we can't get by reflection
const statelessMultiSelectPropTypes = {
  appearance: 'string',
  items: 'Array(Group)',
  selectedItems: 'Array(Item)',
};

// we can reuse most of the descriptions from the stateless component here to make updating easier
const smartMultiSelectPropDescriptions = {
  ...statelessMultiSelectPropDescriptions,
  defaultSelected: 'List of items that should be selected by default (must be references to the actual elements from the items prop)',
  isDefaultOpen: 'Boolean flag to indicate if a multi-select\'s dropdown should be open by default (user interaction will change this state but not update this prop).',
  onFilterChange: 'Callback called when the user changes the filter value.',
  onSelectedChange: 'Callback called when the user selects or removes an item.',
  onOpenChange: 'Callback called whenever the open state of the dropdown changes',
};

const smartMultiSelectPropTypes = {
  appearance: 'string',
  defaultSelected: 'Array(Item)',
  items: 'Array(Group)',
};

const groupPropDescriptions = {
  items: 'An array of Items (see below for shape of Items)',
  heading: 'A description to show above a group of items.',
};

const groupPropTypes = {
  items: 'Array(Item)',
};

const itemPropDescriptions = {
  content: 'The text/content to display in the option and in the rendered tags (selected options).',
  value: 'Value sent when option is selected in a form.',
  isDisabled: 'Whether an option is selectable or not.',
  isSelected: 'Whether an option is selected or not (affects appearance of option, not of selectedItems)',
  elemBefore: 'Content to display before the `content` in the option (icons, avatars, etc)',
  tag: 'Extra options passed to the Tag when an item is selected (see Item Tag readme)',
};

const itemPropTypes = {
  value: 'OneOf(string, number)',
  tag: 'TagOptions',
};

const tagPropDescriptions = {
  appearance: 'Modifier used to change the rendered appearance of a tag ("default" or "rounded")',
  elemBefore: 'Used to render content before the text of the Tag (usually used for Avatars or Icons)',
};

/* eslint-disable import/prefer-default-export */
export {
  statelessMultiSelectPropDescriptions,
  statelessMultiSelectPropTypes,
  smartMultiSelectPropDescriptions,
  smartMultiSelectPropTypes,
  itemPropDescriptions,
  itemPropTypes,
  groupPropDescriptions,
  groupPropTypes,
  tagPropDescriptions,
};
/* eslint-enable import/prefer-default-export */
