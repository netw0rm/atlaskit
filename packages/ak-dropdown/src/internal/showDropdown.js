import { props, emit } from 'skatejs';

import getItemsList from './getItemsList';
import getTriggerButton from './getTriggerButton';
import * as events from './events';

export default (elem, keyDownOnceOnOpen, activatedFrom) => {
  const list = getItemsList(elem.children);
  const triggerButton = getTriggerButton(elem);

  elem[keyDownOnceOnOpen] = false;

  if (triggerButton) {
    props(triggerButton, { opened: true });
  }
  if (list && list.length) {
    if (elem[activatedFrom] === 'keyDown') {
      list[0].focused = true;
    }
    list[0].first = true;
    list[list.length - 1].last = true;
  }
  emit(elem, events.afterOpen);
};
