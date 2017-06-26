import { storiesOf } from '@storybook/react';
import React from 'react';
import Page from './components/HtmlPage';
import CustomDrawerNavigation from './components/CustomDrawerNavigation';
import { name } from '../package.json';

storiesOf(name, module)
  .add('with custom drawers', () => (
    <Page>
      <CustomDrawerNavigation />
    </Page>
  ));
