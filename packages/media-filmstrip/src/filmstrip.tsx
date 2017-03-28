import * as React from 'react';
import { Card, CardDimensions, MediaIdentifier } from '@atlaskit/media-card';
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
  const {context, collectionName} = props;
  const appearance = props.items.length > 1 ? 'image' : 'auto';
  const els = props.items.map((item) => {
    const identifier: MediaIdentifier = {
      mediaItemType: item.mediaItemType,
      id: item.id,
      collectionName: collectionName || '' // TODO: Make 'collectionName' optional in 'MediaIdentifier'
    };

    return <Card
      appearance={appearance}
      identifier={identifier}
      context={context}
      dimensions={props.cardDimensions}
      actions={createCardActions(props.actions, props.items)}
    />;
  });
  return <FilmStripNavigator>{els}</FilmStripNavigator>;
}
