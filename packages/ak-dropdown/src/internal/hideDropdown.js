import { props, emit } from 'skatejs';

import getItemsList from './getItemsList';
import getTriggerButton from './getTriggerButton';
import * as events from './events';

export default (elem) => {
  const list = getItemsList(elem.children);
  const triggerButton = getTriggerButton(elem);

  if (triggerButton) {
    props(triggerButton, { opened: false });
  }

  list.forEach((item) => {
    item.focused = false;
    if (item.first) {
      item.first = false;
    }
    if (item.last) {
      item.last = false;
    }
  });

  emit(elem, events.afterClose);
};
