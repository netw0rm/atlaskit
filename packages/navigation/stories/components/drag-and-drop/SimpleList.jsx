// @flow
import React, { Component } from 'react';
import Navigation, { AkNavigationItem } from '@atlaskit/navigation';
import { Draggable, Droppable, DragDropContext } from '@atlaskit/drag-and-drop';
import { injectGlobal } from 'styled-components';
import type { Provided, StateSnapshot } from '../../../../drag-and-drop/src/view/draggable/draggable-types';
import type { DropResult, DraggableLocation } from '../../../../drag-and-drop/src/types';

const isDraggingClassName = 'is-dragging';

type Item = {|
  id: string,
  content: string,
|}

type State = {|
  items: Item[],
  isNavOpen: boolean,
  navWidth: ?number,
|}

const getItems = (count: number): Item[] =>
  Array.from({ length: count }, (v, k) => k).map((val: number): Item => ({
    id: `${val}`,
    content: `item ${val}`,
  }));

export default class SimpleList extends Component {
  state: State

  state: State = {
    items: getItems(30),
    isNavOpen: true,
    navWidth: null,
  };

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
      return;
    }

    const items: Item[] = [...this.state.items];
    const target: ?Item = items.find(
      (item: Item): boolean => item.id === result.draggableId
    );

    if (!target) {
      console.error('cannot find quote in list');
      return;
    }

    // remove target from the array
    items.splice(source.index, 1);

    // put into correct spot
    items.splice(destination.index, 0, target);

    this.setState({
      items,
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
          <Droppable droppableId="list">
            {dropProvided => (
              <div ref={dropProvided.innerRef}>
                {this.state.items.map((item: Item) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    isDragDisabled={isDragDisabled}
                  >
                    {(provided: Provided, snapshot: StateSnapshot) => (
                      <div>
                        <AkNavigationItem
                          isDragging={snapshot.isDragging}
                          onClick={() => alert(`clicking on ${item.content}`)}
                          text={item.content}
                          dnd={provided}
                        />
                        {provided.placeholder}
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Navigation>
    );
  }
}
