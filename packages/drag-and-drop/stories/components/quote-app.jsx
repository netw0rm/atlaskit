// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { DragDropContext } from '../../src/';
import QuoteItem from './quote-item';
import List from './quote-list';
import data from './quotes';
import colors from './colors';
import type { Quote } from './types';
import type { DropResult, DraggableLocation } from '../../src/types';

const Root = styled.div`
  background-color: ${colors.blue};
  min-height: 100vh;

  /* flexbox */
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export default class QuoteApp extends Component {
  state: {|
    quotes: Quote[],
  |}

  state = {
    quotes: data,
  }

  onDragStart = () => {
  }

  onDragEnd = (result: DropResult) => {
    const source: DraggableLocation = result.source;
    const destination: ?DraggableLocation = result.destination;

    // nothing to do here!
    if (destination == null) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      console.error('unsupported use case');
      return;
    }

    const quotes: Quote[] = [...this.state.quotes];
    const target: ?Quote = quotes.find(
      (quote: Quote): boolean => quote.id === result.draggableId
    );

    if (!target) {
      console.error('cannot find quote in list');
      return;
    }

    // remove target from the array
    quotes.splice(source.index, 1);

    // put into correct spot
    quotes.splice(destination.index, 0, target);

    this.setState({
      quotes,
    });
  }

  render() {
    const { quotes } = this.state;
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        <Root>
          <List listId="list">
            {quotes.map((quote: Quote) => (
              <QuoteItem
                quote={quote}
                key={quote.id}
              />
          ))}
          </List>
        </Root>
      </DragDropContext>
    );
  }
}
