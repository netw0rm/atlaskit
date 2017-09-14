import React from 'react';

export default {
  welcome: {
    nextStep: 'projectSwitcher',
    spotlightConfig: {
      dialogPlacement: 'right top',
      dialogAppearance: 'purple',
    },
    spotlightContent: <h3>Welcome to Jira onboarding!</h3>,
  },
  projectSwitcher: {
    nextStep: 'search',
    spotlightConfig: {
      target: 'projectSwitcher',
      dialogPlacement: 'right top',
      dialogAppearance: 'purple',
      targetBgColor: '#fff',
      targetRadius: 4,
    },
    spotlightContent: <h3>This is a Project Switcher!</h3>,
  },
  search: {
    nextStep: 'searchResult',
    spotlightConfig: {
      target: 'search',
      dialogPlacement: 'right top',
      dialogAppearance: 'purple',
      targetBgColor: '#fff',
      targetRadius: 50,
    },
    spotlightContent: <h3>This is search!</h3>,
  },
};
