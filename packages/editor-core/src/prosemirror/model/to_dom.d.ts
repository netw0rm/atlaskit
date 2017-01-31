import { DOMNode } from '../dom';

export type DOMOutputSpec = string
  | DOMNode
  // These could go indefinitely, but for the sake of typing we restrict it to four siblings.
  | [string]
  | [string, any]
  | [string, any, any]
  | [string, any, any, any]
  | [string, any, any, any, any];
  //
  // Ideally we'd use a definition more like this, but unfortunately it's not possible to have
  // circular referencing type aliasing in TypeScript (it's only possible to do it with classes or
  // interfaces).
  //
  // | [string, DOMOutputAttrs | DOMOutputSpecOrHole]
  // | [string, DOMOutputAttrs | DOMOutputSpecOrHole, DOMOutputSpecOrHole]
  // | [string, DOMOutputAttrs | DOMOutputSpecOrHole, DOMOutputSpecOrHole, DOMOutputSpecOrHole];
