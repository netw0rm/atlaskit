// @flow
import { Children, Component } from 'react';
import { findDOMNode } from 'react-dom';

import type { ElementType, FunctionType } from '../types';

type Props = {
  /** a single child */
  children: ElementType,
  /** a single child */
  innerRef: FunctionType,
};

export default class LayerContent extends Component {
  props: Props; // eslint-disable-line react/sort-comp
  componentDidMount() {
    const { innerRef } = this.props;

    if (innerRef) innerRef(findDOMNode(this));
  }
  render() {
    return Children.only(this.props.children);
  }
}
