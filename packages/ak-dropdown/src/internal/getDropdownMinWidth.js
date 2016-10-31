import getTriggerButton from './getTriggerButton';
import { triggerContainer } from './symbols';
import { dropdownMinWidth } from './consts';

export default (dropdown) => {
  if (dropdown.dropWidth === 'standart') {
    return getTriggerButton(dropdown) ?
      `${dropdown[triggerContainer].getBoundingClientRect().width + 10}px` :
      `${dropdownMinWidth}px`;
  } else if (dropdown.dropWidth === 'fit') {
    const trigger = dropdown[triggerContainer];
    return `${trigger.getBoundingClientRect().width}px`;
  }

  return 'auto';
};
