// @flow

import React, { Component } from 'react';
import { DragDropContext } from '@atlaskit/drag-and-drop';
import ImageIcon from '@atlaskit/icon/glyph/image';
import { injectGlobal } from 'styled-components';
import BasicNavigation from '../../components/BasicNavigation';
import NavigationItemDraggable from './NavigationItemDraggable';
import NavigationItemGroupDraggable from './NavigationItemGroupDraggable';
import type { Provided } from '../../../src/types';

const IS_DRAGGING_CLASS_NAME = 'is-dragging-in-nav';

type DraggableId = string;

type Item = {|
  id: DraggableId,
  name: string,
|};

type Group = {|
  name: string,
  items: Array<Item>,
  type: string,
|};

type Props = {|
  defaultGroups: Array<Group>,
  containerTheme: Provided,
|}

type DragLocation = {|
  destination: number,
  droppableId: string,
  index: number,
|};

type DragResult = {|
  draggableId: DraggableId,
  source: DragLocation,
  destination?: DragLocation,
|}

type State = {|
  groups: Array<Group>
|}

export default class DragAndDrop extends Component {
  static defaultProps = {
    defaultGroups: [
      {
        name: 'Teams',
        type: 'team',
        items: [
          { id: '1', name: 'Seahawks' },
          { id: '2', name: 'Rangers' },
          { id: '3', name: 'Cowboys' },
          { id: '4', name: 'Falcons' },
          { id: '5', name: 'Patriots' },
        ],
      },
    ],
  }

  constructor(props: Props) {
    super(props);
    this.state = { groups: this.props.defaultGroups };
  }

  state: State

  componentDidMount() {
    // eslint-disable-next-line no-unused-expressions
    injectGlobal`
    body.${IS_DRAGGING_CLASS_NAME} * {
      cursor: grabbing !important;
      user-select: none !important;
    }
    `;
  }

  props: Props

  handleDragStart = () => {
    // $FlowFixMe
    document.body.classList.add(IS_DRAGGING_CLASS_NAME);
  }

  handleDragEnd = (dragResult: DragResult) => {
    // $FlowFixMe
    document.body.classList.remove(IS_DRAGGING_CLASS_NAME);
    const { draggableId, destination, source } = dragResult;
    const draggedFromGroup = this.state.groups.find(group => group.name === source.droppableId);
    const draggedItem: ?Item = draggedFromGroup && draggedFromGroup.items.find(
      item => item.id === draggableId
    );

    if (draggedItem && destination) {
      const newGroups = this.state.groups.map((group) => {
        const newItems = [...group.items];
        if (group.name === source.droppableId && group.name === destination.droppableId) {
          // Item was dragged inside the same group
          newItems.splice(source.index, 1);
          newItems.splice(destination.index, 0, draggedItem);
        } else if (group.name === source.droppableId) {
          // Item was dragged from this group to a different group (not fully supported yet)
          newItems.splice(source.index, 1);
        } else if (group.name === destination.droppableId) {
          // Item was dragged to this group from a different group (not fully supported yet)
          newItems.splice(destination.index, 0, draggedItem);
        }
        group.items = newItems;
        return group;
      });

      this.setState({ groups: newGroups });
    }
  }

  render() {
    return (
      <BasicNavigation containerTheme={this.props.containerTheme}>
        <DragDropContext onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd}>
          <div>
            {
              this.state.groups.map(group => (
                <NavigationItemGroupDraggable
                  key={group.name}
                  droppableId={group.name}
                  title={group.name}
                  droppableType={group.type}
                >
                  {
                    group.items.map(item => (
                      // $FlowFixMe
                      <NavigationItemDraggable
                        key={item.id}
                        draggableId={item.id}
                        draggableType={group.type}
                        icon={<ImageIcon label="item" />}
                        text={item.name}
                      />
                    ))
                  }
                </NavigationItemGroupDraggable>
              ))
            }
          </div>
        </DragDropContext>
      </BasicNavigation>
    );
  }
}
