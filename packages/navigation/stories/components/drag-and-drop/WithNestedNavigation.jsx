// @flow
import React, { Component } from 'react';
import Navigation, {
  AkNavigationItem,
  AkContainerTitle,
  AkContainerNavigationNested,
} from '@atlaskit/navigation';
import Avatar from '@atlaskit/avatar';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import { Draggable, Droppable, DragDropContext } from '@atlaskit/drag-and-drop';
import styled, { injectGlobal } from 'styled-components';
import type { Provided, StateSnapshot } from '../../../../drag-and-drop/src/view/draggable/draggable-types';
import type { DropResult, DraggableLocation } from '../../../../drag-and-drop/src/types';

const isDraggingClassName = 'is-dragging';

type Leaf = {
  id: string,
  content: string,
  href: string,
  image: string,
}

type List = {
  id: string,
  content: string,
  leafs: Leaf[],
}

type Group = {|
  id: string,
  lists: List[]
|}

const initialGroup: Group = (() => {
  const characters: List = {
    id: 'characters',
    content: 'Characters',
    leafs: [
      {
        id: 'finn',
        content: 'Finn',
        image: 'https://68.media.tumblr.com/avatar_09404f3287c6_128.png',
        href: 'http://adventuretime.wikia.com/wiki/Princess_Bubblegum',
      },
      {
        id: 'jake',
        content: 'Jake',
        image: 'https://68.media.tumblr.com/avatar_1f7bdbbeb59c_128.png',
        href: 'http://adventuretime.wikia.com/wiki/Princess_Bubblegum',
      },
      {
        id: 'princess',
        content: 'Princess bubblegum',
        image: 'https://68.media.tumblr.com/avatar_ec98529441c4_128.png',
        href: 'http://adventuretime.wikia.com/wiki/Princess_Bubblegum',
      },
      {
        id: 'bmo',
        content: 'BMO',
        image: 'https://68.media.tumblr.com/avatar_1a34fe6de498_128.png',
        href: 'http://adventuretime.wikia.com/wiki/Princess_Bubblegum',
      },
    ],
  };

  const locations: List = {
    id: 'locations',
    content: 'Locations',
    leafs: [
      {
        id: 'kingdom',
        content: 'Candy kingdom',
        image: 'https://68.media.tumblr.com/avatar_1a34fe6de498_128.png',
        href: 'http://adventuretime.wikia.com/wiki/Princess_Bubblegum',
      },
      {
        id: 'fort',
        content: 'Tree fort',
        image: 'https://68.media.tumblr.com/avatar_1a34fe6de498_128.png',
        href: 'http://adventuretime.wikia.com/wiki/Princess_Bubblegum',
      },
      {
        id: 'goo',
        content: 'Land of Ooo',
        image: 'https://68.media.tumblr.com/avatar_1a34fe6de498_128.png',
        // TODO: fix hrefs
        href: 'http://adventuretime.wikia.com/wiki/Princess_Bubblegum',
      },
    ],
  };

  const group: Group = {
    id: 'groups',
    lists: [locations, characters],
  };

  return group;
})();

type State = {|
  group: initialGroup,
  stack: Array<mixed>,
  isNavOpen: boolean,
  navWidth: ?number,
|}

// We want to ensure that the Droppable still takes ups the full
// height available.
const Container = styled.div`
  flex-grow: 1;
`;

const headerIcon = (
  <Avatar
    src={initialGroup.lists[0].leafs[0].image}
    name="Adventure time"
  />
);

export default class WithNestedNavigation extends Component {
  state: State

  state: State = {
    group: initialGroup,
    stack: [],
    isNavOpen: true,
    navWidth: null,
  };

  componentWillMount() {
    this.setState({
      stack: [this.getGroup(initialGroup)],
    });
  }

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

  getContainerHeaderComponent = () => (
    <div>
      <AkContainerTitle
        text="Adventure time"
        subText="Content explorer"
        icon={headerIcon}
      />
      {this.state.stack.length > 1 ? (
        <AkNavigationItem
          icon={<ArrowLeftIcon label="Back" />}
          onClick={() => this.goBack()}
          text="Back"
        />
      ) : null}
    </div>
  )

  getGroup = (myGroup: Group) => (
    <Droppable droppableId={myGroup.id}>
      {dropProvided => (
        <Container innerRef={dropProvided.innerRef}>
          {myGroup.lists.map((list: List) => (
            <Draggable
              key={list.id}
              draggableId={list.id}
            >
              {(provided: Provided, snapshot: StateSnapshot) => (
                <div>
                  <AkNavigationItem
                    isDragging={snapshot.isDragging}
                    text={list.content}
                    dnd={provided}
                    onClick={() => this.selectList(list)}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Draggable>
          ))}
        </Container>
      )}
    </Droppable>
  );

  getList = (list: List) => (
    <Droppable droppableId={list.id}>
      {dropProvided => (
        <Container innerRef={dropProvided.innerRef}>
          {list.leafs.map((leaf: Leaf) => (
            <Draggable
              key={leaf.id}
              draggableId={leaf.id}
            >
              {(provided: Provided, snapshot: StateSnapshot) => (
                <div>
                  <AkNavigationItem
                    isDragging={snapshot.isDragging}
                    text={leaf.content}
                    dnd={provided}
                    href={leaf.href}
                    icon={
                      <Avatar
                        src={leaf.image}
                        name={leaf.content}
                      />
                    }
                  />
                  {provided.placeholder}
                </div>
              )}
            </Draggable>
          ))}
        </Container>
      )}
    </Droppable>
  );

  selectList = (list: List) => {
    const stack = Array.from(this.state.stack);
    stack.push(this.getList(list));

    this.setState({ stack });
  }

  goBack = () => {
    if (this.state.stack.length <= 1) {
      return;
    }

    const stack = this.state.stack.slice(0, this.state.stack.length - 1);
    this.setState({
      stack,
    });
  }

  onDragStart = () => {
    console.log('on drag start');
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
      return;
    }

    const previous: Group = this.state.group;
    const group = {
      id: previous.id,
      lists: [...previous.lists],
    };

    // dragging the group lists
    if (source.droppableId === initialGroup.id) {
      const target: ?List = group.lists.find(
        (list: List): boolean => list.id === result.draggableId
      );

      if (!target) {
        console.error('cannot find list in group');
        return;
      }

      group.lists.splice(source.index, 1);
      group.lists.splice(destination.index, 0, target);

      this.setState({
        group,
        stack: [this.getGroup(group)],
      });
      return;
    }

    // dragging a leaf in a list
    const list: ?List = group.lists.find(
      (item: List): boolean => item.id === source.droppableId
    );

    if (!list) {
      console.error('cannot find source list');
      return;
    }

    const target: ?Leaf = list.leafs.find(
      (leaf: Leaf): boolean => leaf.id === result.draggableId
    );

    if (!target) {
      console.error('cannot find leaf inside of list', result.draggableId);
      return;
    }

    list.leafs.splice(source.index, 1);
    list.leafs.splice(destination.index, 0, target);

    // shallow clone with last page removed
    const stack = this.state.stack.slice(0, this.state.stack.length - 1);
    stack.push(this.getList(list));

    this.setState({
      group,
      stack,
    });
  }

  render() {
    const isOpen: boolean = this.state.isNavOpen;
    // Only allowing drag and drop when the navigation is open
    const isDragDisabled: boolean = !isOpen;

    return (
      <Navigation
        onResize={this.onNavResize}
        isOpen={isOpen}
        containerHeaderComponent={this.getContainerHeaderComponent}
      >
        <DragDropContext
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
        >
          <AkContainerNavigationNested
            stack={this.state.stack}
          />
        </DragDropContext>
      </Navigation>
    );
  }
}
