// @flow
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import QuoteApp from './components/quote-app';

storiesOf('single vertical list', module)
  .add('standard list with reordering', () => (
    <QuoteApp />
  ))
  .add('custom drag handle', () => (
    <div>Hello there</div>
  ));
