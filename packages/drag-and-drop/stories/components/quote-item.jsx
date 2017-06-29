// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Draggable from '../../src/view/draggable/connected-draggable';
import colors from './colors';
import type { Quote } from './types';
import type { Provided, StateSnapshot } from '../../src/view/draggable/draggable-types';

const Container = styled.a`
  border-radius: 2px;
  border: 1px solid grey;
  background: ${({ isDragging }) => (isDragging ? 'rgb(185, 244, 188)' : 'white')};

  cursor: ${({ isDragging }) => (isDragging ? 'grabbing' : 'grab')};
  box-shadow: ${({ isDragging }) => (isDragging ? '2px 2px 1px lightgrey' : 'none')};
  padding: 8px;
  min-height: 40px;
  margin-bottom: 8px;
  user-select: none;

  /* anchor overrides */
  color: ${colors.black};

  &:hover {
    color: ${colors.black};
    text-decoration: none;
  }

  /* flexbox */
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
  flex-shrink: 0;
  flex-grow: 0;
`;

const Content = styled.div`
  /* flex child */
  flex-grow: 1;

  /* flex parent */
  display: flex;
  flex-direction: column;
`;

const BlockQuote = styled.div`
  &::before {
    content: open-quote;
  }

  &::after {
    content: close-quote;
  }
`;

const Attribution = styled.small`
  margin: 0;
  margin-left: 8px;
  text-align: right;
`;

type Props = {|
  quote: Quote
|}

export default class QuoteItem extends Component {
  props: Props

  render() {
    const { quote } = this.props;
    return (
      <Draggable draggableId={quote.id}>
        {(provided: Provided, snapshot: StateSnapshot) => (
          <div>
            <Container
              href={`${quote.author.name}/${quote.id}`}
              innerRef={ref => provided.innerRef(ref)}
              isDragging={snapshot.isDragging}
              style={provided.draggableStyle}
              {...provided.dragHandleProps}
            >
              <Avatar src={quote.author.avatarUrl} alt={quote.author.name} />
              <Content>
                <BlockQuote>{quote.content}</BlockQuote>
                <Attribution>{quote.author.name}</Attribution>
              </Content>
            </Container>
            {provided.placeholder}
          </div>
        )
      }
      </Draggable>
    );
  }
}
