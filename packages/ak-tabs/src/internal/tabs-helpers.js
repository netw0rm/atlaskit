import {
  buttonContainer,
  focusOnRender,
  focusOnSecondRender,
  labelsContainer,
  tabLabel,
} from './symbols';

const getAllTabs = (tabsEl) => (Array.from(tabsEl.children).filter(el => el.label));

function getNextOrPrevTab(tabsEl, tab, isNext) {
  const all = getAllTabs(tabsEl);
  let index = all.indexOf(tab);

  index = isNext ? index + 1 : index - 1;
  if (index < 0 || index > all.length - 1) {
    return null;
  }

  return all[index];
}

function getSelectedTab(tabsEl) {
  const all = getAllTabs(tabsEl);
  return all.length && all.filter(el => el.selected)[0] || null;
}

function getLabelForTab(tab) {
  return tab[tabLabel];
}

const getNextTab = (tabsEl, tab) => (getNextOrPrevTab(tabsEl, tab, true));

const getPrevTab = (tabsEl, tab) => (getNextOrPrevTab(tabsEl, tab, false));

const calculateVisibleTabs = (tabsEl) => {
  const tabLabelsContainer = tabsEl[labelsContainer];
  const tabsButtonContainer = tabsEl[buttonContainer];
  if (!tabLabelsContainer || !tabsButtonContainer) {
    return [];
  }

  // Get the width of the <li> item containing each tab label element.
  const allTabs = getAllTabs(tabsEl).filter(tab => tab[tabLabel]);

  let widthRemaining = tabLabelsContainer.getBoundingClientRect().width;
  const tabWidths = new Map();
  allTabs.forEach(tab => {
    tabWidths.set(tab, getLabelForTab(tab).getBoundingClientRect().width);
  });

  // If all the tabs fit, then just display them all.
  let totalWidth = 0;
  tabWidths.forEach((value) => (totalWidth += value));
  if (totalWidth <= widthRemaining) {
    return allTabs;
  }

  // Otherwise, we need to fit the tabs into the available space, and pull some into a dropdown
  const visibleTabs = new Map();

  // The dropdown trigger item needs to be displayed
  widthRemaining -= tabsButtonContainer.getBoundingClientRect().width;

  // The currently selected tab is always displayed
  const selectedTab = getSelectedTab(tabsEl);
  if (selectedTab) {
    visibleTabs.set(selectedTab, true);
    widthRemaining -= tabWidths.get(selectedTab);
  }

  // Then try to fit each tab in the remaining space, until one doesn't fit
  let hasWidthRemaining = widthRemaining > 0;
  for (let i = 0; i < allTabs.length && hasWidthRemaining; i++) {
    const tab = allTabs[i];

    if (!visibleTabs.has(tab)) {
      const width = tabWidths.get(tab);

      if (widthRemaining >= width) {
        visibleTabs.set(tab, true);
        widthRemaining -= width;
        hasWidthRemaining = widthRemaining > 0;
      } else {
        hasWidthRemaining = false;
      }
    }
  }

  const visible = [];
  visibleTabs.forEach((value, key) => (visible.push(key)));
  return visible;
};

const updateProps = (tabsEl) => {
  const allTabs = getAllTabs(tabsEl);
  tabsEl._selected = allTabs.map(el => el.selected); // eslint-disable-line no-underscore-dangle
  tabsEl._labels = allTabs.map(el => el.label); // eslint-disable-line no-underscore-dangle

  const shouldFocusOnSecondRender = tabsEl[focusOnRender];
  tabsEl[focusOnSecondRender] = false;

  /* Wait for render to be called before calculating the tabs that should be visible.
   * We need to do this because new tabs may have been added, so we need to wait for the labels
   * to be rendered before we can calculate their widths and render again if necessary.
   */
  setTimeout(() => {
    tabsEl[focusOnSecondRender] = shouldFocusOnSecondRender;
    tabsEl._visibleTabs = calculateVisibleTabs(tabsEl); // eslint-disable-line no-underscore-dangle
  }, 0);
};

export {
  getAllTabs,
  getNextTab,
  getPrevTab,
  calculateVisibleTabs,
  updateProps,
};
