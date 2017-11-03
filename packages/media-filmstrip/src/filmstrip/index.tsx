/* tslint:disable: variable-name */
import * as React from 'react';
import {Context} from '@atlaskit/media-core';
import {CardViewProps, Card, CardView, CardProps} from '@atlaskit/media-card';
import {FilmstripView} from '../filmstripView';
import FakeCard from './fakeCard';

export type FilmstripItem = CardProps | CardViewProps;

export interface FilmstripProps {
  context?: Context;
  items: FilmstripItem[];
  dropzoneElement?: Element;
  onSort?: (items) => void;
}

export interface FilmstripState {
  animate: boolean;
  offset: number;
  items: FilmstripItem[];
}

let lastKey = 10000000;

export class Filmstrip extends React.PureComponent<FilmstripProps, FilmstripState> {
  eventsAdded: boolean;
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

  componentWillReceiveProps(props: FilmstripProps) {
    const {dropzoneElement} = props;
    const {eventsAdded} = this;

    if (eventsAdded || !dropzoneElement) {
      return;
    }

    this.eventsAdded = true;

    dropzoneElement.addEventListener('dragover', this.onDragOver);
  }

  onDragOver = (e: DragEvent) => {
    const {dataTransfer} = e;

    e.preventDefault();
  }

  onDragEnd = (source, destination) => {
    const {items} = this.state;
    const {onSort} = this.props;
    const sortedItems = [...items];
    const [removed] = sortedItems.splice(source.index, 1);

    sortedItems.splice(destination.index, 0, removed);
    this.setState({items: sortedItems});

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

  render() {
    const {animate, offset, items} = this.state;
    const children = this.renderChildren(items);

    return (
      <FilmstripView onDragEnter={this.onDragEnter} animate={animate} offset={offset} onSize={this.handleSizeChange} onScroll={this.handleScrollChange} onDragEnd={this.onDragEnd}>
        {children}
      </FilmstripView>
    );
  }
}
