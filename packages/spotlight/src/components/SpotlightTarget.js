// @flow
import PropTypes from 'prop-types';
import { Children, Component } from 'react';
import { findDOMNode } from 'react-dom';

import type { ElementType } from '../types';
import SpotlightRegistry from './SpotlightRegistry';

type Props = {
  /** a single child */
  children: ElementType,
  /** the name to reference from Spotlight */
  name: string,
};

export default class SpotlightTarget extends Component {
  props: Props; // eslint-disable-line react/sort-comp
  static contextTypes = {
    spotlightRegistry: PropTypes.instanceOf(SpotlightRegistry).isRequired,
  };

  componentDidMount() {
    const { name } = this.props;
    const { spotlightRegistry } = this.context;

    if (!spotlightRegistry) {
      throw Error('`SpotlightTarget` requires `SpotlightManager` as an ancestor.');
    } else {
      spotlightRegistry.add(name, findDOMNode(this));
    }
  }
  componentWillUnmount() {
    const { name } = this.props;
    const { spotlightRegistry } = this.context;

    if (!spotlightRegistry) {
      throw Error('`SpotlightTarget` requires `SpotlightManager` as an ancestor.');
    } else {
      spotlightRegistry.remove(name);
    }
  }
  getRef = r => (this.node = r);

  render() {
    return Children.only(this.props.children);
  }
}
