import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Lorem from 'react-lorem-component';
import AkNavigation from '../src';

storiesOf(name, module)
  .add('empty ak-navigation', () => (
    <div style={{ display: 'flex' }}>
      <style>{'body { margin: 0 }'}</style>
      <AkNavigation />
      <div>
        <Lorem count="30" />
      </div>
    </div>
  ))
  .add('empty ak-navigation that is open and not collapsible', () => (
    <AkNavigation open />
  ))
  .add('empty ak-navigation that is open and not collapsible', () => (
    <AkNavigation>
      <Lorem count="30" />
    </AkNavigation>
  ));
