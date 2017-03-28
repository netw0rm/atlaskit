import { SyntheticEvent } from 'react';

export type RelativePosition = 'above' | 'below' | 'auto';

export interface Styles {
  [index: string]: any;
}

/*
 * Modifiers can be any key value pair (to support future modifiers). If a modifiers
 * is unknown or invalid, it is used and the unmodified emoji when render in it's
 * placed.
 *
 * Currently supported modifiers:
 *   skinTone: number;
 */
export interface EmojiModifiers {
  [index: string]: any;
}

/**
 * Minimum information to defined an emoji is the shortcut.
 * In order to uniquely define an emoji, the id should be included, and is
 * used in preference to shortcut if provided, and has a matching emoji.
 * If not emoji can be found by id (e.g. a custom emoji has been removed),
 * fallback behaviour will be to attempt to find a matching emoji by shortcut.
 */
export interface EmojiId {
  shortcut: string;
  id?: string;
  fallback?: string;
  modifiers?: EmojiModifiers;
}

export interface SpriteSheet {
  url: string;
  row: number;
  column: number;
  height: number;
  width: number;
}

export interface EmojiImageRepresentation {
  height: number;
  width: number;
}

export interface SpriteImageRepresentation extends EmojiImageRepresentation {
  x: number;
  y: number;
  xIndex: number;
  yIndex: number;
}

/**
 * Sprite representation exposed from the EmojiResource.
 */
export interface SpriteRepresentation extends SpriteImageRepresentation {
  sprite: SpriteSheet;
  mediaApi?: boolean;
}

/**
 * Representation returned from a sprite service.
 */
export interface SpriteServiceRepresentation extends SpriteImageRepresentation {
  /** Should match a index in a SpriteSheets */
  spriteRef: string;
}

export interface ImageRepresentation extends EmojiImageRepresentation {
  imagePath: string;
  mediaApi?: boolean;
}

export type EmojiRepresentation = SpriteRepresentation | ImageRepresentation | undefined;

export interface EmojiDescription extends EmojiId {
  name?: string;
  shortcut: string;
  type: string;
  category: string;
  order: number;
  representation: EmojiRepresentation;
  skinVariations?: EmojiRepresentation[];
};

export type OptionalEmojiDescription = EmojiDescription | undefined;

export type EmojiServiceRepresentation = SpriteServiceRepresentation | ImageRepresentation;

export interface EmojiServiceDescription {
  id: string;
  name?: string;
  shortcut: string;
  type: string;
  category: string;
  order: number;
  representation: EmojiServiceRepresentation;
  skinVariations?: EmojiServiceRepresentation[];
};

export interface SpriteSheets {
  [index: string]: SpriteSheet;
}

/**
 * An access token for emoji stored in the MediaApi
 * (indicated by urls beginning with the url of the token.)
 */
export interface MediaApiToken {
  url: string;
  clientId: string;
  jwt: string;
  collectionName: string;
  expiresIn: number;
}

export interface EmojiMeta {
  spriteSheets?: SpriteSheets;
  mediaApiToken?: MediaApiToken;
}

/**
 * The expected response from an Emoji service.
 */
export interface EmojiServiceResponse {
  emojis: EmojiServiceDescription[];
  meta?: EmojiMeta;
}

export interface EmojiResponse {
  emojis: EmojiDescription[];
  mediaApiToken?: MediaApiToken;
}

export interface CategoryDescription {
  id: string;
  name: string;
  icon: any;
}

export interface AvailableCategories {
  /** index is a category id */
  [index: string]: boolean;
}

export interface OnToneSelected {
  (variation: number): void;
}

export interface OnEmojiEvent {
  (emojiId: EmojiId, emoji: OptionalEmojiDescription, event?: SyntheticEvent<any>): void;
}

export interface OnCategory {
  (categoryId: string): void;
}
