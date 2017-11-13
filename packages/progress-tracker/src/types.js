// @flow
import type { Component, Element } from 'react';
import type { PropType } from 'babel-plugin-react-flow-props-to-prop-types';

export type ChildrenType = PropType<Array<Element<any>> | Element<any>, any>;
export type ComponentType = PropType<Component<{}, {}, {}>, any>;
export type ElementType = PropType<Element<mixed>, any>;
export type FunctionType = (...args: Array<any>) => mixed;

export type StatusType = 'unvisited' | 'visited' | 'current' | 'disabled';
export type Spacing = 'comfortable' | 'cosy' | 'compact';

export type Stage = {
    id: string,
    label: string,
    percentageComplete: number,
    status: StatusType,
    href?: string,
    onClick?: () => void,
    component?: string,
}
