import { description } from '../../package.json';

export const radioGroupPropDescriptions = {
  items: 'An array of objects describing the radio buttons to render.',
  label: 'The text to display above the radio buttons. Should describes the group of radio buttons and prompt the user action.',
  onRadioChange: 'Function to call when a radio is selected and fires a change event. This should update the items property to select the newly-selected item.',
};

export const readmeDescription = `${description}. This is the basic (controlled) version of this component, which does not handle its own state. Supply a callback via the onRadioChange property to update your state when a radio item is selected.`;

export const readmeDescriptionSmart = `${description}. This is the smart (uncontrolled) version of this component, which handles its own state.`;
