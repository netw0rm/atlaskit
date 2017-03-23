import * as React from 'react';
import { Card } from '@atlaskit/media-card';
import {ListAction, CardAction, Context, MediaItem, MediaItemType} from '@atlaskit/media-core';
import {FilmStripNavigator} from './filmstrip-navigator';

export interface FilmStripItem {
  id: string;
  mediaItemType: MediaItemType;
}

export interface FilmStripProps {
  context: Context;
  items: Array<FilmStripItem>;
  cardHeight?: number;
  cardWidth?: number;
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
  const els = props.items.map(item => (
    <Card
      collectionName={props.collectionName}
      context={props.context}
      id={item.id}
      mediaItemType={item.mediaItemType}
      height={props.cardHeight}
      width={props.cardWidth}
      actions={createCardActions(props.actions, props.items)}
    />
  ));
  return <FilmStripNavigator>{els}</FilmStripNavigator>;
}
