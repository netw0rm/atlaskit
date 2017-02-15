import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Lorem from 'react-lorem-component';
import Page from './components/HtmlPage';
import DrawerNavigation from './components/DrawerNavigation';
import { name } from '../package.json';

storiesOf(name, module)
  .add('with collapsed state nested navigation drawers', () => (
    <Page>
      <DrawerNavigation />
      <div>
        <Lorem count="30" />
      </div>
    </Page>
  ));
