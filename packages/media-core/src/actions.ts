/* tslint:disable:variable-name */
import {MediaItem, FileDetails} from './item';

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

export const CardClick: CardActionCreator = (eventHander: CardEventHandler) => {
  return {
    type: CardActionType.click,
    handler: eventHander
  };
};

export const CardDelete: CardActionCreator = (eventHander: CardEventHandler) => {
  return {
    label: 'Delete',
    type: CardActionType.delete,
    handler: eventHander
  };
};

export const ListCardClick: ListActionCreator = (eventHander: ListEventHandler) => {
  return {
    type: CardActionType.click,
    handler: eventHander
  };
};

export const ListCardDelete: ListActionCreator = (eventHander: ListEventHandler) => {
  return {
    label: 'Delete',
    type: CardActionType.delete,
    handler: eventHander
  };
};
