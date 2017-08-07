// @flow
import { Element } from 'react';
import type { PropType } from 'babel-plugin-react-flow-props-to-prop-types';

export type ChildrenType = PropType<Array<Element<any>> | Element<any>, any>;
export type FunctionType = (...args: Array<any>) => mixed;

export type Props = {
  /** Handler for navigation using the keyboard buttons. */
  onKeyboardNav: (string) => void,
  /** The tabs to display, with content being hidden unless the tab is selected. */
  tabs?: Array<{
    content?: ChildrenType,
    isSelected?: boolean,
    label: string,
    onSelect: FunctionType,
  }>
};
