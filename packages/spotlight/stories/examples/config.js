import React from 'react';

export default {
  welcome: {
    nextStep: 'projectSwitcher',
    spotlightConfig: {},
    spotlightContent: <h3>Welcome to Jira onboarding!</h3>,
  },
  projectSwitcher: {
    nextStep: 'search',
    spotlightConfig: {
      dialogWidth: 200,
      target: 'projectSwitcher',
      dialogPlacement: 'right top',
      targetBgColor: '#fff',
      targetRadius: 4,
    },
    spotlightContent: <h3>This is a Project Switcher!</h3>,
  },
  search: {
    nextStep: 'searchResult',
    spotlightConfig: {
      dialogWidth: 500,
      target: 'search',
      dialogPlacement: 'right top',
      targetBgColor: '#fff',
      targetRadius: 50,
    },
    spotlightContent: <h3>This is search!</h3>,
  },
};
