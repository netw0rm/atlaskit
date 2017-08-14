// @flow
// RB: this has to be revisited when drag and drop will be removed
import React, { Component } from 'react';
import Navigation, { AkNavigationItem, presetThemes } from '@atlaskit/navigation';
import RadioGroup from '@atlaskit/field-radio-group';
// $FlowFixMe
import { Draggable, Droppable, DragDropContext } from '@atlaskit/drag-and-drop';
import styled, { injectGlobal } from 'styled-components';
import reorder from './reorder';
// $FlowFixMe
import type { Provided, StateSnapshot } from '../../../../drag-and-drop/src/view/draggable/draggable-types';
// $FlowFixMe
import type { DropResult, DraggableLocation } from '../../../../drag-and-drop/src/types';

const Container = styled.div`
  display: flex;
`;

const isDraggingClassName = 'is-dragging';

type Item = {|
  id: string,
  content: string,
|}

type State = {|
  items: Item[],
  isNavOpen: boolean,
  navWidth: ?number,
  containerThemeName: string,
|}

const getItems = (count: number): Item[] =>
  Array.from({ length: count }, (v, k) => k).map((val: number): Item => ({
    id: `${val}`,
    content: `item ${val}`,
  }));

export default class SimpleListWithTheme extends Component {
  state: State

  state: State = {
    items: getItems(30),
    isNavOpen: true,
    navWidth: null,
    containerThemeName: 'container',
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

  onNavResize = (state: any) => {
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
      return;
    }

    const items: Item[] = reorder(
      this.state.items,
      source.index,
      destination.index
    );

    this.setState({
      items,
    });
  }

  changeContainerTheme = (event: HTMLInputElement) => {
    this.setState({
      // $ExpectError - issue grabbing target from event
      containerThemeName: event.target.value,
    });
  }

  render() {
    const isOpen: boolean = this.state.isNavOpen;
    // Only allowing drag and drop when the navigation is open
    const isDragDisabled: boolean = !isOpen;

    return (
      <Container>
        <Navigation
          onResize={this.onNavResize}
          isOpen={isOpen}
          containerTheme={presetThemes[this.state.containerThemeName]}
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
                            onClick={() => console.log(`clicking on ${item.content}`)}
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
        <RadioGroup
          label="Container theme"
          items={Object.keys(presetThemes).map((key: string) => ({
            name: key,
            value: key,
            label: key,
            defaultSelected: key === 'container',
          }))}
          onRadioChange={this.changeContainerTheme}
        />
      </Container>
    );
  }
}
