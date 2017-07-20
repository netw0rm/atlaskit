// @flow
import React from 'react';
// $ExpectError - no matching module at this time
import { storiesOf } from '@kadira/storybook';
import styled from 'styled-components';
import QuoteApp from './components/quote-app';
import { getQuotes } from './components/quotes';

const bigData = getQuotes(40);

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

const FixedScrollContainer = ScrollContainer.extend`
  /* fixed full size layout */
  height: 100vh;
  position: fixed;
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
      <div style={{ padding: 100 }}>
        <div style={{ position: 'relative' }}>
          <ScrollContainerTitle>List is within a larger scroll container</ScrollContainerTitle>
          <QuoteApp
            initial={bigData}
          />
        </div>
      </div>
    </ScrollContainer>
  ))
  .add('droppable within a larger *fixed* scroll container', () => (
    <FixedScrollContainer>
      <ScrollContainerTitle>List is within a larger fixed scroll container</ScrollContainerTitle>
      <QuoteApp
        initial={bigData}
      />
    </FixedScrollContainer>
  ));

