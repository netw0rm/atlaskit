/* tslint:disable: variable-name */
import * as React from 'react';
import {Context} from '@atlaskit/media-core';
import {Identifier, CardViewProps, Card, CardView} from '@atlaskit/media-card';
import {FilmstripView} from '../filmstripView';

export interface FilmstripCardItem {
  identifier: Identifier;
  context: Context;
}

export type FilmstripItem = FilmstripCardItem | CardViewProps;

export interface FilmstripProps {
  items: FilmstripItem[];
  dropzoneElement?: Element;
  onSort?: (items) => void;
}

export interface FilmstripState {
  animate: boolean;
  offset: number;
  items: FilmstripItem[];
}

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
    console.log('onDragOver', dataTransfer);
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

  renderChildren = (items: FilmstripItem[]) =>
    items.map((item, index) => {
      const isCardItem = (item as FilmstripCardItem).identifier;

      if (isCardItem) {
        const {identifier, context} = (item as FilmstripCardItem);
        const key = identifier['id'] || index;

        return (
          <Card
            key={key}
            identifier={identifier}
            context={context}
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
    })


  render() {
    const {animate, offset, items} = this.state;
    const children = this.renderChildren(items);

    return (
      <FilmstripView animate={animate} offset={offset} onSize={this.handleSizeChange} onScroll={this.handleScrollChange} onDragEnd={this.onDragEnd}>
        {children}
      </FilmstripView>
    );
  }
}
