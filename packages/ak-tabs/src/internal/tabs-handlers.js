import keycode from 'keycode';

import { getPrevTab, getNextTab } from './tabs-helpers';
import { focusOnRender, focusOnSecondRender, tabLabel } from './symbols';

function labelMouseDownHandler(e) {
  e.preventDefault(); // Prevent focus on the tab label.
}

function labelSelectedHandler(tab) {
  return () => (tab.selected = true);
}

function labelKeydownHandler(tabsEl, tab) {
  return e => {
    let tabToSelect;
    if (e.keyCode === keycode('left')) {
      tabToSelect = getPrevTab(tabsEl, tab);
    } else if (e.keyCode === keycode('right')) {
      tabToSelect = getNextTab(tabsEl, tab);
    }
    if (tabToSelect) {
      tabsEl[focusOnRender] = true;
      tabToSelect.selected = true;
    }
  };
}

function labelRef(tabsEl, tab) {
  return el => {
    tab[tabLabel] = el;
    if (tab.selected) {
      if (tabsEl[focusOnRender]) {
        el.focus();
        tabsEl[focusOnRender] = false;
      }
      if (tabsEl[focusOnSecondRender]) {
        el.focus();
        tabsEl[focusOnRender] = tabsEl[focusOnSecondRender] = false;
      }
    } else {
      el.blur(); // Remove focus on a label that is no longer selected.
    }
  };
}

export {
  labelMouseDownHandler,
  labelSelectedHandler,
  labelKeydownHandler,
  labelRef,
};
