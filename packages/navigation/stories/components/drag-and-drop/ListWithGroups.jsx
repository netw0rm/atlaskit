// @flow
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
// RB: this has to be revisited when drag and drop will be removed
import React, { Component } from 'react';
// $FlowFixMe
import faker from 'faker';
import Navigation, {
  AkNavigationItem,
  AkNavigationItemGroup,
  AkCollapseOverflow,
} from '@atlaskit/navigation';
import Avatar from '@atlaskit/avatar';
// $FlowFixMe
import { Draggable, Droppable, DragDropContext } from '@atlaskit/drag-and-drop';
import { injectGlobal } from 'styled-components';
import reorder from './reorder';
import reorderingUsageNote from './UsageNote';
import Container from './Container';

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

  onDragEnd = (result) => {
    // $ExpectError
    document.body.classList.remove(isDraggingClassName);

    const source = result.source;
    const destination = result.destination;

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

  renderGroupItem = (
    { item, isOpen, extraAvatarProps, type } :
    { item: any, isOpen: boolean, extraAvatarProps?: Function, type: string }
  ) => {
    const baseNavItemProps = {
      text: item.name,
      isCompact: true,
      icon: (
        <Avatar
          appearance="square"
          size="small"
          src={item.avatarUrl}
          name={item.name}
          {...extraAvatarProps && extraAvatarProps(item)}
        />
      ),
    };
    return isOpen ? (
      <Draggable
        key={item.id}
        draggableId={item.id}
        type={type}
      >
        {(provided, snapshot) => (
          <div>
            <AkNavigationItem
              {...baseNavItemProps}
              isDragging={snapshot.isDragging}
              dnd={provided}
            />
            {provided.placeholder}
          </div>
      )}
      </Draggable>
    ) : (
      <AkNavigationItem {...baseNavItemProps} />
    );
  }

  renderGroup = (
    { dropProvided, items, groupTitle, type, isOpen, extraAvatarProps } :
    { dropProvided: any, items: Person[]|Room[], groupTitle: string, type: string,
      isOpen: boolean, extraAvatarProps?: Function }
  ) => (
    <AkNavigationItemGroup
      title={groupTitle}
      innerRef={dropProvided && dropProvided.innerRef}
    >
      {items.map(item => (
        this.renderGroupItem({
          item,
          isOpen,
          extraAvatarProps,
          type,
        })
      ))}
    </AkNavigationItemGroup>
  )

  renderContainerContent = () => {
    const isOpen: boolean = this.state.isNavOpen;
    const roomOptions = {
      items: this.state.rooms,
      groupTitle: 'Rooms',
      type: 'room',
      isOpen,
    };
    const peopleOptions = {
      items: this.state.people,
      groupTitle: 'People',
      type: 'people',
      isOpen,
      extraAvatarProps: person => ({ presence: person.presence }),
    };

    return isOpen ? (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        <div>
          <Droppable droppableId="rooms" type={roomOptions.type}>
            {dropProvided => this.renderGroup({ ...roomOptions, dropProvided })}
          </Droppable>
          <Droppable droppableId="people" type={peopleOptions.type}>
            {dropProvided => this.renderGroup({ ...peopleOptions, dropProvided })}
          </Droppable>
        </div>
      </DragDropContext>
    ) : (
      <AkCollapseOverflow>
        {this.renderGroup(roomOptions)}
        {this.renderGroup(peopleOptions)}
      </AkCollapseOverflow>
    );
  }

  render() {
    return (
      <Container>
        <Navigation
          onResize={this.onNavResize}
          isOpen={this.state.isNavOpen}
        >
          {this.renderContainerContent()}
        </Navigation>
        {reorderingUsageNote}
      </Container>
    );
  }
}
