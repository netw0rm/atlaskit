const sampleTabsNoSelection = [
  {
    content: 'Tab 1 content',
    label: 'Tab 1 label',
  },
  {
    content: 'Tab 2 content',
    label: 'Tab 2 label',
  },
  {
    content: 'Tab 3 content',
    label: 'Tab 3 label',
  },
];

const sampleTabs = sampleTabsNoSelection.map(item => ({ ...item }));
sampleTabs[1].isSelected = true;

const sampleTabsDefaultSelected = sampleTabsNoSelection.map(item => ({ ...item }));
sampleTabsDefaultSelected[1].defaultSelected = true;

export {
  sampleTabs,
  sampleTabsNoSelection,
  sampleTabsDefaultSelected,
};
