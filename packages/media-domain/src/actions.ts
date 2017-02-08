import {MediaItem, FileDetails} from './item';
// import {Card} from '../components/card/card'; // MEDIA-FIX --> are we using this?

export type CardEventHandler = (item?: MediaItem, event?: Event) => void;
export type ListEventHandler = (item?: MediaItem, siblings?: Array<FileDetails>, event?: Event) => void;

export enum CardActionType {
  click, delete, download, retry, custom
}

export interface CardAction {
  label?: string;
  type?: CardActionType;
  handler: CardEventHandler;
}

export interface ListAction {
  label?: string;
  type?: CardActionType;
  handler: ListEventHandler;
}

export type CardActionCreator = (eventHandler: CardEventHandler) => CardAction;
export type ListActionCreator = (eventHandler: ListEventHandler) => ListAction;
