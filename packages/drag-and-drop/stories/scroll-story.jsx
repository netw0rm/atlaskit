// @flow
import React from 'react';
// $ExpectError - no matching module at this time
import { storiesOf } from '@kadira/storybook';
import styled from 'styled-components';
import QuoteApp from './components/quote-app';
import { getQuotes } from './components/quotes';

const bigData = getQuotes(40);

const ScrollContainer = styled.div`
  background: lightgrey;
  padding: 16px;
  overflow-y: scroll;
  height: 80vh;
  width: 500px;
`;

const ScrollContainerTitle = styled.h4`
  text-align: center;
  margin-bottom: 8px;
`;

storiesOf('scroll', module)
  .add('window scrolling', () => (
    <QuoteApp
      initial={bigData}
    />
  ))
  .add('independent scroll container', () => (
    <QuoteApp
      initial={bigData}
      listStyle={{
        overflowY: 'scroll',
        maxHeight: '80vh',
      }}
    />
  ))
  .add('window scrolling and independent scroll container', () => (
    <QuoteApp
      initial={bigData}
      listStyle={{
        overflowY: 'scroll',
        maxHeight: '120vh',
      }}
    />
  ))
  .add('droppable within a larger independent scroll container', () => (
    <ScrollContainer>
      <ScrollContainerTitle>List is within a larger scroll container</ScrollContainerTitle>
      <QuoteApp
        initial={bigData}
      />
    </ScrollContainer>
  ));

