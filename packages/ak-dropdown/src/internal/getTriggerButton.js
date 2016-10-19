import { DropdownTriggerButton, DropdownTriggerArrow } from '../index.trigger';

export default (elem) => {
  const child = elem.children[0];
  if (child && (child instanceof DropdownTriggerButton || child instanceof DropdownTriggerArrow)) {
    return child;
  }
  return undefined;
};
