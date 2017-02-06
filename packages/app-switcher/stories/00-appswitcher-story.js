import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Chrome } from 'akutil-readme';

import AppSwitcherMenu from './examples/AppSwitcherMenu';
import { name } from '../package.json';

import data from './data.json';

storiesOf(name, module)
  .add('with all components', () => (
    <Chrome>
      <AppSwitcherMenu {...data} />
    </Chrome>
  ))

  .add('with no recent containers', () => (
    <Chrome>
      <AppSwitcherMenu
        {...{
          ...data,
          recentContainers: [],
        }}
      />
    </Chrome>
  ))

  .add('with no suggested application', () => (
    <Chrome>
      <AppSwitcherMenu
        {...{
          ...data,
          suggestedApplication: {
            show: false,
          },
        }}
      />
    </Chrome>
  ))

  .add('with only applications', () => (
    <Chrome>
      <AppSwitcherMenu
        {...{
          ...data,
          suggestedApplication: {
            show: false,
          },
          recentContainers: [],
        }}
      />
    </Chrome>
  ));
