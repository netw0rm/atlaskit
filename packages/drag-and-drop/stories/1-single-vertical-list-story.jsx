// @flow
import React from 'react';
// $ExpectError - no matching module at this time
import { storiesOf } from '@kadira/storybook';
import QuoteApp from './components/quote-app';
import data from './components/quotes';

storiesOf('single vertical list', module)
  .add('standard list with reordering', () => (
    <QuoteApp initial={data} />
  ));
