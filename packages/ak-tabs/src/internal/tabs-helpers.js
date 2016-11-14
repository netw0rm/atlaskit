import shadowStyles from '../shadow.less';
import {
  buttonContainer,
  labelsContainer,
  tabDropdownItem,
  tabLabel,
  labelProp,
  selectedProp,
} from './symbols';

const getAllTabs = tabsEl => (Array.from(tabsEl.children).filter(el => el.label));

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
  return all.length ? (all.filter(el => el.selected)[0] || null) : null;
}

function getLabelForTab(tab) {
  return tab[tabLabel];
}

const getNextTab = (tabsEl, tab) => (getNextOrPrevTab(tabsEl, tab, true));

const getPrevTab = (tabsEl, tab) => (getNextOrPrevTab(tabsEl, tab, false));

/*
 * Find the tab labels that should be visible by comparing their widths against the width of the
 * tabs container. This depends on the tab labels having been rendered already, in order for them
 * to have a width.
 */
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
  allTabs.forEach((tab) => {
    tabWidths.set(tab, getLabelForTab(tab).getBoundingClientRect().width);
  });

  // If all the tabs fit, then just display them all.
  let totalWidth = 0;
  tabWidths.forEach(value => (totalWidth += value));
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

/**
 * Show visible tabs by calling calculateVisibleTabs and hiding tabs which do not fit in the
 * container and should not be displayed.
 * @param tabsEl
 */
function showVisibleTabs(tabsEl) {
  const allTabs = getAllTabs(tabsEl);
  const visibleTabs = calculateVisibleTabs(tabsEl);

  // Only show visible tabs
  allTabs.forEach((el) => {
    el[tabLabel].classList.add(shadowStyles.locals.akTabLabelHidden);
    el[tabDropdownItem].classList.remove(shadowStyles.locals.akTabDdItemHidden);
  });
  visibleTabs.forEach((el) => {
    el[tabLabel].classList.remove(shadowStyles.locals.akTabLabelHidden);
    el[tabDropdownItem].classList.add(shadowStyles.locals.akTabDdItemHidden);
  });

  // Hide the More dropdown if there are no children
  const showDropdown = visibleTabs.length < allTabs.length;
  if (showDropdown) {
    tabsEl[buttonContainer].classList.remove(shadowStyles.locals.akTabLabelHidden);
  } else {
    tabsEl[buttonContainer].classList.add(shadowStyles.locals.akTabLabelHidden);
  }

  // Truncate the label if there is only a single tab
  if (visibleTabs.length) {
    const isSingleTab = visibleTabs.length === 1;
    if (isSingleTab) {
      visibleTabs[0][tabLabel].classList.add(shadowStyles.locals.akTabLabelSingle);
    } else {
      visibleTabs[0][tabLabel].classList.remove(shadowStyles.locals.akTabLabelSingle);
    }
  }
}

const getTabsVisibility = (tabsEl) => {
  const tabsVisibility = new Map();
  if (tabsEl) {
    getAllTabs(tabsEl).forEach(tab => (tabsVisibility.set(tab, false)));
    tabsEl._visibleTabs.forEach( // eslint-disable-line no-underscore-dangle
      tab => (tabsVisibility.set(tab, true))
    );
  }
  return tabsVisibility;
};

const updateProps = (tabsEl) => {
  const allTabs = getAllTabs(tabsEl);
  tabsEl[selectedProp] = allTabs.map(el => el.selected);
  tabsEl[labelProp] = allTabs.map(el => el.label);
};

export {
  getAllTabs,
  getNextTab,
  getPrevTab,
  calculateVisibleTabs,
  showVisibleTabs,
  getTabsVisibility,
  updateProps,
};
