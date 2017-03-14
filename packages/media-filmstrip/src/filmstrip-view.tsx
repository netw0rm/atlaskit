import * as React from 'react';
import {CardView} from '@atlaskit/media-card';
import FilmStripNavigator from './filmstrip-navigator';
import {MediaType} from '@atlaskit/media-core';
import {MediaItem} from '@atlaskit/media-core';
import {ListAction, CardAction, ListEventHandler} from '@atlaskit/media-core';

export interface FilmStripViewItem {
  id?: string;
  loading?: boolean;
  dataURI?: string;
  mediaName: string;
  mediaType: MediaType;
  mediaSize?: number;
  progress?: number;
}

export interface FilmStripViewProps {
  items: Array<FilmStripViewItem>;
  onClick?: ListEventHandler;
  menuActions?: Array<ListAction>;

  onDrop?: (event: DragEvent) => void;
  onDragEnter?: (event: DragEvent) => void;
  onDragOver?: (event: DragEvent) => void;
  width?: number;
}

function onItemClick(item: FilmStripViewItem, props: FilmStripViewProps): (event: Event) => void {
  return (event: Event) => {
    props.onClick && props.onClick({
      type: 'file',
      details: item
    }, props.items, event);
  };
}

function createCardActions(item: FilmStripViewItem, items: Array<FilmStripViewItem>, actions?: Array<ListAction>): Array<CardAction> {
  const menuActions = (actions || []);
  return menuActions.map((action: ListAction) => {
    return {
      label: action.label,
      type: action.type,
      handler: (mediaItem: MediaItem, event: Event) => {
        action.handler({
          type: 'file',
          details: item
        }, items, event);
      }
    };
  });
}

export function FilmStripView(props: FilmStripViewProps): JSX.Element {
  const itemEls = props.items.map((item, k) => (
    <li key={item.id || k}>
      <CardView
        loading={item.loading}
        selectable={false}
        selected={false}
        progress={item.progress}
        dataURI={item.dataURI}
        mediaName={item.mediaName}
        mediaType={item.mediaType}
        mediaSize={item.mediaSize}
        onClick={onItemClick(item, props)}
        menuActions={createCardActions(item, props.items, props.menuActions)}
      />
    </li>
  ));
  return <FilmStripNavigator onDrop={props.onDrop} onDragEnter={props.onDragEnter} onDragOver={props.onDragOver} width={props.width}>
           {itemEls}
         </FilmStripNavigator>;
}
