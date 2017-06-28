// @flow
import React, { PureComponent } from 'react';
import { storiesOf } from '@kadira/storybook';
import faker from 'faker';
import { DragDropContext } from '../src/';
import Task from './components/task';
import List from './components/list';
import type { TaskType } from './types';
import type { DropResult, DraggableLocation } from '../src/types';

const getTasks = (count: number): TaskType[] =>
  Array.from({ length: count }, (v, k) => k)
    .map((val: number): TaskType => ({
      id: `${val}`,
      title: faker.lorem.words(),
      description: faker.lorem.words(faker.random.number({
        min: 3, max: 15,
      })),
    }));

class Standard extends PureComponent {
  state: {|
    tasks: TaskType[]
  |}

  state = {
    tasks: getTasks(5),
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

    // simple reorder - assuming can only move in the same list
    const tasks: TaskType[] = [...this.state.tasks];

    const temp: TaskType = tasks[source.index];
    tasks[source.index] = tasks[destination.index];
    tasks[destination.index] = temp;

    this.setState({
      tasks,
    });
  }

  render() {
    const { tasks } = this.state;
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        <List listId="list">
          {tasks.map((task: TaskType) => (
            <Task
              task={task}
              key={task.id}
            />
          ))}
        </List>
      </DragDropContext>
    );
  }
}

storiesOf('single vertical list', module)
  .add('standard list with reordering', () => (
    <Standard />
  ))
  .add('custom drag handle', () => (
    <div>Hello there</div>
  ));
