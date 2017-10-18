import React, { PureComponent } from 'react';
import { withRenderTarget } from '@atlaskit/layer-manager';
import { Tooltip } from '../styled/Tooltip';
import { Slide } from './Animation';
import type { PlacementType } from '../types';

type Props = {|
  children: string,
  immediate: boolean,
  placement: PlacementType,
  // eslint-disable-next-line react/no-unused-prop-types
  position: { left: number, top: number },
|};

class Tip extends PureComponent {
  props: Props // eslint-disable-line react/sort-comp

  render() {
    // NOTE: `in` & `style` are NOT public API
    // eslint-disable-next-line react/prop-types
    const { children, immediate, in: transitionIn, placement, position } = this.props;
    const { left, top } = position;

    return (
      <Slide
        component={Tooltip}
        immediate={immediate}
        in={transitionIn}
        placement={placement}
        style={{ left, top }}
      >
        {children}
      </Slide>
    );
  }
}

export default withRenderTarget({
  target: 'tooltip',
  wrapWithTransitionGroup: true,
}, Tip);
