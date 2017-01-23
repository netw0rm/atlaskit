import React, { PropTypes, PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import styles from '../styles.less';
import TabsNav from './TabsNav';

export default class ResponsiveTabsNav extends PureComponent {
  static propTypes = {
    onKeyboardNav: PropTypes.func.isRequired,
    tabs: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.node,
      label: PropTypes.string.isRequired,
      onSelect: PropTypes.func.isRequired,
      isSelected: PropTypes.bool,
    })),
  }

  static defaultProps = {
    tabs: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      tabs: props.tabs,
      secondaryTabs: [],
      isUpdatingTabs: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ tabs: nextProps.tabs });
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Don't re-render when we are just resetting the state
    if (nextState.isUpdatingTabs !== this.state.isUpdatingTabs && !nextState.isUpdatingTabs) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    this.checkUpdatingTabs();
  }

  checkUpdatingTabs() {
    if (this.state.isUpdatingTabs) {
      this.setState({ isUpdatingTabs: false });
    } else {
      // TODO: We need to do this on initial render, and when the container resizes
      const calculatedTabs = this.calculateTabs();
      this.setState({
        tabs: calculatedTabs.tabs,
        secondaryTabs: calculatedTabs.secondaryTabs,
        isUpdatingTabs: true,
      });
    }
  }

  calculateTabs = () => {
    const root = findDOMNode(this.tabsNav);

    // Get the width of the <li> item containing each tab label element.
    const allTabs = this.tabsNav.tabs.map(tab => tab);
    const tabsElToData = new Map();

    // Map the tab elements to the tab data objects
    allTabs.forEach((tabEl, index) => (tabsElToData.set(tabEl, this.props.tabs[index])));

    let widthRemaining = root.getBoundingClientRect().width;

    // Get the width of each tab label
    const tabWidths = new Map();
    allTabs.forEach(tab => (tabWidths.set(tab, tab.el.getBoundingClientRect().width)));

    // If all the tabs fit, then just display them all.
    let totalWidth = 0;
    tabWidths.forEach(value => (totalWidth += value));
    if (totalWidth <= widthRemaining) {
      return {
        tabs: this.props.tabs,
        secondaryTabs: [],
      };
    }

    // // Otherwise, we need to fit the tabs into the available space, and pull some into a dropdown
    const visibleTabs = new Map();

    // The dropdown trigger item needs to be displayed
    const tabsButton = root.querySelector(`.${styles.locals.akTabsButtonContainer}`);
    widthRemaining -= tabsButton.getBoundingClientRect().width;

    // // The currently selected tab is always displayed
    let selectedIndex = null;
    for (let i = 0; i < this.tabsNav.tabs.length; i++) {
      if (this.tabsNav.tabs[i].isSelected) {
        selectedIndex = i;
        break;
      }
    }
    const selectedTab = this.tabsNav.tabs[selectedIndex];
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

    // Return an array of tabs that should be displayed, and an array of tabs that should not.
    const visible = [];
    const notVisible = [];
    visibleTabs.forEach((value, key) => (visible.push(tabsElToData.get(key))));
    allTabs
      .filter(tab => !visibleTabs.has(tab))
      .forEach(value => (notVisible.push(tabsElToData.get(value))));

    return {
      tabs: visible,
      secondaryTabs: notVisible,
    };
  }

  render() {
    return (
      <TabsNav
        onKeyboardNav={this.props.onKeyboardNav}
        tabs={this.state.tabs}
        secondaryTabs={this.state.secondaryTabs}
        ref={(ref) => { this.tabsNav = ref; }}
      />
    );
  }
}
