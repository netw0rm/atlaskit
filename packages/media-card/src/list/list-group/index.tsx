/* tslint:disable:variable-name */
import * as React from 'react';
import { Component } from 'react';
import { MediaCollectionItem } from '@atlaskit/media-core';

import {
  Title
} from './styled';

export interface ListGroupProps {
  title: string;
  items: Array<MediaCollectionItem>;
  buildCard: Function;
}

export class ListGroup extends Component<ListGroupProps, {}> {
  render() {
    const {title, items, buildCard} = this.props;

    const cards = items.map(buildCard);
    (mediaItem: MediaCollectionItem, index: number) => {
    });

    return (
      <div>
        <Title>{title}</Title>
        {cards}
      </div>
    );
  }
}

