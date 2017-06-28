// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Droppable from '../../src/view/droppable/connected-droppable';
import type { Provided, StateSnapshot } from '../../src/view/droppable/droppable-types';

const Container = styled.div`
  background-color: ${({ isDraggingOver }) => (isDraggingOver ? 'lightyellow' : 'lightblue')};
  display: flex;
  flex-direction: column;
  padding: 8px;
  padding-bottom: 0;
  user-select: none;
  width: 250px;
`;

export default class List extends PureComponent {
  props: {|
    listId: string,
    children?: any,
  |}

  render() {
    return (
      <Droppable
        droppableId={this.props.listId}
        isDropEnabled
        type="TASK"
      >
        {(provided: Provided, snapshot: StateSnapshot) => (
          <Container
            isDraggingOver={snapshot.isDraggingOver}
            innerRef={provided.innerRef}
          >
            {this.props.children}
          </Container>
        )}
      </Droppable>
    );
  }
}
