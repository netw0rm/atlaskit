// @flow
import React, { PureComponent } from 'react';
import { droppable, draggable, DragDropContext } from '../src/';
import { storiesOf } from '@kadira/storybook';
import Person from './components/person';
import List from './components/list';
import type { PersonType } from './types';
import { DragResult, DragLocation } from '../src/types';

class Standard extends PureComponent {
  state: {|
    people: PersonType[]
  |}

  state = {
    people: [
      {
        name: 'Alex',
        id: 'alex',
      },
      {
        name: 'Ben',
        id: 'ben',
      },
    ],
  }

  onDragStart = () => {
  }

  onDragEnd = (result: DragResult) => {
    const source: DragLocation = result.source;
    const destination: ?DragLocation = result.destination;

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
