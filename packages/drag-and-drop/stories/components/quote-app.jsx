// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { DragDropContext } from '../../src/';
import QuoteItem from './quote-item';
import QuoteDescription from './quote-description';
import QuoteList from './quote-list';
import QuoteTracker from './quote-tracker';
import { colors, grid, borderRadius } from './constants';
import type { Quote } from './types';
import type { DropResult, DraggableLocation, DraggableId } from '../../src/types';

const Root = styled.div`
  background-color: ${colors.blue};
  padding: ${grid * 2}px;
  min-height: 100vh;

  /* flexbox */
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Details = styled.div`
  background-color: white;
  border-radius: ${borderRadius}px;
  padding: ${grid}px;
  margin-left: ${grid * 2}px;
  width: 400px;
`;

const Divider = styled.hr`
  color: lightgrey;
  margin-top: ${grid * 2}px;
  margin-bottom: ${grid * 2}px;
`;

type Props = {|
  initial: Quote[],
  listStyle?: Object,
|}

type State = {|
  quotes: Quote[]
|}

export default class QuoteApp extends Component {
  props: Props
  state: State

  state: State = {
    quotes: this.props.initial,
  };

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
        onDragEnd={this.onDragEnd}
      >
        <Root>
          <QuoteList listId="list" style={this.props.listStyle}>
            {quotes.map((quote: Quote) => (
              <QuoteItem
                quote={quote}
                key={quote.id}
              />
          ))}
          </QuoteList>
        </Root>
      </DragDropContext>
    );
  }
}
