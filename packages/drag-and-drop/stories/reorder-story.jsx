// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { storiesOf } from '@kadira/storybook';
import draggable from '../src/view/draggable';
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
`;

class Item extends PureComponent {
  props: {|
    itemId: string,
    isDragging: boolean,
  |}

  render() {
    return (
      <ItemContainer isDragging={this.props.isDragging}>
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

const DraggableItem = draggable('ITEM', provide, mapStateToProps)(Item);

type ItemData = {|
  id: string,
|}

class List extends PureComponent {
  props: {|
    items: ItemData[]
  |}

  render() {
    return (
      <ListContainer>
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

const ConnectedList = dragDropContext(List);

storiesOf('reorderable list', module)
  .add('basic', () => <ConnectedList items={items} />);
