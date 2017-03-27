import * as React from 'react';
// TODO change to Card component when we have view for link cards in film strip
import { FileCard, CardDimensions } from '@atlaskit/media-card';
import {ListAction, CardAction, Context, MediaItem, MediaItemType} from '@atlaskit/media-core';
import {FilmStripNavigator} from './filmstrip-navigator';

export interface FilmStripItem {
  id: string;
  mediaItemType: MediaItemType;
}

export interface FilmStripProps {
  context: Context;
  items: Array<FilmStripItem>;
  cardDimensions?: CardDimensions;
  collectionName?: string;
  actions: Array<ListAction>;
}

function createCardActions(actions: Array<ListAction>, items: Array<FilmStripItem>): Array<CardAction> {
  return actions.map((action: ListAction) => {
    return {
      label: action.label,
      type: action.type,
      handler: (item: MediaItem, event: Event) => {
        const fileIds = items.map((fsItem: FilmStripItem) => {
          return {
            id: fsItem.id,
            mediaItemType: fsItem.mediaItemType
          };
        });
        action.handler(item, fileIds, event);
      }
    };
  });
}

export function FilmStrip(props: FilmStripProps): JSX.Element {
  const els = props.items.map((item) => {
    return <li key={item.id}>
      <FileCard
        collectionName={props.collectionName}
        context={props.context}
        id={item.id}
        dimensions={props.cardDimensions}
        actions={createCardActions(props.actions, props.items)}
      />
    </li>;
  });
  return <FilmStripNavigator>{els}</FilmStripNavigator>;
}
