/* tslint:disable:variable-name */
import * as React from 'react';
import { Component } from 'react';
import { MediaCollectionItem } from '@atlaskit/media-core';

import {
  Wrapper,
  Title
} from './styled';

export interface ListGroupProps {
  title: string;
  items: Array<MediaCollectionItem>;
  buildCard: (mediaItem: MediaCollectionItem, index: number) => JSX.Element | null;
}

export class ListGroup extends Component<ListGroupProps, {}> {
  render() {
    const {title, items, buildCard} = this.props;

    if (items.length === 0) {
      return null;
    }

    const cards = items.map(buildCard);
    return (
      <Wrapper>
        <Title>{title}</Title>
        {cards}
      </Wrapper>
    );
  }
}

