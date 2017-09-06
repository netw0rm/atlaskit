import type { PropType } from 'babel-plugin-react-flow-props-to-prop-types'; // eslint-disable-line import/no-extraneous-dependencies

export type ElementType = PropType<Element<mixed>, any>;
export type ChildrenType = PropType<Array<ElementType> | ElementType, any>;
