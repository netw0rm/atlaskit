// @flow
/* eslint-disable react/no-multi-comp */
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { storiesOf, action as storybookAction } from '@kadira/storybook';
import { createStore } from 'redux';
import draggable from '../src/view/draggable';
import droppable from '../src/view/droppable/';
import { dragDropContext } from '../src/';
import type { DragResult } from '../src/types';

type ItemData = {|
  id: string,
|}

type ItemDataMap = { [key: string ]: ItemData }

type ListData = {|
  id: string,
  itemIds: string[]
|}

type ListDataMap = { [key: string ]: ListData }

const itemKeys: string[] = Array.from({ length: 40 }, (k, v) => `item${v}`);
const items: ItemDataMap = itemKeys
    .reduce((acc: ItemDataMap, key: string) => {
      console.log('key', key);
      const data: ItemData = {
        id: key,
      };
      acc[key] = data;
      return acc;
    }, {});

const lists: ListDataMap = {
  foo: {
    id: 'foo',
    itemIds: itemKeys.slice(0, itemKeys.length / 2),
  },
  bar: {
    id: 'bar',
    itemIds: itemKeys.slice((itemKeys.length / 2), itemKeys.length),
  },
};

const DraggableItem = (() => {
  const ItemContainer = styled.div`
    height: 80px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${props => (props.isDragging ? 'lightgreen' : 'lightblue')};
  `;

  class Item extends PureComponent {
    props: {|
      itemId: string,
      isDragging: boolean,
    |}

    componentWillUnmount() {
      console.warn('unmounting item', this.props.itemId);
    }

    render() {
      const { isDragging } = this.props;
      return (
        <ItemContainer isDragging={isDragging}>
          <h4>Draggable {isDragging ? '(is dragging)' : '' }</h4>
          Id: {this.props.itemId}
        </ItemContainer>
      );
    }
  }

  const provide = ownProps => ({
    id: ownProps.itemId,
  });

  const mapStateToProps = state => ({
    isDragging: state.isDragging,
  });

  return draggable('ITEM', provide, mapStateToProps)(Item);
})();

const DroppableList = (() => {
  const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    align-items: stretch;
    margin: 8px;
    background-color: ${props => (props.isDraggingOver ? 'gold' : 'deepskyblue')};
  `;

  class List extends PureComponent {
    props: {|
      listId: string,
      items: ItemData[],
      isDraggingOver: boolean
    |}

    render() {
      // console.log('rendering draggable list', this.props.items);
      const { isDraggingOver } = this.props;
      return (
        <ListContainer isDraggingOver={isDraggingOver}>
          <h3>{this.props.listId} {isDraggingOver ? '(is dragging over)' : '' }</h3>
          {this.props.items.map((item: ItemData) => (
            <DraggableItem
              key={item.id}
              itemId={item.id}
            />
          ))}
        </ListContainer>
      );
    }
  }
  const provide = ownProps => ({
    id: ownProps.listId,
  });

  const map = state => ({
    isDraggingOver: state.isDraggingOver,
  });

  return droppable('ITEM', 'vertical', provide, map)(List);
})();

const ConnectedApp = (() => {
  const AppContainer = styled.div`
    display: flex;
    background-color: lightgrey;
  `;

  class App extends PureComponent {
    props: {|
      lists: ListDataMap
    |}

    render() {
      return (
        <AppContainer>
          {Object.keys(this.props.lists).map((key) => {
            const list: ListData = this.props.lists[key];
            console.log('list itemIds', list.itemIds);
            const itemsInList = list.itemIds.map((id: string): ItemData => items[id]);

            return (
              <DroppableList
                items={itemsInList}
                listId={key}
                key={key}
              />
            );
          })}
        </AppContainer>
      );
    }
  }

  type State = {|
    lists: ListDataMap,
  |};

  const initialState = {
    lists,
  };

  const updateLists = (newLists: ListDataMap) => ({
    type: 'UPDATE_LISTS',
    payload: newLists,
  });

  const reducer = (state: State = initialState, action): State => {
    if (action.type === 'UPDATE_LISTS') {
      return {
        lists: action.payload,
      };
    }
    return state;
  };

  const store = createStore(reducer);

  class AppState extends PureComponent {
    // eslint-disable-next-line react/sort-comp
    state: State

    constructor(...rest) {
      super(...rest);

      this.state = store.getState();
    }

    state: State

    componentDidMount() {
      store.subscribe(() => {
        console.log('store updating');
        this.setState(store.getState());
      });
    }

    render() {
      return (
        <App lists={this.state.lists} />
      );
    }
  }

  const endAction = storybookAction('hook: drag finished');

  const hooks = {
    onDragStart: storybookAction('hook: drag started'),
    onDragEnd: (result: DragResult) => {
      endAction(result);
      if (result.destination == null) {
        return;
      }

    // moved nowhere
    // TODO: should this be null?
      if (result.source.droppableId === result.destination.droppableId &&
        result.source.index === result.destination.index) {
        console.log('no movement');
        return;
      }

      // assuming single list
      console.info('calculating new list');

      // need to move an item from one place ot another
      const state = store.getState();

      const newItemIds = [...state.lists[result.source.droppableId].itemIds];

      // remove it from original position
      newItemIds.splice(result.source.index, 1);
      newItemIds.splice(result.destination.index, 0, result.draggableId);

      const sourceList = {
        ...state.lists[result.source.droppableId],
        itemIds: newItemIds,
      };

      const newLists = {
        ...state.lists,
        [result.source.droppableId]: sourceList,
      };

      console.log({
        oldItemIds: state.lists[result.source.droppableId].itemIds,
        newItemIds,
        newLists,
      });

      store.dispatch(updateLists(newLists));
    },
  };

  return dragDropContext(hooks)(AppState);
})();

storiesOf('droppable', module)
  .add('basic', () => (
    <ConnectedApp />
  ));
