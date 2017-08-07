// @flow

/* eslint-disable import/prefer-default-export */

import { Element } from 'react';
import type { PropType } from 'babel-plugin-react-flow-props-to-prop-types'; // eslint-disable-line import/no-extraneous-dependencies

export type ChildrenType = PropType<Array<Element<any>> | Element<any>, any>;
export type ElementType = PropType<Element<mixed>, any>;
export type FunctionType = (...args: Array<any>) => mixed;

export type AppearanceTypes = 'error' | 'info' | 'normal' | 'success' | 'warning';
export type ActionsType = Array<{
  content: ChildrenType,
  onClick: FunctionType,
}>;

// exported for testing - keep in sync from `type AppearanceTypes`
export const AppearanceArray = ['error', 'info', 'normal', 'success', 'warning'];
