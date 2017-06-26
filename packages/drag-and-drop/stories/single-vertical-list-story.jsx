// @flow
import React, { PureComponent } from 'react';
import { DragDropContext } from '../src/';
import { storiesOf } from '@kadira/storybook';
import Person from './components/person';
import List from './components/list';
import type { PersonType } from './types';
import type { DropResult, DraggableLocation } from '../src/types';

const getPeople = (count: number): Person[] =>
  Array.from({ length: count }, (v, k) => k)
    .map((val: number): Person => ({
      id: `${val}`,
      name: `Mr ${val}`,
    }));

class Standard extends PureComponent {
  state: {|
    people: PersonType[]
  |}

  state = {
    people: getPeople(300),
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
    const people: Person[] = [...this.state.people];

    const temp: Person = people[source.index];
    people[source.index] = people[destination.index];
    people[destination.index] = temp;

    this.setState({
      people,
    });
  }

  render() {
    const { people } = this.state;
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        <List listId="list">
          {people.map((person: PersonType) => (
            <Person
              data={person}
              key={person.id}
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
