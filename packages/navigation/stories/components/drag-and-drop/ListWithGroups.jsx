// @flow
// RB: this has to be revisited when drag and drop will be removed
import React, { Component } from 'react';
// $FlowFixMe
import faker from 'faker';
import Navigation, { AkNavigationItem, AkNavigationItemGroup } from '@atlaskit/navigation';
import Avatar from '@atlaskit/avatar';
// $FlowFixMe
import { Draggable, Droppable, DragDropContext } from '@atlaskit/drag-and-drop';
import { injectGlobal } from 'styled-components';
import reorder from './reorder';
// $FlowFixMe
import type { Provided, StateSnapshot } from '../../../../drag-and-drop/src/view/draggable/draggable-types';
// $FlowFixMe
import type { DropResult, DraggableLocation } from '../../../../drag-and-drop/src/types';

const isDraggingClassName = 'is-dragging';

type Person = {|
  id: string,
  name: string,
  avatarUrl: string,
  presence: 'online' | 'offline' | 'busy',
|}

type Room = {|
  id: string,
  name: string,
  avatarUrl: string,
|}

type State = {|
  rooms: Room[],
  people: Person[],
  isNavOpen: boolean,
  navWidth: ?number,
|}

const roomPublicUrl: string = 'https://s3.amazonaws.com/uploads.hipchat.com/10804/220836/1mQA5ruQVIyOS8c/public-room-96.png';
const roomPrivateUrl: string = 'https://s3.amazonaws.com/uploads.hipchat.com/10804/220836/1mQA5ruQVIyOS8c/private-room-96.png';

const getPeople = (count: number): Person[] =>
  Array.from({ length: count }, (v, k) => k).map((val: number): Person => ({
    id: `person-${val}`,
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    avatarUrl: `${faker.image.avatar()}`,
    presence: faker.random.arrayElement(['online', 'offline', 'busy']),
  }))
  // sort alphabetically
  .sort((a: Person, b: Person): number =>
    (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
  );

const getRooms = (count: number): Room[] =>
  Array.from({ length: count }, (v, k) => k).map((val: number): Room => ({
    id: `room-${val}`,
    name: `${faker.company.bsAdjective()} ${faker.company.catchPhraseNoun()}`,
    avatarUrl: faker.random.boolean() ? roomPublicUrl : roomPrivateUrl,
  }))
  // sort alphabetically
  .sort((a: Room, b: Room): number =>
    (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
  );

export default class ListWithGroups extends Component {
  state: State

  state: State = {
    rooms: getRooms(5),
    people: getPeople(30),
    isNavOpen: true,
    navWidth: null,
  };

  componentDidMount() {
    // eslint-disable-next-line no-unused-expressions
    injectGlobal`
      body.${isDraggingClassName} {
        cursor: grabbing;
        user-select: none;
      }
    `;
  }

  onNavResize = (state: Object) => {
    this.setState({
      isNavOpen: state.isOpen,
      navWidth: state.width,
    });
  }

  onDragStart = () => {
    // $ExpectError
    document.body.classList.add(isDraggingClassName);
  }

  onDragEnd = (result: DropResult) => {
    // $ExpectError
    document.body.classList.remove(isDraggingClassName);

    const source: DraggableLocation = result.source;
    const destination: ?DraggableLocation = result.destination;

    // nothing to do here!
    if (destination == null) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      console.error('unsupported use case');
    }

    if (source.droppableId === 'rooms') {
      const rooms = reorder(this.state.rooms, source.index, destination.index);
      this.setState({ rooms });
      return;
    }

    if (source.droppableId === 'people') {
      const people = reorder(this.state.people, source.index, destination.index);
      this.setState({ people });
    }
  }

  render() {
    const isOpen: boolean = this.state.isNavOpen;
    // Only allowing drag and drop when the navigation is open
    const isDragDisabled: boolean = !isOpen;

    return (
      <Navigation
        onResize={this.onNavResize}
        isOpen={isOpen}
      >
        <DragDropContext
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
        >
          <div>
            <Droppable droppableId="rooms" type="room">
              {dropProvided => (
                <AkNavigationItemGroup
                  title="Rooms"
                  innerRef={dropProvided.innerRef}
                >
                  {this.state.rooms.map((room: Room) => (
                    <Draggable
                      key={room.id}
                      draggableId={room.id}
                      type="room"
                      isDragDisabled={isDragDisabled}
                    >
                      {(provided: Provided, snapshot: StateSnapshot) => (
                        <div>
                          <AkNavigationItem
                            isDragging={snapshot.isDragging}
                            text={room.name}
                            dnd={provided}
                            isCompact
                            icon={
                              <Avatar
                                appearance="square"
                                size="small"
                                src={room.avatarUrl}
                                name={room.name}
                              />
                            }
                          />
                          {provided.placeholder}
                        </div>
                    )}
                    </Draggable>
                ))}
                </AkNavigationItemGroup>
            )}
            </Droppable>
            <Droppable droppableId="people" type="people">
              {dropProvided => (
                <AkNavigationItemGroup
                  title="People"
                  innerRef={dropProvided.innerRef}
                >
                  {this.state.people.map((person: Person) => (
                    <Draggable
                      key={person.id}
                      draggableId={person.id}
                      isDragDisabled={isDragDisabled}
                      type="people"
                    >
                      {(provided: Provided, snapshot: StateSnapshot) => (
                        <div>
                          <AkNavigationItem
                            isDragging={snapshot.isDragging}
                            text={person.name}
                            dnd={provided}
                            isCompact
                            icon={
                              <Avatar
                                size="small"
                                name={person.name}
                                src={person.avatarUrl}
                                presence={person.presence}
                              />
                            }
                          />
                          {provided.placeholder}
                        </div>
                    )}
                    </Draggable>
                ))}
                </AkNavigationItemGroup>
            )}
            </Droppable>
          </div>

        </DragDropContext>
      </Navigation>
    );
  }
}
