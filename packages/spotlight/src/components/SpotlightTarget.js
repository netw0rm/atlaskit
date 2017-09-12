// @flow
import PropTypes from 'prop-types';
import React, { Children, Component } from 'react';

import type { ElementType } from '../types';
import { TargetWrapper } from '../styled/Target';
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

    // FIXME: write a better warning.
    if (!spotlightRegistry) {
      // eslint-disable-next-line no-console
      throw Error('`SpotlightTarget` requires `SpotlightJourney` as an ancestor.');
    } else {
      spotlightRegistry.add(name, {
        element: Children.only(children),
        ref: this.node,
      });
    }
  }
  getRef = r => (this.node = r);

  render() {
    return (
      <TargetWrapper
        innerRef={this.getRef}
        {...this.props}
      />
    );
  }
}
