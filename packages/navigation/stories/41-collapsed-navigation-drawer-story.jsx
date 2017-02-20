import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Lorem from 'react-lorem-component';
import Page from './components/HtmlPage';
import MultiDrawerNavigation from './components/MultiDrawerNavigation';
import { name } from '../package.json';

storiesOf(name, module)
  .add('with collapsed state nested navigation drawers', () => (
    <Page>
      <MultiDrawerNavigation />
      <div>
        <Lorem count="30" />
      </div>
    </Page>
  ));
