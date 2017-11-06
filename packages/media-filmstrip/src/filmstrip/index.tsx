/* tslint:disable: variable-name */
import * as React from 'react';
import {Context} from '@atlaskit/media-core';
import {CardViewProps, Card, CardView, CardProps} from '@atlaskit/media-card';
import {FilmstripView} from '../filmstripView';
import FakeCard from './fakeCard';

export type withKey = { key: string };
export type FilmstripItem = CardProps | (CardViewProps & withKey) ;

export interface FilmstripProps {
  context?: Context;
  items: FilmstripItem[];
  dropzoneElement?: Element;
  onSort?: (items) => void;
  onDrop?: (items) => void;
}

export interface FilmstripState {
  animate: boolean;
  offset: number;
  items: FilmstripItem[];
}

let lastKey = 10000000;

export class Filmstrip extends React.PureComponent<FilmstripProps, FilmstripState> {
  state: FilmstripState = {
    animate: false,
    offset: 0,
    items: []
  };

  constructor(props: FilmstripProps) {
    super(props);
    this.state = {
      animate: false,
      offset: 0,
      items: props.items
    };
  }

  handleSizeChange = ({offset}) => this.setState({offset});
  handleScrollChange = ({offset, animate}) => this.setState({offset, animate});

  componentWillReceiveProps(nextProps: FilmstripProps) {
    const {items: nextItems, onSort} = nextProps;
    const {items: currentItems} = this.state;
    const hasNewItems = nextItems !== currentItems;
    const fakeItem = currentItems.find(i => i.isFake);

    if (hasNewItems && fakeItem && onSort) {
      const nextItemsCopy = [...nextItems];
      const fakeItemIndex = currentItems.indexOf(fakeItem);
      const newItem = nextItemsCopy.pop();
      // console.log('fakeItemIndex', fakeItemIndex)
      console.log('newItem id', newItem.indentifier ? newItem.identifier.id : 'no--id');
      nextItemsCopy.splice(fakeItemIndex, 0, newItem);
      // console.log(nextItemsCopy.map(i => i.identifier ? i.identifier.id : 'no--id').join(' '))
      this.setState({ items: nextItemsCopy });
      onSort(nextItemsCopy);
    } else {
      this.setState({ items: nextItems });
    }
  }

  onDragEnd = (source, destination, draggableId) => {
    console.log('filmstrip onDragEnd', source, destination, draggableId);
    const {items} = this.state;
    const sortedItems = [...items];
    if(source.droppableId === 'fake-droppable'){
      const fakeItem = {
        key: lastKey++,
        isFake: true,
        draggedFiles: parseInt(draggableId.split('|')[1], 10)
      };
      //TODO give right number
      sortedItems.splice(destination.index, 0,  fakeItem);
    }else{
      const [removed] = sortedItems.splice(source.index, 1);
      sortedItems.splice(destination.index, 0, removed);
    }

    this.setState({items: sortedItems});

    const {onSort} = this.props;
    if (onSort) {
      onSort(sortedItems);
    }
  }

  renderChildren = (items: FilmstripItem[]) => {
    const { context } = this.props;

    return items.map((item, index) => {
      const isCardItem = (item as CardProps).identifier;

      if (item.isFake) {
        return (
          <FakeCard key={item.key} isFake={true} draggedFiles={item.draggedFiles} />
        );
      }

      if (isCardItem) {
        const key = (item as CardProps).identifier['id'] || index;

        return (
          <Card
            key={key}
            context={context}
            {...item as CardProps}
          />
        );
      }

      const key = item['key'] || index;

      return (
        <CardView
          key={key}
          {...item as CardViewProps}
        />
      );
    });
  }

  onDragEnter = (length, index) => {
    const {items} = this.state;
    const itemsWithFakeContent = [...items];
    const fakeCards = Array(1).fill(null).map(key => ({
      key: lastKey++,
      isFake: true,
      draggedFiles: length
    }));

    itemsWithFakeContent.splice(index, 0, ...fakeCards);
    this.setState({
      items: itemsWithFakeContent
    });
  }

  onDrop = () => {
    const {items} = this.state;
    const {onDrop} = this.props;

    // console.log('filmstrip ondrop', items);

    if (onDrop) {
      onDrop(items);
    }
  }

  render() {
    const {animate, offset, items} = this.state;
    const children = this.renderChildren(items);

    return (
      <FilmstripView
        onDragEnter={this.onDragEnter}
        animate={animate}
        offset={offset}
        onDrop={this.onDrop}
        onSize={this.handleSizeChange}
        onScroll={this.handleScrollChange}
        onDragEnd={this.onDragEnd}
        dropzoneElement={this.props.dropzoneElement}
      >
        {children}
      </FilmstripView>
    );
  }
}
