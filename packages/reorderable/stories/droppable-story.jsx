// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { storiesOf } from '@kadira/storybook';
import draggable from '../src/view/draggable';
import droppable from '../src/view/droppable/';
import { dragDropContext } from '../src/';

const ItemContainer = styled.div`
  height: 80px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'lightblue')};
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  align-items: stretch;
  margin: 8px;
  background-color: ${props => (props.isDraggingOver ? 'gold' : 'deepskyblue')};
`;

const DraggableItem = (() => {
  class Item extends PureComponent {
    props: {|
      itemId: string,
      isDragging: boolean,
    |}

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

type ItemData = {|
  id: string,
|}

const items: ItemData[] = [
  {
    id: '1',
  },
  {
    id: '2',
  },
  {
    id: '3',
  },
];

class List extends PureComponent {
  props: {|
    items: ItemData[],
    isDraggingOver: boolean
  |}

  render() {
    const { isDraggingOver } = this.props;
    return (
      <ListContainer isDraggingOver={isDraggingOver}>
        <h3>Droppable {isDraggingOver ? '(is dragging over)' : '' }</h3>
        {this.props.items.map((item: Item) => (
          <DraggableItem
            key={item.id}
            itemId={item.id}
          />
        ))}
      </ListContainer>
    );
  }
}

const DroppableList = (id: DroppableId, type: TypeId) => {
  const provide = () => ({
    id,
  });

  const map = (state: DroppableState) => ({
    isDraggingOver: state.isDraggingOver,
  });

  return droppable(type, provide, map)(List);
};

let id = 0;
const getItem = () => ({
  id: `${++id}`,
});

const List1 = DroppableList('1', 'CAR');
const List2 = DroppableList('2', 'CAR');
const List3 = DroppableList('3', 'BUS');
const List4 = DroppableList('4', 'BUS');

const AppContainer = styled.div`
  display: flex;
  background-color: lightgrey;
`;

class App extends PureComponent {
  render() {
    return (
      <AppContainer>
        <List1 items={[getItem(), getItem(), getItem()]} />
        <List2 items={[getItem(), getItem(), getItem()]} />
        <List3 items={[getItem(), getItem(), getItem()]} />
        <List4 items={[getItem(), getItem(), getItem()]} />
      </AppContainer>
    );
  }
}

const ConnectedApp = dragDropContext(App);

storiesOf('droppable', module)
  .add('basic', () => (
    <ConnectedApp />
  ));
