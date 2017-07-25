// @flow
import React from 'react';
// $ExpectError - no matching module at this time
import { storiesOf } from '@kadira/storybook';
import styled from 'styled-components';
import QuoteApp from './components/quote-app';
import { getQuotes } from './components/quotes';
import type { Quote } from './components/types';

const bigData: Quote[] = getQuotes(40);

const ScrollContainer = styled.div`
  box-sizing: border-box;
  background: lightgrey;
  padding: 16px;
  overflow-y: scroll;
  width: 500px;

  /* standard layout */
  height: 80vh;
  position: relative;
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
  .add('droppable is a scroll container', () => (
    <QuoteApp
      initial={bigData}
      listStyle={{
        overflowY: 'scroll',
        maxHeight: '80vh',
        position: 'relative',
      }}
    />
  ))
  .add('window scrolling and a droppable scroll container', () => (
    <QuoteApp
      initial={bigData}
      listStyle={{
        overflowY: 'scroll',
        maxHeight: '120vh',
        position: 'relative',
      }}
    />
  ))
  .add('droppable within a larger scroll container', () => (
    <ScrollContainer>
      <ScrollContainerTitle>List is within a larger scroll container</ScrollContainerTitle>
      <QuoteApp
        initial={bigData}
      />
    </ScrollContainer>
  ));

