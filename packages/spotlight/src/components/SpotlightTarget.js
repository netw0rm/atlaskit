// @flow
import PropTypes from 'prop-types';
import { Children, cloneElement, Component } from 'react';

import type { ElementType } from '../types';
import SpotlightRegistry from './SpotlightRegistry';

type Props = {
  /** a single child */
  children: ElementType,
  /** the name to reference later */
  name: string,
};

export default class SpotlightTarget extends Component {
  props: Props; // eslint-disable-line react/sort-comp
  static contextTypes = {
    spotlightRegistry: PropTypes.instanceOf(SpotlightRegistry).isRequired,
  };
  static defaultProps = {
    pulse: true,
  };

  componentDidMount() {
    const { children, name } = this.props;
    const { spotlightRegistry } = this.context;

    spotlightRegistry.add(name, {
      element: Children.only(children),
      ref: this._innerRef || this._ref,
    });
  }

  handleInnerRef = (node) => {
    this._innerRef = node;
  }
  handleRef = (node) => {
    this._ref = node;
  }

  render() {
    const { children } = this.props;

    return cloneElement(children, {
      innerRef: this.handleInnerRef,
      ref: this.handleRef,
    });
  }
}
