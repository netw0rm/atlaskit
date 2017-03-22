import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Page from './components/HtmlPage';
import DrawerWidthNavigation from './components/DrawerWidthNavigation';
import { name } from '../package.json';

storiesOf(name, module)
  .add('with custom drawer widths', () => (
    <Page>
      <DrawerWidthNavigation />
    </Page>
  ));
