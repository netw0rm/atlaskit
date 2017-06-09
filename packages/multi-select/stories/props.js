const itemPropDescriptions = {
  content: 'The text/content to display in the option and in the rendered tags (selected options).',
  description: 'The text/content to display underneath the content. Doesn`t show in the rendered tags',
  value: 'Value sent when option is selected in a form.',
  isDisabled: 'Whether an option is selectable or not.',
  isSelected: 'Whether an option is selected or not (affects appearance of option, not of selectedItems)',
  elemBefore: 'Content to display before the `content` in the option (icons, avatars, etc)',
  tag: 'Extra options passed to the Tag when an item is selected. Only elemBefore and appearance are passed on. See Item Tag readme for more details on this.',
};

const itemPropTypes = {
  value: 'OneOf(string, number)',
  tag: 'TagOptions',
  isSelected: 'bool',
  isDisabled: 'bool',
  elemBefore: 'node',
};

const itemPropDefault = {
  isDisabled: 'false',
  isSelected: 'false',
};

const tagPropDescriptions = {
  appearance: 'Modifier used to change the rendered appearance of a tag ("default" or "rounded")',
  elemBefore: 'Used to render content before the text of the Tag (usually used for Avatars or Icons)',
};

/* eslint-disable import/prefer-default-export */
export {
  itemPropDescriptions,
  itemPropTypes,
  itemPropDefault,
  tagPropDescriptions,
};
/* eslint-enable import/prefer-default-export */
