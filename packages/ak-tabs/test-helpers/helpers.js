import keycode from 'keycode';
import AkTabsTab from '../src/index-tab';
import AkTabs from '../src/index';

import * as events from '../src/internal/events';
import { buttonContainer, labelsContainer, tabLabel } from '../src/internal/symbols';
import tabsStyles from 'style!../src/host.less';
import tabStyles from 'style!../src/tab-host.less';
import { getShadowRoot, waitUntil } from 'akutil-common-test';

const defaultLabel = 'Default tab label';
const defaultContent = '<p>Default tab content</p>';
const defaultWidth = '';

function afterMutations(fn) {
  setTimeout(fn, 10);
}

function setupTabs(opts) {
  const selectSpy = sinon.spy();  // eslint-disable-line no-undef
  const deselectSpy = sinon.spy(); // eslint-disable-line no-undef

  window.addEventListener(events.TAB_SELECT, selectSpy);
  window.addEventListener(events.TAB_DESELECT, deselectSpy);

  const containerElement = document.createElement('div');
  containerElement.style.width = opts.width || defaultWidth;

  const tabsElement = new AkTabs();
  const tabElements = [];

  // We need to add the class because the tagname is random in our tests.
  tabsElement.classList.add(tabsStyles.akTabs);

  if (opts.tabs) {
    opts.tabs.forEach(tabOptions => {
      const newTab = new AkTabsTab();
      tabElements.push(newTab);

      newTab.label = tabOptions.label || defaultLabel;
      newTab.selected = !!tabOptions.selected;
      newTab.innerHTML = tabOptions.content || defaultContent;

      newTab.classList.add(tabStyles.akTabsTab);
      tabsElement.appendChild(newTab);
    });
  }

  containerElement.appendChild(tabsElement);
  document.body.appendChild(containerElement);

  return waitUntil(() => !!getShadowRoot(tabsElement)).then(() => ({
    el: tabsElement,
    tabs: tabElements,
    container: containerElement,
    spies: {
      select: selectSpy,
      deselect: deselectSpy,
    },
  }));
}

function cleanupTabs(fixtures) {
  window.removeEventListener(events.TAB_SELECT, fixtures.spies.select);
  window.removeEventListener(events.TAB_DESELECT, fixtures.spies.deselect);
  document.body.removeChild(fixtures.container);
}

function getLabelForTab(tab) {
  return tab[tabLabel];
}

function getTabLabels(tabsEl) {
  const labels = Array.from(tabsEl[labelsContainer].children);
  labels.pop(); // Remove More dropdown from list
  return labels;
}

function getLabelContent(labelEl) {
  return labelEl.querySelector('span').innerHTML;
}

function getSelectedTab(tabs) {
  return tabs.filter(el => el.selected)[0];
}

function getElementWidth(el) {
  return el.getBoundingClientRect().width;
}

function hasOverflow(el) {
  return el.scrollWidth > el.clientWidth;
}

function isHidden(el) {
  const computedStyle = getComputedStyle(el);
  return computedStyle.visibility === 'hidden' || computedStyle.opacity === '0';
}

function hasVisibleDropdown(tabsEl) {
  return !isHidden(tabsEl[buttonContainer]);
}

function getVisibleTabs(tabsEl) {
  return tabsEl._visibleTabs; // eslint-disable-line no-underscore-dangle
}

function click(el) {
  el.click();
}

/* Keyboard nav helpers */

function getTabs(tabsEl) {
  return Array.from(tabsEl.children).filter(el => el.label);
}

function pressKey(keyCode, el) {
  const e = new CustomEvent('keydown', { bubbles: true, cancelable: true });
  e.keyCode = keyCode;
  const elem = el || document.activeElement;
  elem.dispatchEvent(e);
}

function pressLeftKey(el) {
  pressKey(keycode('left'), el);
}

function pressRightKey(el) {
  pressKey(keycode('right'), el);
}

function keyboardNav(tabsEl, isLeft, numPresses) {
  const label = getLabelForTab(getSelectedTab(getTabs(tabsEl)));
  if (isLeft) {
    pressLeftKey(label);
  } else {
    pressRightKey(label);
  }

  if (numPresses > 1) {
    afterMutations(() => (keyboardNav(tabsEl, isLeft, numPresses - 1)));
  }
}

function keyboardNavLeft(tabsEl, numPresses = 1) {
  keyboardNav(tabsEl, true, numPresses);
}

function keyboardNavRight(tabsEl, numPresses = 1) {
  keyboardNav(tabsEl, false, numPresses);
}

export {
  afterMutations,
  setupTabs,
  cleanupTabs,
  getLabelForTab,
  getTabLabels,
  getLabelContent,
  getSelectedTab,
  getElementWidth,
  hasOverflow,
  isHidden,
  hasVisibleDropdown,
  getVisibleTabs,
  click,
  keyboardNavLeft,
  keyboardNavRight,
  defaultLabel,
};
