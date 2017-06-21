// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { draggable } from '../../src/';
import type { TaskType } from '../types';
import type { StateSnapshot } from '../../src/view/draggable/draggable-types';

const Container = styled.a`
  border-radius: 2px;
  background-color: ${({ isDragging }) => (isDragging ? '#2684FF' : 'white')};
  cursor: ${({ isDragging }) => (isDragging ? 'grabbing' : 'grab')};
  padding: 8px;
  display: block;
  height: 80px;
  margin-bottom: 8px;
  user-select: none;
`;

type OwnProps = {|
  task: TaskType
|}

type InjectedProps = {|
  handleProps: Object,
  innerRef: (Element) => void,
  isDragging: boolean,
  style: Object,
|}

class Task extends PureComponent {
  props: OwnProps & InjectedProps

  render() {
    const { task, handleProps, innerRef, isDragging, style } = this.props;
    return (
      <Container
        innerRef={ref => innerRef(ref)}
        isDragging={isDragging}
        {...handleProps}
        style={style}
      >
        ({task.id}): {task.description}
      </Container>
    );
  }
}

const provide = (ownProps: OwnProps) => ({
  id: ownProps.task.id,
});

const mapStateToProps = (state: StateSnapshot) => ({
  isDragging: state.isDragging,
});

export default draggable('TASK', provide, mapStateToProps)(Task);
