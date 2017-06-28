// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Draggable from '../../src/view/draggable/connected-draggable';
import type { TaskType } from '../types';
import type { Provided, StateSnapshot } from '../../src/view/draggable/draggable-types';

const Container = styled.a`
  border-radius: 2px;
  border: 1px solid grey;
  background-color: ${({ isDragging }) => (isDragging ? '#2684FF' : 'white')};
  cursor: ${({ isDragging }) => (isDragging ? 'grabbing' : 'grab')};
  padding: 8px;
  display: block;
  min-height: 40px;
  margin-bottom: 8px;
  user-select: none;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

type Props = {|
  task: TaskType
|}

export default class Task extends Component {
  props: Props

  render() {
    const { task } = this.props;
    return (
      <Draggable
        draggableId={task.id}
        type="TASK"
        isDragEnabled
      >
        {(provided: Provided, snapshot: StateSnapshot) => (
          <div>
            <Container
              innerRef={ref => provided.innerRef(ref)}
              href={task.id}
              isDragging={snapshot.isDragging}
              style={provided.draggableStyle}
              {...provided.dragHandleProps}
            >
              {task.description}
              <Avatar src={task.avatarUrl} alt={task.id} />
            </Container>
            {provided.placeholder}
          </div>
        )
      }
      </Draggable>
    );
  }
}
