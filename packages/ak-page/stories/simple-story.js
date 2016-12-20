import { storiesOf } from '@kadira/storybook';
import Navigation from 'ak-navigation';
import React from 'react';

import Page from '../src';

import { name } from '../package.json';

storiesOf(name, module)
  .add('page with navigation', () => (
    <Page>
      <Navigation open />
      <div>Content</div>
    </Page>
  ))
  .add('page with banner + navigation', () => (
    <Page
      banner={
        <div style={{ background: 'yellow' }}>
          Banner goes here!
        </div>
      }
    >
      <Navigation open />
      <div>Content</div>
    </Page>
  ));
