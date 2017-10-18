// @flow
import { Children, Component } from 'react';
import { findDOMNode } from 'react-dom';

import type { ComponentType, ElementType, FunctionType } from '../types';

type Props = {
  /** a single child */
  children: ComponentType| ElementType,
  /** the function to call returning a DOM node */
  innerRef: () => ElementType,
  /** handle mouse enter */
  onMouseEnter: FunctionType,
  /** handle mouse leave */
  onMouseLeave: FunctionType,
};

export default class Target extends Component {
  props: Props // eslint-disable-line react/sort-comp
  componentDidMount() {
    const { innerRef, onMouseEnter, onMouseLeave } = this.props;

    const node = findDOMNode(this);

    // set mouse events on the underlying DOM element
    node.onmouseenter = onMouseEnter;
    node.onmouseleave = onMouseLeave;

    // return the element to Tooltip
    if (innerRef) innerRef(node);
  }
  render() {
    return Children.only(this.props.children);
  }
}
