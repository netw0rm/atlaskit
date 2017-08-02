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
import reorder from './reorder';
import type { Provided, StateSnapshot } from '../../../../drag-and-drop/src/view/draggable/draggable-types';
import type { DropResult, DraggableLocation } from '../../../../drag-and-drop/src/types';

type ReactElement = any;

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
        href: 'http://adventuretime.wikia.com/wiki/Finn',
      },
      {
        id: 'jake',
        content: 'Jake',
        image: 'https://68.media.tumblr.com/avatar_1f7bdbbeb59c_128.png',
        href: 'http://adventuretime.wikia.com/wiki/Jake',
      },
      {
        id: 'princess',
        content: 'Princess bubblegum',
        image: 'https://68.media.tumblr.com/avatar_ec98529441c4_128.png',
        href: 'http://adventuretime.wikia.com/wiki/Princess_Bubblegum',
      },
      {
        id: 'lemongrab',
        content: 'Lemongrab',
        image: 'https://68.media.tumblr.com/avatar_1b4fe38c0534_128.png',
        href: 'http://adventuretime.wikia.com/wiki/Earl_of_Lemongrab',
      },
      {
        id: 'bmo',
        content: 'BMO',
        image: 'https://68.media.tumblr.com/avatar_1a34fe6de498_128.png',
        href: 'http://adventuretime.wikia.com/wiki/BMO',
      },
      {
        id: 'marceline',
        content: 'Marceline Abadeer',
        image: 'https://vignette2.wikia.nocookie.net/adventuretimewithfinnandjake/images/8/80/S4e25_Marceline_happy.png/revision/latest',
        href: 'http://adventuretime.wikia.com/wiki/Marceline_Abadeer',
      },
      {
        id: 'space-princess',
        content: 'Lumpy Space Princess',
        image: 'https://i.pinimg.com/236x/cc/83/81/cc8381bea3783c86df7268d7b8cb2e96--lumpy-space-princess-adventure-time.jpg',
        href: 'http://adventuretime.wikia.com/wiki/Lumpy_Space_Princess',
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
        image: 'https://vignette1.wikia.nocookie.net/adventuretimewithfinnandjake/images/0/0b/P_027.png/revision/latest/scale-to-width-down/60',
        href: 'http://adventuretime.wikia.com/wiki/Candy_Kingdom',
      },
      {
        id: 'fort',
        content: 'Tree fort',
        image: 'https://vignette4.wikia.nocookie.net/adventuretimewithfinnandjake/images/9/9f/TreeHouseINT.png/revision/latest/scale-to-width-down/60',
        href: 'http://adventuretime.wikia.com/wiki/Tree_Fort',
      },
      {
        id: 'ooo',
        content: 'Land of Ooo',
        image: 'https://vignette2.wikia.nocookie.net/adventuretimewithfinnandjake/images/9/90/New_Map_of_Ooo.jpg/revision/latest/scale-to-width-down/60',
        href: 'http://adventuretime.wikia.com/wiki/Land_of_Ooo',
      },
      {
        id: 'ice',
        content: 'Ice Kingdom',
        image: 'https://vignette2.wikia.nocookie.net/adventuretimewithfinnandjake/images/7/7e/Ice_Kingdom.png/revision/latest/scale-to-width-down/60',
        href: 'http://adventuretime.wikia.com/wiki/Ice_Kingdom',
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
  group: Group,
  stack: Array<ReactElement>,
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
    src="https://68.media.tumblr.com/avatar_09404f3287c6_128.png"
    name="Adventure time"
  />
);

export default class WithNestedNavigation extends Component {
  // eslint-disable-next-line react/sort-comp
  state: State

  constructor(props, context) {
    super(props, context);

    const state: State = {
      group: initialGroup,
      stack: [this.getGroup(initialGroup)],
      isNavOpen: true,
      navWidth: null,
    };

    this.state = state;
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

  onDragStart = () => {
    console.log('on drag start');
    // $ExpectError - body might be null
    document.body.classList.add(isDraggingClassName);
  }

  onDragEnd = (result: DropResult) => {
    console.log('result', result);
    // $ExpectError - body might be null
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
      group.lists = reorder(group.lists, source.index, destination.index);

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

    list.leafs = reorder(list.leafs, source.index, destination.index);

    // shallow clone with last page removed
    const stack = this.state.stack.slice(0, this.state.stack.length - 1);
    stack.push(this.getList(list));

    this.setState({
      group,
      stack,
    });
  }

  onNavResize = (state: Object) => {
    this.setState({
      isNavOpen: state.isOpen,
      navWidth: state.width,
    });
  }

  getGroup = (myGroup: Group, autoFocus?: boolean = false) => (
    <Droppable droppableId={myGroup.id}>
      {dropProvided => (
        <Container innerRef={dropProvided.innerRef}>
          {myGroup.lists.map((list: List, index: number) => (
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
                    onKeyDown={(event: KeyboardEvent) => {
                      if (event.key === 'Enter') {
                        this.selectList(list, true);
                      }
                    }}
                    autoFocus={autoFocus && index === 0}
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

  getList = (list: List, autoFocus? : boolean = false) => (
    <Droppable droppableId={list.id}>
      {dropProvided => (
        <Container innerRef={dropProvided.innerRef}>
          {list.leafs.map((leaf: Leaf, index: number) => (
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
                    autoFocus={autoFocus && index === 0}
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
          onClick={() => this.goBackHome()}
          onKeyDown={(event: KeyboardEvent) => {
            if (event.key === 'Enter') {
              this.goBackHome(true);
            }
          }}
          text="Back"
        />
      ) : null}
    </div>
  )

  selectList = (list: List, autoFocus?: boolean = false) => {
    const stack = Array.from(this.state.stack);
    stack.push(this.getList(list, autoFocus));

    this.setState({ stack });
  }

  goBackHome = (autoFocus?: boolean = false) => {
    if (this.state.stack.length <= 1) {
      return;
    }

    this.setState({
      stack: [this.getGroup(this.state.group, autoFocus)],
    });
  }

  render() {
    const isOpen: boolean = this.state.isNavOpen;

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
